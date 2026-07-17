import React from "react";
import { Calendar, Tag, ArrowRight, Newspaper } from "lucide-react";

interface NewsItem {
  id: number;
  category: string;
  date: string;
  title: string;
  summary: string;
  link: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    category: "Announcements",
    date: "June 22, 2026",
    title: "Trastbank Launches Eco-Friendly Auto Loans for Electric Vehicles",
    summary: "Starting this week, Trastbank private clients can apply for specialized auto loans for electric and hybrid vehicles with a reduced interest rate starting from 21% APR.",
    link: "#news-1"
  },
  {
    id: 2,
    category: "Ratings",
    date: "June 18, 2026",
    title: "International Rating Agency Fitch Affirms 'B' Rating; Outlook 'Stable'",
    summary: "Fitch Ratings has affirmed Private Joint-Stock Bank 'Trustbank' Long-Term Issuer Default Rating at 'B' with a Stable Outlook, reflecting strong capitalization and asset quality.",
    link: "#news-2"
  },
  {
    id: 3,
    category: "Tenders",
    date: "June 15, 2026",
    title: "Announcement of Open Tender for Banking Infrastructure Security Upgrade",
    summary: "Trastbank announces an open competitive tender for procurement of advanced IT security systems and networking hardware for its Tashkent headquarters.",
    link: "#news-3"
  }
];

export default function NewsSection() {
  return (
    <section id="news" className="py-20 bg-slate-50 relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <Newspaper size={12} />
              <span>Press Center</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight animate-fade-in-up">
              News & Announcements
            </h2>
            <p className="text-text-muted mt-2 text-sm md:text-base max-w-xl">
              Stay updated with the latest events, press releases, tender announcements, and financial reports from Trastbank.
            </p>
          </div>
          <a 
            href="#all-news"
            className="group flex items-center space-x-1.5 text-primary hover:text-primary-hover font-bold text-sm mt-4 md:mt-0 transition-colors"
          >
            <span>View All News</span>
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <article 
              key={item.id}
              className="bg-white border border-slate-100 hover:border-primary/20 shadow-sm rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-text-muted">
                  <span className="flex items-center space-x-1.5">
                    <Calendar size={12} className="text-primary" />
                    <span>{item.date}</span>
                  </span>
                  
                  <span className="flex items-center space-x-1 bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-[10px]">
                    <Tag size={9} />
                    <span>{item.category}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-xs md:text-sm text-text-muted leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              {/* Read More Link */}
              <div className="pt-6 mt-6 border-t border-slate-50 flex">
                <a 
                  href={item.link}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-primary group-hover:text-primary-hover transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
