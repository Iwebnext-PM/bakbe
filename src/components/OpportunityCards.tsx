import { ArrowRight, ChevronRight } from 'lucide-react';
import { OPPORTUNITY_CATEGORIES, type OpportunityCategory } from '../data/prodriverData';
import { ResilientImage } from './ResilientImage';

interface OpportunityCardsProps {
  onLearnMore: (opp: OpportunityCategory) => void;
  onApply: (opp: OpportunityCategory) => void;
}

export function OpportunityCards({ onLearnMore, onApply }: OpportunityCardsProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {OPPORTUNITY_CATEGORIES.map((opp) => (
          <article
            key={opp.slug}
            className="group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-slate-300 hover:shadow-md"
          >
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <ResilientImage
                  src={opp.image}
                  alt={opp.imageAlt}
                  fallbackLabel={opp.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-6 space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#EA580C]">
                  {opp.kicker}
                </p>
                <h3 className="font-display text-2xl font-bold uppercase text-slate-900 tracking-wide">
                  {opp.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {opp.shortDescription}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center gap-3">
              <a
                href={opp.route}
                onClick={(e) => {
                  e.preventDefault();
                  onLearnMore(opp);
                }}
                className="flex-1 inline-flex items-center justify-center gap-1 min-h-[42px] px-3.5 py-2 border border-slate-300 rounded-md text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-50 transition-colors whitespace-nowrap"
              >
                <span>Learn More</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => onApply(opp)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="text-xs text-slate-500 text-center max-w-3xl mx-auto leading-relaxed">
        Opportunity Notice: Categories shown above represent general commercial driving career paths
        explored through ProDriver and do not represent guaranteed open positions or confirmed
        individual vacancies. Availability depends on location, qualifications, and carrier needs.
      </p>
    </div>
  );
}
