'use client';

import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#0F0F11',
        display: 'flex',
        flexDirection: 'column',
        color: '#FFFFFF',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Top Navigation Bar from Figma */}
      <header
        style={{
          width: '100%',
          height: '76px',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          zIndex: 10,
        }}
      >
        {/* Brand: Box2Box logo from Figma */}
        <Link
          href="/login"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <img
            src="/image/admin - b2b logo.png"
            alt="Box2Box Logo"
            style={{
              height: '32px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </Link>

        {/* Top Right Yellow Star Accent from Figma */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#F5C842"
            style={{ opacity: 0.9 }}
          >
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
        </div>
      </header>

      {/* Main Centered Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
        }}
      >
        {/* The Thin Line Card Container */}
        <div
          style={{
            width: '100%',
            maxWidth: '920px',
            borderRadius: '24px',
            backgroundColor: '#151518',
            /* The prominent white line surrounding the card as requested */
            border: '1px solid rgba(255, 255, 255, 0.22)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          }}
          className="auth-grid-card"
        >
          {/* Left Column: Interactive Form */}
          <div
            style={{
              padding: '52px 48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {children}
          </div>

          {/* Center Dividing White Line & Right Column: Image Carousel Frame */}
          <div
            style={{
              /* The thin white line dividing the centre as requested */
              borderLeft: '1px solid rgba(255, 255, 255, 0.18)',
              padding: '44px 36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#121214',
              position: 'relative',
            }}
            className="auth-carousel-column"
          >
            <div
              style={{
                width: '100%',
                maxWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Wooden 4-Door Cabinet Asset matching Figma 'no-bg 1' */}
              <img
                src="/image/box1.png"
                alt="Box2Box Modern Storage Unit"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '340px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.7))',
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @media (max-width: 820px) {
          .auth-grid-card {
            grid-template-columns: 1fr !important;
          }
          .auth-carousel-column {
            border-left: none !important;
            border-top: 1px solid rgba(255, 255, 255, 0.18) !important;
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
