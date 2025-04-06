'use client';

import { useCallback } from 'react';

interface ShareButtonsProps {
    title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleShare = useCallback(async (platform: 'x' | 'linkedin' | 'facebook') => {
        const text = `Check out this article: ${title}`;
        const url = shareUrl;

        // Fall back to platform-specific sharing URLs
        let shareLink = '';
        switch (platform) {
            case 'x':
                shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
        }

        // Open the share dialog in a new window
        if (shareLink) {
            window.open(shareLink, '_blank', 'width=600,height=400');
        }
    }, [title, shareUrl]);

    return (
        <div className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Share this article</h3>
            <div className="flex gap-4">
                <button
                    onClick={() => handleShare('x')}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                    aria-label="Share on X (formerly Twitter)"
                >
                    <span className="sr-only">Share on X (formerly Twitter)</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </button>
                <button
                    onClick={() => handleShare('linkedin')}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                    aria-label="Share on LinkedIn"
                >
                    <span className="sr-only">Share on LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                </button>
                <button
                    onClick={() => handleShare('facebook')}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                    aria-label="Share on Facebook"
                >
                    <span className="sr-only">Share on Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </button>
            </div>
        </div>
    );
} 