'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { ShieldCheck, Smartphone, ArrowLeft } from 'lucide-react';

export default function TwoFactorPage() {
  const router = useRouter();
  const [code, setCode] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Successful 2FA routing to admin dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <AuthLayout>
      <div style={{ maxWidth: '360px', width: '100%', margin: '0 auto' }}>
        {/* Header from Figma Desktop - Login - 2fa */}
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
          Confirm it is you!
        </h1>
        <p
          style={{
            fontSize: '13px',
            color: '#8E8E93',
            marginBottom: '32px',
          }}
        >
          Enter code from your 2FA app
        </p>

        {/* 2FA Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 2FA Code Input Field */}
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
              2FA code
            </label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  width: '100%',
                  fontFamily: 'inherit',
                  letterSpacing: '0.15em',
                }}
              />
              <Smartphone size={16} color="#71717A" style={{ marginLeft: '8px', flexShrink: 0 }} />
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
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>

          {/* Return to Login link */}
          <div style={{ textAlign: 'center', marginTop: '6px' }}>
            <Link
              href="/login"
              style={{
                color: '#8E8E93',
                fontSize: '13px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#8E8E93')}
            >
              <ArrowLeft size={13} />
              <span>Back to login</span>
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
