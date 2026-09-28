"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Baby,
  CalendarBlank,
  ChatTeardropText,
  MapPin,
  ShieldCheck,
  Phone,
  Plus,
  Stethoscope,
  Tooth,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ChatWidget } from "@/components/chat-widget";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  { number: "01", name: "Preventive & restorative", short: "Oral examinations, hygiene, and restorations that begin with context.", copy: "Comprehensive oral examinations, digital radiographs where indicated, hygiene visits, composite fillings, and restorative care explained before treatment begins.", detail: "A considered clinical baseline", color: "#c9e1d5" },
  { number: "02", name: "Orthodontic assessment", short: "Braces and clear-aligner planning with a clear treatment pathway.", copy: "Braces and clear aligner planning for teens and adults, with diagnostic records, options, and each treatment stage discussed in plain language.", detail: "A plan you can follow", color: "#f5c79c" },
  { number: "03", name: "Paediatric visits", short: "Positive early oral-health experiences for younger patients.", copy: "Preventive, patient-first appointments that help children become familiar with examinations, hygiene, and the clinic at their own pace.", detail: "Confidence starts early", color: "#e4d5f0" },
  { number: "04", name: "Urgent dental concerns", short: "For toothache, swelling, fractured teeth, or lost fillings.", copy: "Support for dental pain, swelling, broken teeth, and lost fillings during clinic hours, with triage and next-step guidance from the team.", detail: "A clear response when it matters", color: "#f5d7da" },
];

const notes = [
  { quote: "The explanation was clear, and I never felt hurried.", person: "A Bright Smile patient" },
  { quote: "My son settled in quickly. The appointment felt calm from the beginning.", person: "Parent of a young patient" },
  { quote: "I knew exactly what my orthodontic options were before deciding.", person: "Orthodontic patient" },
];

function Brand() {
  return <span className="flex items-center gap-3"><span className="brand-orb"><Tooth size={22} weight="duotone" /><i /></span><span><span className="block font-display text-[1.02rem] font-semibold leading-none tracking-[-0.065em]">Bright Smile<span className="ml-1 text-mint">Dental</span></span><span className="mt-1 block text-[0.49rem] font-bold tracking-[0.16em] text-paper/55">CARE THAT FOLLOWS THROUGH</span></span></span>;
}

function OpenAssistantButton({ className = "" }: { className?: string }) {
  return <button type="button" onClick={() => document.querySelector<HTMLButtonElement>("[aria-label='Open assistant']")?.click()} className={`button-dark ${className}`}>Talk with the assistant <ArrowUpRight size={18} weight="bold" /></button>;
}

export function LandingExperience() {
  const [activeService, setActiveService] = useState(0);
  const [activeNote, setActiveNote] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 25, restDelta: 0.001 });
  const heroY = useTransform(scrollY, [0, 850], [0, reduceMotion ? 0 : 80]);
  const heroScale = useTransform(scrollY, [0, 850], [1, reduceMotion ? 1 : 1.08]);
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 18));

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setActiveNote((current) => (current + 1) % notes.length), 5200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <main className="overflow-clip bg-paper text-pine">
      <motion.div className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-coral" style={{ scaleX: progress }} />
      <Header solid={scrolled} />

      <section id="top" className="relative min-h-[100dvh] bg-pine pt-24 text-paper">
        <div className="hero-atmosphere absolute inset-0" />
        <motion.div aria-hidden="true" animate={reduceMotion ? {} : { rotate: 360, scale: [1, 1.05, 1] }} transition={{ rotate: { duration: 32, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }} className="hero-orbit absolute -right-[24rem] top-[2%] size-[58rem]" />
        <div className="relative mx-auto grid min-h-[calc(100dvh-6rem)] max-w-[1540px] grid-cols-1 items-center gap-8 px-5 pb-10 md:px-10 lg:grid-cols-12 lg:gap-4">
          <motion.div style={{ y: heroY }} className="relative z-10 pt-10 lg:col-span-7 lg:pt-0">
            <motion.p initial={reduceMotion ? false : { opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.12, ease }} className="hero-kicker"><span className="pulse-dot" /> DENTAL CARE, MADE CALMER</motion.p>
            <h1 className="mt-6 max-w-[870px] font-display text-[clamp(4.2rem,9.7vw,10.8rem)] font-semibold leading-[0.78] tracking-[-0.105em]">
              <Word delay={0.16}>Feel</Word> <Word delay={0.24}>at</Word><br /><Word delay={0.32}>ease</Word> <Word delay={0.4} className="text-mango">here.</Word>
            </h1>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.58, ease }} className="mt-10 flex max-w-xl flex-col gap-7 md:ml-[17%] md:flex-row md:items-end">
              <p className="max-w-[25rem] text-base leading-7 text-paper/70 md:text-lg">Bright Smile is modern dental care for Islamabad. We make room for the questions, the nerves, and the decisions that matter to you.</p>
              <a href="#care" className="interactive-link shrink-0">See how we care <ArrowDownRight size={18} /></a>
            </motion.div>
          </motion.div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, x: 40, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.95, delay: 0.26, ease }} className="relative pb-8 lg:col-span-5 lg:pb-0">
            <div className="hero-media relative ml-auto aspect-[4/4.8] max-w-[610px] overflow-hidden rounded-[2rem_2rem_2rem_8rem] shadow-[0_36px_90px_rgba(0,0,0,.3)]">
              <motion.div style={{ scale: heroScale }} className="absolute inset-0"><Image src="/images/real-consultation.jpeg" alt="A patient during a dental shade assessment" fill priority sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-[53%_56%]" /></motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,44,39,.05),rgba(17,44,39,.44))]" />
              <motion.div animate={reduceMotion ? {} : { y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-5 left-5 max-w-[15rem] rounded-2xl bg-pine/75 p-4 shadow-2xl backdrop-blur-md"><p className="text-[0.61rem] font-bold tracking-[0.14em] text-mango">START WITH THE BASICS</p><p className="mt-2 font-display text-lg leading-[1.02] tracking-[-0.045em]">History, examination, then a clear care plan.</p></motion.div>
            </div>
            <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.9, ease }} className="absolute -left-3 top-[15%] grid size-20 place-items-center rounded-full bg-coral text-center font-mono text-[0.6rem] font-bold leading-3 tracking-[0.08em] text-paper shadow-xl md:-left-8">ISB<br />F-7<br />MARKAZ</motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-paper/10 py-3"><Marquee /></div>
      </section>

      <section className="bg-mint px-5 py-14 md:px-10 md:py-18"><div className="mx-auto grid max-w-[1540px] gap-10 md:grid-cols-12 md:items-center"><p className="font-display text-2xl font-semibold leading-[1.02] tracking-[-0.06em] md:col-span-4 md:text-4xl">Care should not feel like a performance.</p><div className="grid grid-cols-2 gap-x-6 gap-y-7 md:col-span-7 md:col-start-6 md:grid-cols-4"><Fact number="01" label="One considered team" /><Fact number="02" label="A clear care plan" /><Fact number="03" label="Real booking requests" /><Fact number="04" label="Answers from our clinic" /></div></div><div className="mx-auto mt-12 flex max-w-[1540px] gap-2 overflow-x-auto border-t border-pine/15 pt-5"><QuickLink href="#care" icon={<Tooth size={17} />} label="Explore care" /><QuickLink href="#team" icon={<Stethoscope size={17} />} label="Meet the team" /><QuickLink href="#booking" icon={<CalendarBlank size={17} />} label="Plan a visit" /><QuickLink href="#visit" icon={<MapPin size={17} />} label="Find the clinic" /></div></section>

      <section id="care" className="relative bg-paper px-5 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-[1540px]"><div className="grid gap-10 border-b border-pine/15 pb-14 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><p className="section-kicker">THE CARE YOU NEED</p><h2 className="mt-5 max-w-4xl font-display text-[clamp(3.6rem,7vw,7.8rem)] font-semibold leading-[0.84] tracking-[-0.095em]">A plan that begins with <i>listening.</i></h2></div><p className="max-w-sm text-base leading-7 text-pine/65 lg:col-span-3 lg:col-start-10">No mystery language. No pressure to decide on the spot. We start with what is important to you, then show you a way forward.</p></div>
        <div className="mt-5 grid lg:grid-cols-12"><div className="hidden lg:col-span-4 lg:block"><div className="sticky top-28 pt-12"><ServiceVisual active={activeService} /><motion.p key={services[activeService].detail} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} className="mt-7 max-w-[13rem] font-display text-3xl leading-[0.94] tracking-[-0.055em] text-coral">{services[activeService].detail}</motion.p><div className="mt-8 flex gap-2">{services.map((service, index) => <button key={service.number} aria-label={`View ${service.name}`} onClick={() => setActiveService(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === activeService ? "w-12 bg-pine" : "w-4 bg-pine/20 hover:bg-pine/50"}`} />)}</div></div></div><div className="lg:col-span-8">{services.map((service, index) => <ServiceRow key={service.name} service={service} selected={index === activeService} onSelect={() => setActiveService(index)} />)}</div></div>
      </div></section>

      <section id="team" className="bg-pine px-5 py-24 text-paper md:px-10 md:py-36"><div className="mx-auto grid max-w-[1540px] gap-12 lg:grid-cols-12 lg:items-center"><motion.div initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease }} className="relative lg:col-span-5"><div className="relative aspect-[5/4.8] overflow-hidden rounded-[5rem_2rem_2rem_2rem]"><Image src="/images/real-xray-consult.jpeg" alt="A dentist reviewing digital radiographs with a patient" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover object-[68%_50%]" /></div><div className="absolute -bottom-10 left-6 hidden aspect-[1.2/1] w-[42%] overflow-hidden rounded-[1.5rem] bg-pine shadow-2xl md:block"><Image src="/images/real-instruments.jpeg" alt="Dental instruments prepared for care" fill sizes="220px" className="object-cover" /></div><div className="absolute -right-3 top-8 max-w-[11rem] rounded-2xl bg-mango p-4 text-pine shadow-xl"><p className="font-mono text-[0.58rem] font-bold tracking-[0.13em]">OUR POINT OF VIEW</p><p className="mt-2 font-display text-lg leading-[1.02] tracking-[-0.05em]">Diagnosis before decisions.</p></div></motion.div><div className="lg:col-span-6 lg:col-start-7"><p className="section-kicker text-mango">MEET THE CLINICIANS</p><h2 className="mt-5 max-w-2xl font-display text-[clamp(3.5rem,6vw,6.8rem)] font-semibold leading-[0.85] tracking-[-0.09em]">Expert care, <i className="text-mango">human</i> point of view.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-paper/65">Your clinician explains the clinical picture, the options, and the next step before a treatment decision is made.</p><div className="mt-10 divide-y divide-paper/20"><TeamRow name="Dr. Ayesha Khan" role="Orthodontic clinician" copy="Braces and clear-aligner treatment planning, explained from the diagnostic stage onward." /><TeamRow name="Dr. Omar Siddiqui" role="General dentist" copy="Preventive examinations, restorative dentistry, and urgent care with a calm chairside approach." /></div></div></div></section>

      <ClinicGallery reduceMotion={reduceMotion} />

      <section id="booking" className="overflow-hidden bg-coral px-5 py-24 text-paper md:px-10 md:py-32"><div className="mx-auto max-w-[1540px]"><div className="grid gap-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><p className="section-kicker text-paper/70">HOW A VISIT FEELS</p><h2 className="mt-5 max-w-4xl font-display text-[clamp(3.6rem,7.2vw,8rem)] font-semibold leading-[0.84] tracking-[-0.1em]">Less uncertainty.<br />More clarity.</h2></div><p className="max-w-sm text-lg leading-8 text-paper/80 lg:col-span-3 lg:col-start-10">A visit is a small sequence of calm, useful moments. Here is what you can expect.</p></div><div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-paper/25 md:grid-cols-3">{[["01", "Start with you", "Tell us what is bringing you in. Your questions belong in the room."], ["02", "See the whole picture", "We explain what we see, with practical options and time to think."], ["03", "Leave with a way forward", "Know what is next, and why it makes sense for you."]].map(([number, title, copy], index) => <motion.article whileHover={reduceMotion ? {} : { y: -8 }} transition={{ duration: 0.35, ease }} key={number} className="min-h-[280px] bg-coral p-7 md:p-9"><span className="font-mono text-sm text-mango">{number}</span><h3 className="mt-12 font-display text-3xl font-semibold tracking-[-0.06em]">{title}</h3><p className="mt-4 max-w-xs leading-7 text-paper/75">{copy}</p><motion.span animate={reduceMotion ? {} : { rotate: index === 1 ? [0, 45, 0] : 0 }} transition={{ duration: 3.8, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }} className="mt-8 grid size-9 place-items-center rounded-full border border-paper/40"><ArrowDownRight size={18} /></motion.span></motion.article>)}</div><div className="mt-8 flex flex-col justify-between gap-6 border-t border-paper/30 pt-7 md:flex-row md:items-center"><p className="font-display text-2xl tracking-[-0.05em]">Ready to make a request?</p><OpenAssistantButton className="bg-paper text-pine hover:bg-mango" /></div></div></section>

      <section className="bg-paper px-5 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-[1540px]"><div className="grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><p className="section-kicker">WHAT PATIENTS NOTICE</p><h2 className="mt-5 font-display text-[clamp(3.7rem,7vw,7.7rem)] font-semibold leading-[0.83] tracking-[-0.1em]">Care people<br /><i>recommend.</i></h2></div><div className="flex gap-2 lg:col-span-3 lg:col-start-10">{notes.map((note, index) => <button onClick={() => setActiveNote(index)} aria-label={`Show note ${index + 1}`} className={`h-1.5 rounded-full transition-all duration-500 ${activeNote === index ? "w-14 bg-coral" : "w-5 bg-pine/15 hover:bg-pine/45"}`} key={note.person} />)}</div></div><div className="relative mt-16 min-h-[275px] border-y border-pine/15 py-9 md:min-h-[315px] md:py-12"><span className="absolute left-0 top-4 font-display text-7xl leading-none text-mint md:text-9xl">“</span><AnimatePresence mode="wait"><motion.article key={notes[activeNote].quote} initial={reduceMotion ? false : { opacity: 0, y: 26, rotate: 1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -16, rotate: -1 }} transition={{ duration: 0.55, ease }} className="ml-[11%] max-w-5xl"><p className="font-display text-[clamp(2.3rem,4.8vw,5.3rem)] font-medium leading-[0.95] tracking-[-0.078em]">{notes[activeNote].quote}</p><p className="mt-8 text-sm font-bold tracking-[0.13em] text-teal">{notes[activeNote].person.toUpperCase()}</p></motion.article></AnimatePresence></div></div></section>

      <section id="visit" className="bg-mint px-5 py-24 md:px-10 md:py-32"><div className="mx-auto grid max-w-[1540px] gap-14 lg:grid-cols-12"><div className="lg:col-span-6"><p className="section-kicker">VISIT BRIGHT SMILE</p><h2 className="mt-5 max-w-xl font-display text-[clamp(3.6rem,6.4vw,7rem)] font-semibold leading-[0.84] tracking-[-0.095em]">Easy to find.<br />Easy to <i>begin.</i></h2><p className="mt-7 max-w-md text-lg leading-8 text-pine/70">A friendly, modern clinic in the heart of Islamabad. Start with the question you have today.</p><OpenAssistantButton className="mt-10" /></div><div className="lg:col-span-5 lg:col-start-8"><div className="rounded-[2rem] bg-paper p-7 shadow-[0_22px_60px_rgba(17,44,39,.12)] md:p-10"><Info icon={<MapPin size={24} weight="duotone" />} title="Find us" text={<>Suite 402, 4th Floor, F-7 Markaz<br />Jinnah Super Market, Islamabad</>} /><Info icon={<CalendarBlank size={24} weight="duotone" />} title="Clinic hours" text={<>Monday to Saturday<br />10:00 AM to 8:00 PM</>} /><Info icon={<Phone size={24} weight="duotone" />} title="Urgent concerns" text={<>Walk-ins are welcome when a clinician is available.</>} last /></div></div></div></section>
      <footer className="bg-pine px-5 py-8 text-paper md:px-10"><div className="mx-auto flex max-w-[1540px] flex-wrap items-center justify-between gap-6"><Brand /><p className="text-sm text-paper/55">Thoughtful care for every smile.</p><a href="#top" className="interactive-link text-paper">Back to top <ArrowUpRight size={17} /></a></div></footer>
      <ChatWidget />
    </main>
  );
}

function Header({ solid }: { solid: boolean }) {
  return <motion.header animate={{ backgroundColor: solid ? "rgba(17,44,39,.94)" : "rgba(17,44,39,0)", boxShadow: solid ? "0 10px 30px rgba(0,0,0,.12)" : "0 0px 0px rgba(0,0,0,0)" }} transition={{ duration: 0.35, ease }} className="fixed inset-x-0 top-0 z-[60] border-b border-paper/0 backdrop-blur-md"><nav className="mx-auto flex max-w-[1540px] items-center justify-between px-5 py-5 text-paper md:px-10"><Link href="/#top" aria-label="Bright Smile Dental home"><Brand /></Link><div className="hidden items-center gap-8 text-sm font-semibold text-paper/75 md:flex"><Link className="nav-link" href="/care">Care</Link><Link className="nav-link" href="/team">Our team</Link><Link className="nav-link" href="/visit">Visit</Link></div><Link href="/visit#booking" className="header-cta">Request a visit <ArrowUpRight size={15} /></Link></nav></motion.header>;
}

function Word({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <span className="inline-block overflow-hidden pb-2"><motion.span className={`inline-block ${className}`} initial={reduceMotion ? false : { y: "110%", rotate: 3 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 0.8, delay, ease }}>{children}</motion.span></span>;
}

function Fact({ number, label }: { number: string; label: string }) { return <div className="border-l border-pine/20 pl-4"><p className="font-mono text-xs text-coral">{number}</p><p className="mt-2 text-sm font-semibold leading-5">{label}</p></div>; }

function QuickLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return <a href={href} className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-pine/20 px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-1 hover:border-pine hover:bg-pine hover:text-paper active:translate-y-0">{icon}<span>{label}</span><ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>;
}

const serviceImages = [
  { src: "/images/real-examination.jpeg", alt: "A dentist during a chairside examination" },
  { src: "/images/real-xray-consult.jpeg", alt: "A dentist reviewing digital radiographs with a patient" },
  { src: "/images/real-chairside.jpeg", alt: "Dental equipment prepared at chairside" },
  { src: "/images/real-exam.jpeg", alt: "A clinical dental examination in progress" },
];

function ServiceVisual({ active }: { active: number }) {
  const reduceMotion = useReducedMotion();
  const image = serviceImages[active];
  return <div className="relative aspect-[4/4.7] max-w-[330px] overflow-hidden rounded-[1.5rem_1.5rem_1.5rem_5rem] bg-mint"><AnimatePresence mode="wait"><motion.div key={image.src} initial={reduceMotion ? false : { opacity: 0, scale: 1.12, clipPath: "inset(0 0 0 100%)" }} animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0%)" }} exit={{ opacity: 0, scale: 1.05, clipPath: "inset(0 100% 0 0)" }} transition={{ duration: 0.65, ease }} className="absolute inset-0"><Image src={image.src} alt={image.alt} fill sizes="330px" className="object-cover" /></motion.div></AnimatePresence><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pine/75 to-transparent p-5"><span className="font-mono text-[0.61rem] font-bold tracking-[0.13em] text-paper">BRIGHT SMILE CARE</span></div></div>;
}

function ClinicGallery({ reduceMotion }: { reduceMotion: boolean | null }) {
  return <section className="bg-paper px-5 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-[1540px]"><div className="grid gap-8 border-b border-pine/15 pb-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><p className="section-kicker">THE CLINICAL DETAIL</p><h2 className="mt-5 max-w-3xl font-display text-[clamp(3.4rem,6.4vw,7.1rem)] font-semibold leading-[0.85] tracking-[-0.095em]">The small things support a more <i>confident</i> visit.</h2></div><a href="#visit" className="interactive-link self-end lg:col-span-3 lg:col-start-10">See clinic details <ArrowUpRight size={18} /></a></div><div className="mt-10 grid gap-4 md:grid-cols-12"><motion.figure initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease }} className="group relative min-h-[280px] overflow-hidden rounded-[2rem] md:col-span-7 md:min-h-[540px]"><Image src="/images/real-treatment.jpeg" alt="A dentist working in a treatment room" fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]" /><figcaption className="absolute bottom-0 left-0 right-0 flex justify-between gap-4 bg-gradient-to-t from-pine/75 to-transparent p-6 text-paper"><span className="font-display text-xl tracking-[-0.04em]">Chairside assessment</span><span className="font-mono text-[0.61rem] tracking-[0.13em]">01 / EXAMINATION</span></figcaption></motion.figure><div className="grid gap-4 md:col-span-5"><motion.figure initial={reduceMotion ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="group relative min-h-[250px] overflow-hidden rounded-[2rem]"><Image src="/images/real-instrument-tray.jpeg" alt="Dental instruments arranged on a treatment tray" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" /><figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pine/75 to-transparent p-6 text-paper"><span className="font-display text-xl tracking-[-0.04em]">Instruments prepared with care</span></figcaption></motion.figure><motion.div initial={reduceMotion ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.18, ease }} className="flex min-h-[190px] flex-col justify-between rounded-[2rem] bg-mint p-7"><span className="grid size-11 place-items-center rounded-full bg-pine text-paper"><ChatTeardropText size={21} weight="fill" /></span><div><p className="font-display text-2xl leading-[1] tracking-[-0.055em]">Questions are part of good care.</p><OpenAssistantButton className="mt-5 bg-pine text-paper" /></div></motion.div></div></div></div></section>;
}

function ServiceRow({ service, selected, onSelect }: { service: (typeof services)[number]; selected: boolean; onSelect: () => void }) {
  return <motion.article layout onMouseEnter={onSelect} onFocus={onSelect} animate={{ backgroundColor: selected ? service.color : "rgba(0,0,0,0)" }} transition={{ duration: 0.45, ease }} className="group relative border-b border-pine/15 px-1 py-8 md:px-7 md:py-10"><button onClick={onSelect} className="grid w-full grid-cols-[2.2rem_1fr_auto] gap-3 text-left md:grid-cols-[4.5rem_1fr_auto] md:gap-6"><span className="font-mono text-xs text-coral">{service.number}</span><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full border border-pine/20 text-teal"><ServiceIcon number={service.number} /></span><h3 className="font-display text-[clamp(2rem,3.6vw,4.3rem)] font-semibold leading-[0.92] tracking-[-0.075em]">{service.name}</h3></div><motion.p initial={false} animate={{ height: selected ? "auto" : 0, opacity: selected ? 1 : 0, marginTop: selected ? "1rem" : 0 }} className="max-w-xl overflow-hidden text-base leading-7 text-pine/65">{service.copy}</motion.p></div><motion.span animate={{ rotate: selected ? 45 : 0, backgroundColor: selected ? "#112c27" : "rgba(0,0,0,0)" }} className={`grid size-10 place-items-center rounded-full border border-pine/25 ${selected ? "text-paper" : "text-pine"}`}><Plus size={19} /></motion.span></button><motion.p animate={{ opacity: selected ? 1 : 0, x: selected ? 0 : -8 }} className="ml-[2.2rem] mt-3 text-sm font-medium text-pine/55 md:ml-[4.5rem]">{service.short}</motion.p></motion.article>;
}

function ServiceIcon({ number }: { number: string }) {
  if (number === "01") return <Tooth size={18} weight="duotone" />;
  if (number === "02") return <ShieldCheck size={18} weight="duotone" />;
  if (number === "03") return <Baby size={18} weight="duotone" />;
  return <Stethoscope size={18} weight="duotone" />;
}

function TeamRow({ name, role, copy }: { name: string; role: string; copy: string }) { return <motion.article whileHover={{ x: 8 }} transition={{ duration: 0.3, ease }} className="group py-7"><div className="flex items-start justify-between gap-5"><div><h3 className="font-display text-3xl font-semibold tracking-[-0.06em]">{name}</h3><p className="mt-2 text-[0.68rem] font-bold tracking-[0.14em] text-mango">{role.toUpperCase()}</p></div><ArrowUpRight className="mt-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={21} /></div><p className="mt-5 max-w-lg leading-7 text-paper/65">{copy}</p></motion.article>; }

function Info({ icon, title, text, last = false }: { icon: React.ReactNode; title: string; text: React.ReactNode; last?: boolean }) { return <div className={`flex gap-5 ${last ? "" : "mb-8 border-b border-pine/15 pb-8"}`}><span className="mt-0.5 text-coral">{icon}</span><div><p className="text-xs font-bold tracking-[0.13em] text-teal">{title.toUpperCase()}</p><p className="mt-2 text-lg leading-8 text-pine/75">{text}</p></div></div>; }

function Marquee() {
  const reduceMotion = useReducedMotion();
  const content = <><span>GENTLE GUIDANCE</span><b>✳</b><span>CLINICALLY THOUGHTFUL</span><b>✳</b><span>YOUR QUESTIONS WELCOME</span><b>✳</b><span>BRIGHT SMILE, ISLAMABAD</span><b>✳</b></>;
  return <motion.div animate={reduceMotion ? {} : { x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="flex w-max items-center gap-6 whitespace-nowrap font-mono text-[0.63rem] font-bold tracking-[0.15em] text-paper/65"><span className="flex items-center gap-6">{content}</span><span className="flex items-center gap-6">{content}</span></motion.div>;
}
