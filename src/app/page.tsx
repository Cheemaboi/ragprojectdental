import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarBlank,
  CaretRight,
  Crosshair,
  MapPin,
  Phone,
  Plus,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { ChatWidget } from "@/components/chat-widget";
import { ChatOpenButton } from "@/components/chat-open-button";
import { Reveal } from "@/components/reveal";

const services = [
  ["01", "Everyday care", "Exams, hygiene, digital X-rays, fillings, and restorative treatment without the runaround."],
  ["02", "Orthodontics", "Clear aligner and braces planning for teens and adults, considered around real life."],
  ["03", "Children's visits", "A softer first experience that lets young patients settle into their own pace."],
  ["04", "Urgent concerns", "Support for pain, swelling, broken teeth, and lost fillings during clinic hours."],
];

const testimonials = [
  "I never felt rushed. Every next step was explained in a way that made sense.",
  "My son settled in quickly. The whole visit felt surprisingly calm.",
  "Thoughtful care, clear answers, and no pressure to decide on the spot.",
];

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`brand-mark ${inverse ? "brand-mark-inverse" : ""}`} aria-hidden="true">
      <span>B</span><i />
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[var(--ui-background)] text-ink">
      <section className="relative min-h-[720px] overflow-hidden bg-pine text-cream md:min-h-screen">
        <div className="hero-grain absolute inset-0 opacity-60" />
        <nav className="relative z-10 mx-auto flex max-w-[1480px] items-center justify-between px-6 py-6 md:px-10 md:py-8">
          <Link href="#top" className="flex items-center gap-3" aria-label="Bright Smile Dental home">
            <BrandMark inverse />
            <span className="font-display text-[1.05rem] font-semibold tracking-[-0.06em]">Bright Smile</span>
            <span className="hidden text-xs font-medium tracking-[0.14em] text-cream/55 sm:block">DENTAL</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-cream/75 md:flex">
            <a className="nav-link" href="#care">Care</a>
            <a className="nav-link" href="#team">Team</a>
            <a className="nav-link" href="#visit">Visit us</a>
          </div>
          <a href="#booking" className="button-light text-sm">Request a visit <ArrowUpRight size={17} weight="bold" /></a>
        </nav>

        <div id="top" className="relative z-10 mx-auto grid max-w-[1480px] items-end gap-12 px-6 pb-10 pt-14 md:grid-cols-12 md:px-10 md:pb-14 md:pt-20 lg:pt-24">
          <Reveal className="md:col-span-6 lg:col-span-5" delay={0.05}>
            <div className="mb-7 flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.16em] text-mango">
              <span className="h-px w-10 bg-mango" /> DENTAL CARE, MADE HUMAN
            </div>
            <h1 className="max-w-[680px] font-display text-[clamp(4rem,8.6vw,8.9rem)] font-semibold leading-[0.82] tracking-[-0.095em]">
              A brighter way <em className="font-normal text-mango">to feel</em> at ease.
            </h1>
            <p className="mt-9 max-w-md text-lg leading-8 text-cream/68 md:text-xl">
              Modern dental care in Islamabad, shaped around clear guidance, gentle pacing, and your actual questions.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#booking" className="button-coral">Request a visit <ArrowUpRight size={18} weight="bold" /></a>
              <a href="#care" className="group inline-flex items-center gap-2 text-sm font-semibold text-cream transition-colors duration-300 hover:text-mango">
                Explore the clinic <span className="grid h-7 w-7 place-items-center rounded-full border border-cream/25 transition-transform duration-300 group-hover:translate-x-1"><CaretRight size={15} /></span>
              </a>
            </div>
          </Reveal>

          <Reveal className="relative md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7" delay={0.16}>
            <div className="relative ml-auto max-w-[640px]">
              <div className="absolute -left-8 top-10 hidden h-[72%] w-px bg-mango/70 md:block" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[9rem] rounded-bl-[2rem] rounded-br-[2rem] border border-cream/10 shadow-[0_32px_100px_rgba(0,0,0,.32)] sm:aspect-[1.08/1]">
                <Image src="/images/clinic-consultation.png" alt="A dentist talking through care options with a patient" fill priority className="object-cover object-[54%_50%] hero-image" sizes="(max-width: 768px) 100vw, 48vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-pine/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-3 max-w-[230px] rounded-2xl bg-cream px-5 py-4 text-pine shadow-xl md:-left-14">
                <div className="mb-1 flex items-center gap-2 text-[0.64rem] font-bold tracking-[0.12em] text-teal"><Sparkle size={14} weight="fill" /> A CALMER STANDARD</div>
                <p className="font-display text-lg leading-tight tracking-[-0.045em]">No rush. No guesswork. Just good care.</p>
              </div>
              <div className="absolute -right-2 top-8 hidden rotate-90 items-center gap-3 text-[0.62rem] font-bold tracking-[0.18em] text-cream/75 lg:flex"><span className="h-px w-10 bg-cream/40" /> ISLAMABAD</div>
            </div>
          </Reveal>
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1480px] items-center justify-between px-6 pb-7 text-[0.65rem] font-semibold tracking-[0.14em] text-cream/50 md:px-10">
          <span>OPEN MONDAY TO SATURDAY</span><a href="#care" aria-label="Scroll to care" className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 text-cream transition-all duration-300 hover:border-mango hover:bg-mango hover:text-pine"><ArrowDownRight size={18} /></a>
        </div>
      </section>

      <section id="care" className="relative bg-sage px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1480px]">
          <Reveal className="grid gap-7 border-b border-pine/15 pb-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7"><p className="eyebrow text-teal">THE CARE YOU NEED</p><h2 className="mt-5 max-w-3xl font-display text-[clamp(3rem,5.7vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.08em]">Built around the person, not the procedure.</h2></div>
            <p className="max-w-xs pb-2 text-base leading-7 text-ink/65 md:col-span-3 md:col-start-10">Start with a conversation. We will explain what we see, what can wait, and what comes next.</p>
          </Reveal>
          <div className="grid md:grid-cols-2">
            {services.map(([number, title, description], index) => (
              <Reveal key={title} delay={index * 0.07} className={`group border-b border-pine/15 py-8 md:py-10 ${index % 2 ? "md:pl-10" : "md:pr-10 md:border-r"}`}>
                <div className="flex gap-5"><span className="pt-1 font-mono text-xs text-coral">{number}</span><div className="flex-1"><div className="flex items-start justify-between gap-4"><h3 className="font-display text-3xl font-semibold tracking-[-0.065em] md:text-4xl">{title}</h3><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-pine/20 transition-all duration-500 ease-out group-hover:rotate-45 group-hover:border-pine group-hover:bg-pine group-hover:text-cream"><Plus size={18} /></span></div><p className="mt-4 max-w-md text-base leading-7 text-ink/65">{description}</p></div></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="bg-cream px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1480px] gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-[560px]">
              <div className="absolute -inset-5 -rotate-3 rounded-[2rem] border border-teal/20" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sage"><Image src="/images/dental-team.png" alt="Bright Smile Dental clinicians in their practice" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 38vw" /></div>
              <div className="absolute -bottom-5 -right-3 rounded-full bg-coral px-5 py-4 text-xs font-bold tracking-[0.08em] text-cream shadow-lg">2 CLINICIANS<br />ONE CALM ROOM</div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <p className="eyebrow text-teal">MEET THE CLINICIANS</p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(3.3rem,5.5vw,6.2rem)] font-semibold leading-[0.87] tracking-[-0.085em]">Expertise with <em className="font-normal text-coral">a human</em> point of view.</h2>
            <div className="mt-11 divide-y divide-pine/15 border-y border-pine/15">
              <article className="group py-6"><div className="flex items-start justify-between gap-6"><div><h3 className="font-display text-3xl font-semibold tracking-[-0.055em]">Dr. Ayesha Khan</h3><p className="mt-2 text-sm font-semibold tracking-[0.08em] text-teal">ORTHODONTIC CLINICIAN</p></div><ArrowUpRight className="mt-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={20} /></div><p className="mt-5 max-w-lg text-base leading-7 text-ink/65">Braces and clear aligner planning for teens and adults, thoughtfully mapped.</p></article>
              <article className="group py-6"><div className="flex items-start justify-between gap-6"><div><h3 className="font-display text-3xl font-semibold tracking-[-0.055em]">Dr. Omar Siddiqui</h3><p className="mt-2 text-sm font-semibold tracking-[0.08em] text-teal">GENERAL DENTIST</p></div><ArrowUpRight className="mt-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={20} /></div><p className="mt-5 max-w-lg text-base leading-7 text-ink/65">Preventive treatment, restorative care, and attentive support for urgent concerns.</p></article>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="booking" className="bg-pine px-6 py-20 text-cream md:px-10 md:py-28">
        <div className="mx-auto max-w-[1480px]">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6"><p className="eyebrow text-mango">HOW A VISIT FEELS</p><h2 className="mt-5 font-display text-[clamp(3.2rem,5.6vw,6.3rem)] font-semibold leading-[0.88] tracking-[-0.085em]">Clear next steps, from hello to follow-up.</h2></div>
            <div className="grid gap-5 lg:col-span-5 lg:col-start-8">
              {["Tell us what you need in a short booking request.", "We confirm a time that fits your care plan.", "Leave with a clear sense of what comes next."].map((step, index) => <div key={step} className="flex gap-5 border-t border-cream/20 pt-4"><span className="font-mono text-sm text-mango">0{index + 1}</span><p className="text-lg leading-7 text-cream/85">{step}</p></div>)}
            </div>
          </Reveal>
          <Reveal delay={0.18} className="mt-14 flex flex-col justify-between gap-8 rounded-[2rem] bg-cream p-7 text-pine md:flex-row md:items-center md:p-10">
            <div><p className="eyebrow text-teal">READY WHEN YOU ARE</p><p className="mt-3 font-display text-3xl font-semibold tracking-[-0.055em]">Start your visit request.</p></div><a href="#visit" className="button-dark">Choose a time <CalendarBlank size={19} weight="bold" /></a>
          </Reveal>
        </div>
      </section>

      <section className="bg-sage px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1480px]"><Reveal><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow text-teal">WHAT PATIENTS NOTICE</p><h2 className="mt-5 font-display text-[clamp(3.2rem,5.6vw,6.2rem)] font-semibold leading-[0.88] tracking-[-0.08em]">Care people<br />recommend.</h2></div><span className="mb-2 font-mono text-xs text-ink/50">03 NOTES FROM THE CLINIC</span></div></Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-pine/15 md:grid-cols-3">
            {testimonials.map((quote, index) => <Reveal key={quote} delay={index * 0.08} className="bg-sage"><article className="group min-h-[275px] p-7 transition-colors duration-500 hover:bg-cream md:p-9"><span className="font-display text-5xl leading-none text-coral">“</span><p className="mt-7 font-display text-2xl font-medium leading-[1.05] tracking-[-0.055em]">{quote}</p><p className="mt-8 text-[0.67rem] font-bold tracking-[0.15em] text-teal">PATIENT NOTE</p></article></Reveal>)}
          </div>
        </div>
      </section>

      <section id="visit" className="bg-cream px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1480px] gap-14 lg:grid-cols-12 lg:items-start"><Reveal className="lg:col-span-6"><p className="eyebrow text-teal">VISIT BRIGHT SMILE</p><h2 className="mt-5 max-w-2xl font-display text-[clamp(3.4rem,6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em]">In the heart of <em className="font-normal text-coral">Islamabad.</em></h2><p className="mt-7 max-w-md text-lg leading-8 text-ink/65">A considered clinic experience, from the first question to the next appointment.</p><ChatOpenButton /></Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.12}><div className="rounded-[2rem] border border-pine/15 bg-[#f7f5ee] p-7 shadow-[0_20px_50px_rgba(20,48,42,.08)] md:p-10"><div className="flex gap-5"><MapPin className="mt-1 shrink-0 text-coral" size={25} weight="duotone" /><p className="text-xl leading-8 text-ink/75">Suite 402, 4th Floor, F-7 Markaz<br />Jinnah Super Market, Islamabad</p></div><div className="my-8 h-px bg-pine/15" /><div className="flex gap-5"><CalendarBlank className="mt-1 shrink-0 text-teal" size={24} weight="duotone" /><p className="text-xl leading-8 text-ink/75">Monday to Saturday<br />10:00 AM to 8:00 PM</p></div><div className="my-8 h-px bg-pine/15" /><div className="flex gap-5"><Phone className="mt-1 shrink-0 text-teal" size={24} weight="duotone" /><p className="text-lg leading-8 text-ink/75">Walk-ins are welcome for urgent concerns when a clinician is available.</p></div></div></Reveal>
        </div>
      </section>

      <footer className="border-t border-pine/15 bg-cream px-6 py-7 md:px-10"><div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-4 text-sm text-ink/60"><div className="flex items-center gap-3"><BrandMark /><span className="font-display font-semibold text-pine">Bright Smile Dental</span><span>Islamabad</span></div><span>Thoughtful care for every smile.</span></div></footer>
      <ChatWidget />
    </main>
  );
}
