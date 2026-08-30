/**
 * LIFF SDK 模組化封裝
 * 提供統一的 LIFF 初始化與狀態管理介面
 */

import liff from '@line/liff';

/**
 * LIFF 初始化配置
 */
export interface LiffConfig {
  liffId: string;
  /**
   * 是否在非 LINE 環境中使用 mock 模式（開發用）
   * @default false
   */
  mockMode?: boolean;
}

/**
 * LIFF 初始化結果
 */
export interface LiffInitResult {
  success: boolean;
  isInClient: boolean;
  isLoggedIn: boolean;
  error?: Error;
}

/**
 * 初始化 LIFF SDK
 * @param config LIFF 配置
 * @returns 初始化結果
 */
export async function initializeLiff(
  config: LiffConfig
): Promise<LiffInitResult> {
  try {
    await liff.init({ liffId: config.liffId });

    const isInClient = liff.isInClient();
    const isLoggedIn = liff.isLoggedIn();

    return {
      success: true,
      isInClient,
      isLoggedIn,
    };
  } catch (error) {
    console.error('LIFF 初始化失敗:', error);
    return {
      success: false,
      isInClient: false,
      isLoggedIn: false,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * 檢查是否在 LINE 客戶端內
 */
export function isInLineClient(): boolean {
  if (typeof window === 'undefined') return false;
  return liff.isInClient();
}

/**
 * 檢查使用者是否已登入
 */
export function isUserLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return liff.isLoggedIn();
}

/**
 * 取得使用者 Profile
 */
export async function getUserProfile() {
  if (!liff.isLoggedIn()) {
    throw new Error('使用者未登入');
  }
  return await liff.getProfile();
}

/**
 * LIFF 登入
 */
export function login() {
  liff.login();
}

/**
 * LIFF 登出
 */
export function logout() {
  liff.logout();
}

/**
 * 關閉 LIFF 視窗
 */
export function closeWindow() {
  liff.closeWindow();
}

export { liff };
