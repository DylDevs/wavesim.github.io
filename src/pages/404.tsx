import React from 'react';
import { useRouter } from 'next/router';

export default function NotFound() {
    const { push } = useRouter()
    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] items-center justify-center space-y-5">
            <h1 className="text-6xl font-bold">404</h1>
            <h3 className="text-3xl font-bold underline cursor-pointer" onClick={() => push('/')}>Go Home</h3>
        </div>
    );
}