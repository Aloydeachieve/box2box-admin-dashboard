'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Mail, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('superadmin@box2box.ng');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Proceed to 2FA verification step as shown in Figma flow
    setTimeout(() => {
      router.push('/login/2fa');
    }, 400);
  };

  return (
    <AuthLayout>
      <div style={{ maxWidth: '360px', width: '100%', margin: '0 auto' }}>
        {/* Header from Figma */}
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
          Welcome back,
        </h1>
        <p
          style={{
            fontSize: '13px',
            color: '#8E8E93',
            marginBottom: '32px',
          }}
        >
          Enter your email address and password
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email Address Input */}
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

          {/* Password Input */}
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
              Password
            </label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: '#71717A',
                  marginLeft: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
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
            {isLoading ? 'Verifying...' : 'Login'}
          </button>

          {/* Forgot Password Link */}
          <div style={{ textAlign: 'center', marginTop: '6px' }}>
            <Link
              href="/forgot-password"
              style={{
                color: '#8E8E93',
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#8E8E93')}
            >
              Forgot password
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
