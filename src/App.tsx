import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from '@/components/layout';
import { Skeleton, ErrorBoundary } from '@/components/common';
import { ProtectedRoute } from '@/components/auth';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SEARCH_STALE_TIME } from '@/utils/constants';
import styles from './App.module.css';

const Catalog = lazy(() => import('@/features/catalog').then((m) => ({ default: m.Catalog })));
const BookDetailsPage = lazy(() => import('@/features/book-details').then((m) => ({ default: m.BookDetail })));
const MyLoans = lazy(() => import('@/features/loans').then((m) => ({ default: m.MyLoans })));
const Wishlist = lazy(() => import('@/features/wishlist').then((m) => ({ default: m.Wishlist })));
const SignIn = lazy(() => import('@/features/auth').then((m) => ({ default: m.SignIn })));
const SignUp = lazy(() => import('@/features/auth').then((m) => ({ default: m.SignUp })));
const Terms = lazy(() => import('@/features/legal').then((m) => ({ default: m.Terms })));
const Privacy = lazy(() => import('@/features/legal').then((m) => ({ default: m.Privacy })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: SEARCH_STALE_TIME,
      retry: 2,
    },
  },
});

function LoadingFallback() {
  return (
    <div className={styles.loadingFallback}>
      <Skeleton width="40%" height="2rem" />
      <Skeleton width="100%" height="3rem" />
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton width="80%" height="1rem" />
            <Skeleton width="60%" height="0.875rem" />
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppShell>
          <Suspense fallback={<LoadingFallback />}>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="/book/:id" element={<BookDetailsPage />} />
                <Route path="/sign-in/*" element={<SignIn />} />
                <Route path="/sign-up/*" element={<SignUp />} />
                <Route
                  path="/my-loans"
                  element={
                    <ProtectedRoute>
                      <MyLoans />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  }
                />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </AppShell>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;