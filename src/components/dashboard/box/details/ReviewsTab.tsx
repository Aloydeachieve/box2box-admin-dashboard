'use client';

import React from 'react';
import { Star, Zap, Users } from 'lucide-react';

interface ReviewsTabProps {
  isLightMode?: boolean;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({ isLightMode = false }) => {
  const textColor = isLightMode ? '#111827' : '#FFFFFF';
  const subtextColor = isLightMode ? '#6B7280' : '#DFE5E8';
  const cardBg = isLightMode ? '#FFFFFF' : '#141416';
  const cardBorder = isLightMode ? '1px solid #E5E7EB' : '1px solid rgba(255, 255, 255, 0.08)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Stat Cards (4 cards: 7 Days rating, 7 Days cleanliness rating, 7 Days rating count, Avg. Daily Drain) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        {[
          { label: '7 Days rating', value: '4.5' },
          { label: '7 Days cleanliness rating', value: '5.0' },
          { label: '7 Days rating count', value: '200' },
          { label: 'Avg. Daily Drain', value: '3.1%' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: cardBg,
              borderRadius: '14px',
              border: cardBorder,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '11px', color: subtextColor }}>{stat.label}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: textColor }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* 2-Column Split: Reviews List on Left + Rating Summary Card on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '18px',
        }}
        className="reviews-split-grid"
      >
        {/* Left Column: Reviews List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
            Reviews
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                name: 'Aku Cynthia',
                date: 'Mar 20, 2024',
                serviceRating: 4,
                cleanlinessRating: 4,
                comment: 'Excellent locker! Very clean and secure. The location is perfect.',
                avatarColor: '#F59E0B',
              },
              {
                name: 'Leo Martinez',
                date: 'Apr 10, 2024',
                serviceRating: 5,
                cleanlinessRating: 5,
                comment: 'Super easy to access and the instructions were clear. Made my trip hassle-free!',
                avatarColor: '#10B981',
              },
              {
                name: 'Nina Patel',
                date: 'Apr 15, 2024',
                serviceRating: 3,
                cleanlinessRating: 3,
                comment: 'Decent service but felt a bit pricey for the time I used it.',
                avatarColor: '#EC4899',
              },
              {
                name: 'Jamal Thompson',
                date: 'Apr 22, 2024',
                serviceRating: 5,
                cleanlinessRating: 5,
                comment: "Locks felt very secure and the area was well monitored. I'd definitely use it again.",
                avatarColor: '#3B82F6',
              },
            ].map((rev) => (
              <div
                key={rev.name}
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '14px',
                  border: cardBorder,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {/* Reviewer Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: rev.avatarColor,
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>{rev.name}</div>
                      <div style={{ fontSize: '11px', color: subtextColor }}>{rev.date}</div>
                    </div>
                  </div>

                  {/* Rating Badges: Service & Cleanliness */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={11}
                            fill={i < rev.serviceRating ? '#F5C842' : 'transparent'}
                            color={i < rev.serviceRating ? '#F5C842' : subtextColor}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '11px', color: subtextColor }}>Service</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={11}
                            fill={i < rev.cleanlinessRating ? '#F5C842' : 'transparent'}
                            color={i < rev.cleanlinessRating ? '#F5C842' : subtextColor}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '11px', color: subtextColor }}>Cleanliness</span>
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <p style={{ fontSize: '12px', color: textColor, margin: 0, lineHeight: '18px' }}>
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Rating summary Card */}
        <div
          style={{
            backgroundColor: cardBg,
            borderRadius: '16px',
            border: cardBorder,
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: textColor, margin: 0 }}>
            Rating summary
          </h3>

          {/* Score & Stars */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '38px', fontWeight: 800, color: textColor, fontFamily: 'var(--font-outfit), sans-serif' }}>
              4.8
            </span>
            <span style={{ fontSize: '18px', color: subtextColor }}>/5</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="#F5C842" color="#F5C842" />
            ))}
          </div>

          <div style={{ fontSize: '12px', color: subtextColor }}>100,078 reviews</div>

          {/* Rating Breakdown Bars (5 stars to 1 star) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { stars: 5, pct: '75%', count: 25 },
              { stars: 4, pct: '65%', count: 25 },
              { stars: 3, pct: '48%', count: 21 },
              { stars: 2, pct: '38%', count: 20 },
              { stars: 1, pct: '12%', count: 3 },
            ].map((row) => (
              <div key={row.stars} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                <span style={{ width: '14px', color: subtextColor }}>{row.stars}</span>
                <Star size={11} fill="#F5C842" color="#F5C842" />
                <div
                  style={{
                    flex: 1,
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: isLightMode ? '#E5E7EB' : '#222226',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ width: row.pct, height: '100%', backgroundColor: '#F5C842', borderRadius: '3px' }} />
                </div>
                <span style={{ width: '20px', textAlign: 'right', color: subtextColor }}>{row.count}</span>
              </div>
            ))}
          </div>

          {/* 3 Metric Highlight Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <div
              style={{
                backgroundColor: isLightMode ? '#F9FAFB' : '#1A1A1E',
                borderRadius: '10px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={16} color="#10B981" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>4.8</div>
                  <div style={{ fontSize: '10px', color: subtextColor }}>Avg Rating</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: subtextColor }}>100,098 users</span>
            </div>

            <div
              style={{
                backgroundColor: isLightMode ? '#F9FAFB' : '#1A1A1E',
                borderRadius: '10px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} color="#10B981" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>99%</div>
                  <div style={{ fontSize: '10px', color: subtextColor }}>Uptime</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: subtextColor }}>Last 7 days</span>
            </div>

            <div
              style={{
                backgroundColor: isLightMode ? '#F9FAFB' : '#1A1A1E',
                borderRadius: '10px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="#A855F7" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: textColor }}>108</div>
                  <div style={{ fontSize: '10px', color: subtextColor }}>Uptime</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: subtextColor }}>Last 200</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .reviews-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
