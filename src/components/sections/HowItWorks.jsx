import SectionHeader from "@/components/ui/SectionHeader";
import { CalendarIcon, CarIcon, PinIcon } from "@/components/ui/Icons";

const steps = [
  { title: "Choose Location", description: "Aliquam erat volutpat. Integer malesuada turpis id ligula suscipit. Maecenas ultrices, orci vitae convallis mattis.", icon: PinIcon },
  { title: "Pick-up Date", description: "Aliquam erat volutpat. Integer malesuada turpis id ligula suscipit. Maecenas ultrices, orci vitae convallis mattis.", icon: CalendarIcon },
  { title: "Book your car", description: "Aliquam erat volutpat. Integer malesuada turpis id ligula suscipit. Maecenas ultrices, orci vitae convallis mattis.", icon: CarIcon },
];

export default function HowItWorks() {
  return <section id="how-it-work" aria-labelledby="how-it-works-title" className="bg-white px-6 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeader id="how-it-works-title" title="How it works" description="A high-performing web-based car rental system for any rent-a-car company and website" /><ul className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-16">{steps.map(({ title, description, icon: Icon }, index) => <li key={title} className="relative text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-150 text-2xl text-gray-200"><Icon /></div>{index < steps.length - 1 && <svg aria-hidden="true" className="absolute left-[58%] top-7 hidden h-16 w-[85%] md:block" viewBox="0 0 220 70" fill="none"><path d="M0 38C63 65 105 -9 220 21" stroke="#A6AAAF" strokeWidth="1.25" /></svg>}<h3 className="mt-7 text-base font-bold text-secondary">{title}</h3><p className="mx-auto mt-3 max-w-xs text-xs leading-5 text-text-body">{description}</p></li>)}</ul></div></section>;
}
