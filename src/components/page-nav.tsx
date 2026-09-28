import Link from "next/link";
import { ArrowUpRight, Tooth } from "@phosphor-icons/react/dist/ssr";

export function PageNav({ dark = false }: { dark?: boolean }) {
  const tone = dark ? "text-paper bg-pine" : "text-pine bg-paper";
  return <header className={`${tone} border-b border-pine/10`}><nav className="mx-auto flex max-w-[1540px] items-center justify-between px-5 py-5 md:px-10"><Link href="/" className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-[.85rem_.85rem_.85rem_.25rem] bg-pine text-paper"><Tooth size={21} weight="duotone" /></span><span><span className="block font-display font-semibold leading-none tracking-[-.065em]">Bright Smile Dental</span><span className="mt-1 block text-[.48rem] font-bold tracking-[.15em] opacity-55">CARE THAT FOLLOWS THROUGH</span></span></Link><div className="hidden gap-7 text-sm font-semibold md:flex"><Link href="/care">Care</Link><Link href="/team">Our team</Link><Link href="/visit">Visit</Link></div><Link href="/visit#booking" className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2.5 text-xs font-bold text-paper">Request a visit <ArrowUpRight size={15} /></Link></nav></header>;
}
