'use client';

import React, { useState } from 'react';

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: number;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name,
  size = 32,
}) => {
  const [imageError, setImageError] = useState(false);
  const imageSrc = src || '/image/order.svg';

  if (!imageError && imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={name}
        onError={() => setImageError(true)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          backgroundColor: '#374151',
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: '#374151',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${Math.round(size * 0.38)}px`,
        fontWeight: 600,
        color: '#FFFFFF',
        flexShrink: 0,
      }}
    >
      {name ? name.charAt(0).toUpperCase() : 'U'}
    </div>
  );
};
