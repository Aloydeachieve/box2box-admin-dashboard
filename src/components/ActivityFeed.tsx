'use client';

import React, { useState } from 'react';
import { ActivityEvent } from '@/types';
import {
  Activity,
  Warehouse,
  Truck,
  Box,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ActivityFeedProps {
  events: ActivityEvent[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ events }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredEvents = events.filter((ev) => {
    if (filter === 'all') return true;
    return ev.type === filter;
  });

  const getEventIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'vault_move':
        return <Warehouse size={15} color="#818cf8" />;
      case 'pickup':
        return <Truck size={15} color="#22d3ee" />;
      case 'locker_deposit':
        return <Box size={15} color="#fbbf24" />;
      case 'alert':
        return <AlertTriangle size={15} color="#fb7185" />;
      default:
        return <Activity size={15} color="#34d399" />;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="var(--cyan-400)" />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
            Live Warehouse & Dispatch Log
          </h3>
        </div>
        <span className="badge badge-emerald" style={{ fontSize: '10px' }}>
          Streaming Live
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-glass)',
              transition: 'all 0.15s ease',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              {getEventIcon(event.type)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#ffffff' }}>
                  {event.title}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {event.timestamp}
                </span>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-medium)', lineHeight: 1.4, marginBottom: '6px' }}>
                {event.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px' }}>
                <span style={{ color: 'var(--cyan-400)', fontWeight: 500 }}>{event.actor}</span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span style={{ color: 'var(--text-muted)' }}>{event.hub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
