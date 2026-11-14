import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/prodriverData';

interface FaqAccordionProps {
  limit?: number;
}

export function FaqAccordion({ limit }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const items = limit ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS;

  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="group">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                id={`${item.id}-trigger`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full py-5 px-4 sm:px-6 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#EA580C]"
              >
                <span className="flex items-baseline gap-3">
                  <span className="text-xs font-semibold text-[#EA580C] tabular-nums shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-slate-900">
                    {item.question}
                  </span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#EA580C]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-trigger`}
              hidden={!isOpen}
              className="px-4 sm:px-6 pb-6 pl-11 sm:pl-14 text-slate-600 leading-relaxed text-[15px]"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
