import { useAuth } from '@clerk/react-router';
import { RedirectToSignIn } from '@clerk/react-router';
import type { ReactNode } from 'react';
import { Skeleton } from '@/components/common';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Skeleton width="100%" height="100vh" />;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
}