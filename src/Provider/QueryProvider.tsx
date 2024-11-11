"use client";

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [queryClient] = useState(() => (
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error: any) => {
          if (error.status === 403) {
            router.push('/login');
          }
        }
      }),
      defaultOptions: {
        queries: {
          retry: 1, // API 요청 실패시 재시도 횟수
        }
      }
    })
  ))
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider