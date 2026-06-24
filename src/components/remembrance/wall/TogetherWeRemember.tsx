import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { PAGE_CONTENT_CONTAINER } from "@/components/layout/PageHero";

const DUMMY_NAMES = [
  "SARAH THOMPSON", "DAVID WILLIAMS", "MARK EVANS", "ANDREW BROWN", "LUCY HARRIS",
  "MICHAEL JOHNSON", "DANIEL CLARKE", "EMMA WILSON", "GARY MOORE", "AND MANY MORE"
];

export default function TogetherWeRemember() {
  return (
    <div className="w-full bg-[#050A14] border-t border-white/10 text-white py-8 overflow-hidden relative z-20">
      <div className={PAGE_CONTENT_CONTAINER}>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex items-center gap-6 shrink-0 text-center lg:text-left">
            <div className="hidden lg:flex w-14 h-14 bg-white/5 rounded-full items-center justify-center border border-white/10 shrink-0">
              <Flame className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-1">Together, we remember.</h2>
              <p className="text-[11px] text-slate-400 mb-4">Behind every name is a life, a family, a story. Together, we honour them.</p>
              <Link href="/wall-of-remembrance" className="inline-flex items-center justify-center lg:justify-start gap-2 text-[10px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg uppercase tracking-[0.2em] transition-colors">
                View Wall of Remembrance <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full overflow-hidden relative hidden lg:block">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050A14] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050A14] to-transparent z-10 pointer-events-none"></div>
            <div className="flex gap-x-6 gap-y-4 flex-wrap justify-center text-[11px] font-bold text-slate-600 uppercase tracking-widest leading-relaxed">
               {DUMMY_NAMES.map((name, i) => (
                 <span key={i} className="whitespace-nowrap flex items-center gap-6">
                   {name} {i < DUMMY_NAMES.length - 1 && <span className="w-1 h-1 rounded-full bg-slate-800"></span>}
                 </span>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
