'use client';

import React, { ReactNode } from 'react';
import { AuthSignInButton } from './AuthSignInButton';
import { useAuth } from './useAuth';

interface AuthGuardProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
    const { user } = useAuth();

    if (!user) {
        return fallback ? (
            <>{fallback}</>
        ) : (
            <div>
                <p>Please sign in to view this content.</p>
                <AuthSignInButton />
            </div>
        );
    }

    return <>{children}</>;
};

// Usage example
export const ProtectedContent: React.FC = () => {
    return (
        <AuthGuard fallback={<p>Custom fallback content</p>}>
            <h1>Protected Content</h1>
            <p>This content is only visible to signed-in users.</p>
        </AuthGuard>
    );
};
