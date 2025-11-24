'use client';

import React from 'react';

// ==============================
// 1. 通用骨架 (Skeleton) 组件
// ==============================
interface SkeletonProps {
    /** Tailwind CSS class string to control the size (h-X w-Y), margin, or specific background color. */
    className?: string;
}

/**
 * 骨架组件：一个圆角背景块，代表内容的形状。
 * 默认尺寸：h-4 w-full
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className = 'h-4 w-full' }) => {
    return (
        // 使用 bg-gray-200 作为默认的骨架背景色
        <div className={`bg-gray-200 rounded ${className}`} />
    );
};

// ==============================
// 2. Shimmer 动画容器
// ==============================

interface ShimmerWrapperProps {
    /** 要应用 Shimmer 动画的子元素 (通常是 Skeleton 组件)。*/
    children: React.ReactNode;
}

/**
 * Shimmer 包装器：应用 Tailwind CSS 的 animate-pulse 动画，提供加载中的视觉反馈。
 * Shimmering effect is achieved via Tailwind's built-in `animate-pulse` which modulates opacity.
 */
export const ShimmerWrapper: React.FC<ShimmerWrapperProps> = ({ children }) => {
    // animate-pulse 改变元素的 opacity 从 100% 到 50% 再到 100%
    return (
        <div className="animate-pulse">
            {children}
        </div>
    );
};