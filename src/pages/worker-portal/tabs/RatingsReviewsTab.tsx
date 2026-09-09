import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { REVIEWS_LIST } from '../data/workerMockData';
import type { ReviewItem } from '../data/workerMockData';

export const RatingsReviewsTab: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_LIST);
  const [replyTextMap, setReplyTextMap] = useState<{ [key: string]: string }>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const handleSendReply = (reviewId: string) => {
    const text = replyTextMap[reviewId];
    if (!text || !text.trim()) return;

    setReviews(prev => prev.map(r => {
      if (r.id === reviewId) {
        return { ...r, workerReply: text };
      }
      return r;
    }));

    setReplyTextMap(prev => ({ ...prev, [reviewId]: '' }));
    setActiveReplyId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Ratings Overview Card */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        <div className="md:col-span-5 text-center md:text-left space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Worker Reputation Score</span>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-5xl font-black text-white">4.9</span>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1">Based on 128 verified customer ratings</p>
            </div>
          </div>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="md:col-span-7 space-y-2 text-xs">
          {[
            { stars: '5 Stars', count: 118, pct: '92%' },
            { stars: '4 Stars', count: 8, pct: '6%' },
            { stars: '3 Stars', count: 2, pct: '2%' },
            { stars: '2 Stars', count: 0, pct: '0%' },
            { stars: '1 Star', count: 0, pct: '0%' }
          ].map((bar, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-14 text-slate-400 font-semibold">{bar.stars}</span>
              <div className="flex-1 bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div style={{ width: bar.pct }} className="bg-amber-400 h-full rounded-full" />
              </div>
              <span className="w-10 text-right text-slate-400 font-mono">{bar.count}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Customer Reviews Feed */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          Recent Customer Feedback & Reviews ({reviews.length})
        </h3>

        {reviews.map((rev) => (
          <div 
            key={rev.id} 
            className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={rev.avatar} 
                  alt={rev.customerName} 
                  className="w-10 h-10 rounded-full object-cover border border-slate-700" 
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.customerName}</h4>
                  <p className="text-xs text-slate-400">Job: {rev.jobTitle} • {rev.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-xl text-amber-300 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{rev.rating.toFixed(1)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-200 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed italic">
              "{rev.comment}"
            </p>

            {/* Worker Reply Section */}
            {rev.workerReply ? (
              <div className="ml-4 pl-4 border-l-2 border-blue-500 text-xs space-y-1">
                <p className="text-blue-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Your Reply to Customer:
                </p>
                <p className="text-slate-300 italic">"{rev.workerReply}"</p>
              </div>
            ) : (
              <div>
                {activeReplyId === rev.id ? (
                  <div className="space-y-2 pt-2">
                    <textarea
                      value={replyTextMap[rev.id] || ''}
                      onChange={(e) => setReplyTextMap({ ...replyTextMap, [rev.id]: e.target.value })}
                      placeholder="Write a polite response to this customer..."
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSendReply(rev.id)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-1.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Post Reply
                      </button>
                      <button
                        onClick={() => setActiveReplyId(null)}
                        className="text-slate-400 hover:text-white text-xs px-2 py-1 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveReplyId(rev.id)}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Reply to this review
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
