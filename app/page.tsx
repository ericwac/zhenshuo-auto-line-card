'use client';

/**
 * 振碩汽車電子名片分享頁面
 * 展示如何整合 LIFF Provider 與電子名片分享功能
 */

import { LiffProvider } from '@/hooks/useLiff';
import { BusinessCardShareButton } from '@/components/BusinessCardShareButton';
import { BusinessCardPreview } from '@/components/BusinessCardPreview';
import { BusinessCardData } from '@/types/businessCard';

/**
 * ⚠️ 重要：請將此 LIFF ID 替換為您在 LINE Developers Console 建立的實際 LIFF ID
 * 格式範例：'1234567890-abcdefgh'
 */
const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID || '2011335675-iuw7oMqv';

/**
 * 自訂名片資料（選填）
 * 如果不提供，將使用 DEFAULT_BUSINESS_CARD 的預設資料
 */
const customCardData: Partial<BusinessCardData> = {
  name: '蘇謹誠',
  title: '長期租賃 機場接送',
  services: '機場接送、商務接送、包車旅遊、婚禮與活動包車、服務接駁、長租、短租、企業交通',
  phone: '0935-625-555',
  // 可以覆寫其他欄位...
};

export default function Home() {
  const handleShareSuccess = () => {
    console.log('✅ 名片分享成功！');
    // 可以在這裡加入 GA 追蹤、顯示成功訊息等
  };

  const handleShareError = (error: Error) => {
    console.error('❌ 名片分享失敗:', error);
    // 可以在這裡加入錯誤追蹤、顯示錯誤訊息等
  };

  return (
    <LiffProvider liffId={LIFF_ID} autoInit={true}>
      <main className="main-container">
        <div className="content-wrapper">
          {/* 頁面標題 */}
          <header className="header">
            <h1 className="title">振碩汽車租賃</h1>
            <p className="subtitle">電子名片分享系統</p>
          </header>

          {/* 名片預覽 */}
          <section className="preview-section">
            <BusinessCardPreview cardData={customCardData} />
          </section>

          {/* 分享按鈕 */}
          <section className="action-section">
            <BusinessCardShareButton
              cardData={customCardData}
              buttonText="📤 分享我的電子名片"
              onShareSuccess={handleShareSuccess}
              onShareError={handleShareError}
            />
          </section>

          {/* 使用說明 */}
          <section className="info-section">
            <div className="info-card">
              <h3 className="info-title">📱 如何使用</h3>
              <ol className="info-list">
                <li>確保您已經在 LINE 應用程式中開啟此頁面</li>
                <li>點擊上方的「分享我的電子名片」按鈕</li>
                <li>選擇要傳送名片的 LINE 好友或群組</li>
                <li>確認傳送，對方即可收到您的電子名片</li>
              </ol>
            </div>

            <div className="info-card">
              <h3 className="info-title">✨ 功能特色</h3>
              <ul className="info-list">
                <li>精美的 LINE Flex Message 視覺設計</li>
                <li>一鍵快速分享給多位好友</li>
                <li>包含完整聯絡資訊與服務項目</li>
                <li>可直接從名片撥打電話或加入官方帳號</li>
              </ul>
            </div>
          </section>

          {/* 頁尾 */}
          <footer className="footer">
            <p>© 2026 振碩汽車租賃有限公司</p>
            <p className="footer-detail">統編：60531668</p>
          </footer>
        </div>

        <style jsx>{`
          .main-container {
            min-height: 100vh;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .content-wrapper {
            width: 100%;
            max-width: 480px;
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .header {
            text-align: center;
            color: white;
          }

          .title {
            font-size: 32px;
            font-weight: bold;
            margin: 0 0 8px 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .subtitle {
            font-size: 16px;
            margin: 0;
            opacity: 0.9;
          }

          .preview-section {
            animation: fadeInUp 0.6s ease;
          }

          .action-section {
            animation: fadeInUp 0.8s ease;
          }

          .info-section {
            display: flex;
            flex-direction: column;
            gap: 16px;
            animation: fadeInUp 1s ease;
          }

          .info-card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .info-title {
            margin: 0 0 12px 0;
            font-size: 18px;
            font-weight: bold;
            color: #1e3a8a;
          }

          .info-list {
            margin: 0;
            padding-left: 20px;
            color: #374151;
            line-height: 1.8;
          }

          .info-list li {
            margin-bottom: 8px;
          }

          .footer {
            text-align: center;
            color: white;
            opacity: 0.8;
            padding: 20px 0;
            font-size: 14px;
          }

          .footer p {
            margin: 4px 0;
          }

          .footer-detail {
            font-size: 12px;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 640px) {
            .main-container {
              padding: 16px;
            }

            .title {
              font-size: 28px;
            }

            .subtitle {
              font-size: 14px;
            }
          }
        `}</style>
      </main>
    </LiffProvider>
  );
}
