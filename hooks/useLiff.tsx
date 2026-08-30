'use client';

/**
 * LIFF Custom Hook
 * 提供 React 元件使用的 LIFF 狀態管理
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initializeLiff, isInLineClient, isUserLoggedIn } from '@/lib/liff';
import { LiffContextType, LiffStatus } from '@/types/businessCard';

const LiffContext = createContext<LiffContextType | undefined>(undefined);

interface LiffProviderProps {
  children: ReactNode;
  liffId: string;
  /**
   * 是否自動初始化 LIFF
   * @default true
   */
  autoInit?: boolean;
}

/**
 * LIFF Provider Component
 * 在應用程式最外層包裹此 Provider 以提供 LIFF 功能
 */
export function LiffProvider({
  children,
  liffId,
  autoInit = true,
}: LiffProviderProps) {
  const [status, setStatus] = useState<LiffStatus>('idle');
  const [error, setError] = useState<Error | null>(null);
  const [isInClient, setIsInClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const initialize = async (customLiffId?: string) => {
    const targetLiffId = customLiffId || liffId;

    if (!targetLiffId) {
      const err = new Error('LIFF ID 未提供');
      setError(err);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const result = await initializeLiff({ liffId: targetLiffId });

      if (result.success) {
        setIsInClient(result.isInClient);
        setIsLoggedIn(result.isLoggedIn);
        setStatus('ready');
      } else {
        setError(result.error || new Error('初始化失敗'));
        setStatus('error');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (autoInit && typeof window !== 'undefined') {
      initialize();
    }
  }, [autoInit, liffId]);

  const value: LiffContextType = {
    status,
    error,
    isInClient,
    isLoggedIn,
    initialize,
  };

  return <LiffContext.Provider value={value}>{children}</LiffContext.Provider>;
}

/**
 * useLiff Hook
 * 在任何元件中使用此 Hook 來存取 LIFF 狀態與功能
 * 
 * @example
 * ```tsx
 * const { status, isInClient, error } = useLiff();
 * 
 * if (status === 'loading') return <div>載入中...</div>;
 * if (status === 'error') return <div>錯誤: {error?.message}</div>;
 * if (!isInClient) return <div>請在 LINE 中開啟</div>;
 * ```
 */
export function useLiff() {
  const context = useContext(LiffContext);

  if (context === undefined) {
    throw new Error('useLiff 必須在 LiffProvider 內部使用');
  }

  return context;
}
