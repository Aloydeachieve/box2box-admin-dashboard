'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('superadmin@box2box.ng');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <AuthLayout>
      <div style={{ maxWidth: '360px', width: '100%', margin: '0 auto' }}>
        {/* Header from Figma Desktop - Forgot password */}
        <h1
          style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '6px',
            letterSpacing: '-0.02em',
          }}
        >
          Forgot password?
        </h1>
        <p
          style={{
            fontSize: '13px',
            color: '#8E8E93',
            marginBottom: '32px',
            lineHeight: 1.45,
          }}
        >
          That&apos;s okay. Enter your email and we will send you a new password
        </p>

        {isSubmitted ? (
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#1E1E22',
              border: '1px solid rgba(245, 200, 66, 0.4)',
              textAlign: 'center',
            }}
          >
            <CheckCircle2 size={36} color="#F5C842" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF', marginBottom: '6px' }}>
              Reset link sent!
            </h3>
            <p style={{ fontSize: '12px', color: '#8E8E93', marginBottom: '16px' }}>
              We have dispatched recovery instructions to <strong style={{ color: '#FFFFFF' }}>{email}</strong>.
            </p>
            <Link
              href="/login"
              style={{
                display: 'inline-block',
                width: '100%',
                padding: '10px 0',
                backgroundColor: '#F5C842',
                color: '#000000',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                textDecoration: 'none',
              }}
            >
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email Address Input Field */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#1E1E22',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '10px 14px',
                position: 'relative',
                transition: 'border-color 0.2s',
              }}
            >
              <label
                style={{
                  fontSize: '11px',
                  color: '#8E8E93',
                  marginBottom: '4px',
                  fontWeight: 500,
                }}
              >
                Email address
              </label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="superadmin@box2box.ng"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    width: '100%',
                    fontFamily: 'inherit',
                  }}
                />
                <Mail size={16} color="#71717A" style={{ marginLeft: '8px', flexShrink: 0 }} />
              </div>
            </div>

            {/* Yellow Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                height: '46px',
                backgroundColor: '#F5C842',
                color: '#000000',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '8px',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F7D25A')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F5C842')}
            >
              {isLoading ? 'Sending...' : 'Send new password'}
            </button>

            {/* Return to Login link */}
            <div style={{ textAlign: 'center', marginTop: '6px' }}>
              <Link
                href="/login"
                style={{
                  color: '#8E8E93',
                  fontSize: '13px',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#8E8E93')}
              >
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
