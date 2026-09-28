"use client";

import { ChatCircleDots, Check, PaperPlaneTilt, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Message = { id: string; role: "assistant" | "user"; content: string; source?: string; type?: "text" | "booking" | "confirmation" };
type BookingValues = { name: string; phone: string; preferredDate: string; reason: string };

const initialMessage: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hi, I’m Bright Smile Dental’s clinic assistant. Ask about care, pricing, or booking a visit.",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isThinking, setIsThinking] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowTooltip(true), 3500);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, isThinking, bookingVisible, reduceMotion]);

  const history = useMemo(
    () => messages.filter((message) => message.type !== "booking" && message.type !== "confirmation").map(({ role, content }) => ({ role, content })),
    [messages],
  );

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || isThinking) return;

    setShowTooltip(false);
    setInput("");
    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((current) => [...current, userMessage]);
    setIsThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const payload = response.headers.get("content-type")?.includes("application/json") ? await response.json() : null;
      if (!response.ok) throw new Error(payload?.error || "The clinic assistant is unavailable.");

      if (payload?.action === "booking") {
        setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: payload.message, type: "booking" }]);
        setBookingVisible(true);
        return;
      }

      const assistantId = crypto.randomUUID();
      const sources = response.headers.get("x-rag-sources") || undefined;
      setMessages((current) => [...current, { id: assistantId, role: "assistant", content: "", source: sources }]);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("The response stream could not be read.");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const token = decoder.decode(value, { stream: true });
        setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, content: message.content + token } : message));
      }
    } catch (error) {
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: error instanceof Error ? error.message : "Please try again shortly." }]);
    } finally {
      setIsThinking(false);
    }
  }

  async function submitBooking(values: BookingValues) {
    const response = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || "We could not save your request.");
    setBookingVisible(false);
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: body.confirmation, type: "confirmation" }]);
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.p initial={{ opacity: 0, x: 8, y: 4 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, x: 8, y: 4 }} transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }} className="absolute bottom-[4.75rem] right-0 w-52 rounded-control border bg-surface-raised px-4 py-3 text-sm leading-5 text-text-muted shadow-float">
            Ask me anything about Bright Smile Dental.
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.84, clipPath: "inset(18% 12% 10% 16% round 1.5rem)" }}
            animate={{ opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.88, clipPath: "inset(12% 4% 4% 18% round 1.5rem)" }}
            transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 flex h-[31rem] max-h-[calc(100dvh-10rem)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-panel border bg-surface-raised shadow-panel sm:bottom-[5.5rem] sm:right-6 sm:h-[33rem] sm:max-h-[calc(100dvh-11rem)] sm:w-[25rem]"
          >
            <motion.div aria-hidden="true" initial={false} animate={reduceMotion ? {} : { x: [0, -10, 0], y: [0, 7, 0], scale: [1, 1.12, 1] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -right-10 -top-12 size-36 rounded-full bg-mango/25 blur-3xl" />
            <header className="relative flex items-center justify-between border-b px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-accent text-sm font-semibold text-white">B</span>
                <div><p className="font-semibold tracking-[-0.02em]">Bright Smile Dental</p><p className="mt-0.5 flex items-center gap-1.5 text-xs text-text-muted"><span className="size-1.5 rounded-full bg-success" /> Online now</p></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="grid size-10 place-items-center rounded-full text-text-muted transition duration-150 ease-out hover:bg-surface hover:text-text-primary active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-label="Close assistant"><X size={20} weight="bold" /></button>
            </header>
            <div ref={listRef} className="relative flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => <MessageBubble key={message.id} message={message} />)}
              {bookingVisible && <BookingCard onSubmit={submitBooking} />}
              {isThinking && <TypingIndicator />}
            </div>
            <form onSubmit={sendMessage} className="relative border-t bg-surface-raised p-3">
              <div className="flex items-end gap-2 rounded-control border bg-background px-3 py-2 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15">
                <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={1} maxLength={1000} placeholder="Ask about care or booking" className="max-h-24 min-h-6 flex-1 resize-none bg-transparent text-sm leading-6 outline-none placeholder:text-text-muted" />
                <button disabled={!input.trim() || isThinking} className="grid size-9 place-items-center rounded-full bg-accent text-white transition duration-150 ease-out hover:bg-accent-hover active:scale-[0.94] disabled:cursor-not-allowed disabled:bg-border disabled:text-text-muted" aria-label="Send message"><PaperPlaneTilt size={17} weight="fill" /></button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
      <motion.button onClick={() => { setIsOpen((open) => !open); setShowTooltip(false); }} animate={reduceMotion || isOpen ? {} : { boxShadow: ["0 10px 24px rgb(23 27 25 / 0.18)", "0 14px 32px rgb(23 27 25 / 0.28)", "0 10px 24px rgb(23 27 25 / 0.18)"] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.95 }} className="grid size-14 place-items-center rounded-full bg-accent text-white shadow-float focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" aria-label={isOpen ? "Close assistant" : "Open assistant"}>
        <AnimatePresence mode="wait" initial={false}>{isOpen ? <motion.span key="close" initial={{ opacity: 0, rotate: -35 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 35 }}><X size={24} weight="bold" /></motion.span> : <motion.span key="chat" initial={{ opacity: 0, rotate: 35 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -35 }}><ChatCircleDots size={26} weight="fill" /></motion.span>}</AnimatePresence>
      </motion.button>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }} className={`flex ${isUser ? "justify-end" : "justify-start"}`}><div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${isUser ? "rounded-br-md bg-accent text-white" : "rounded-bl-md bg-surface text-text-primary"}`}>
    {message.type === "confirmation" && <Check size={18} weight="bold" className="mb-1 text-success" />}
    <p>{message.content || <span className="inline-block h-4 w-1 animate-pulse bg-accent align-middle" />}</p>
    {message.source && !isUser && <p className="mt-2 text-[11px] text-text-muted">Based on {message.source.split(" | ")[0]}</p>}
  </div></motion.div>;
}

function TypingIndicator() { return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start"><div className="flex gap-1 rounded-2xl rounded-bl-md bg-surface px-4 py-3"><span className="size-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:-0.2s]" /><span className="size-1.5 animate-bounce rounded-full bg-text-muted [animation-delay:-0.1s]" /><span className="size-1.5 animate-bounce rounded-full bg-text-muted" /></div></motion.div>; }

function BookingCard({ onSubmit }: { onSubmit: (values: BookingValues) => Promise<void> }) {
  const [values, setValues] = useState<BookingValues>({ name: "", phone: "", preferredDate: "", reason: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setSubmitting(true); setError(""); try { await onSubmit({ ...values, preferredDate: new Date(values.preferredDate).toISOString() }); } catch (reason) { setError(reason instanceof Error ? reason.message : "Please check your details and try again."); } finally { setSubmitting(false); } }
  return <motion.form onSubmit={submit} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="rounded-control border bg-background p-4 shadow-sm"><p className="font-semibold tracking-[-0.02em]">Request a visit</p><p className="mt-1 text-xs leading-5 text-text-muted">We will confirm availability before your appointment is final.</p><div className="mt-4 grid gap-2"><BookingInput label="Full name" value={values.name} onChange={(name) => setValues({ ...values, name })} /><BookingInput label="Phone number" value={values.phone} onChange={(phone) => setValues({ ...values, phone })} /><label className="grid gap-1 text-xs font-medium">Preferred date and time<input required type="datetime-local" value={values.preferredDate} onChange={(event) => setValues({ ...values, preferredDate: event.target.value })} className="h-10 rounded-lg border bg-surface-raised px-3 text-sm font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15" /></label><BookingInput label="Reason for visit" value={values.reason} onChange={(reason) => setValues({ ...values, reason })} /></div>{error && <p className="mt-2 text-xs text-error">{error}</p>}<button disabled={submitting} className="mt-4 h-10 w-full rounded-lg bg-accent text-sm font-semibold text-white transition duration-150 ease-out hover:bg-accent-hover active:scale-[0.98] disabled:bg-border">{submitting ? "Sending request..." : "Send booking request"}</button></motion.form>;
}

function BookingInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="grid gap-1 text-xs font-medium">{label}<input required value={value} onChange={(event) => onChange(event.target.value)} className="h-10 rounded-lg border bg-surface-raised px-3 text-sm font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15" /></label>; }
