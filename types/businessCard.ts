/**
 * 電子名片資料結構定義
 */
export interface BusinessCardData {
  /** 公司名稱 */
  companyName: string;
  /** 公司統編 */
  companyTaxId?: string;
  /** 員工姓名 */
  name: string;
  /** 職稱 */
  title: string;
  /** 服務項目描述 */
  services: string;
  /** 聯絡電話 */
  phone: string;
  /** 電子信箱 */
  email: string;
  /** 公司地址 */
  address?: string;
  /** LINE 官方帳號 ID (例如: @abc1234) 或完整網址 */
  lineOfficialId?: string;
  /** 公司網站網址 */
  websiteUrl?: string;
  /** 公司品牌色 (Hex 色碼) */
  brandColor?: string;
  /** 公司 Logo URL */
  logoUrl?: string;
}

/**
 * LIFF 初始化狀態
 */
export type LiffStatus = 'idle' | 'loading' | 'ready' | 'error';

/**
 * LIFF Context
 */
export interface LiffContextType {
  status: LiffStatus;
  error: Error | null;
  isInClient: boolean;
  isLoggedIn: boolean;
  initialize: (liffId: string) => Promise<void>;
}
