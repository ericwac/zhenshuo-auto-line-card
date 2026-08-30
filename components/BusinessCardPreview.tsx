'use client';

/**
 * 電子名片預覽元件
 * 在網頁上模擬顯示 LINE Flex Message 的視覺效果
 */

import { BusinessCardData } from '@/types/businessCard';
import { DEFAULT_BUSINESS_CARD } from '@/utils/flexMessageTemplates';

interface BusinessCardPreviewProps {
  cardData?: Partial<BusinessCardData>;
}

/**
 * 電子名片預覽
 */
export function BusinessCardPreview({ cardData }: BusinessCardPreviewProps) {
  const data: BusinessCardData = {
    ...DEFAULT_BUSINESS_CARD,
    ...cardData,
  };

  return (
    <div className="card-preview-container">
      <div className="card-preview">
        {/* Hero Section - Logo */}
        <div className="card-hero">
          <img
            src={data.logoUrl}
            alt={`${data.companyName} Logo`}
            className="card-logo"
          />
        </div>

        {/* Header Section */}
        <div
          className="card-header"
          style={{ backgroundColor: data.brandColor }}
        >
          <h2 className="company-name">{data.companyName}</h2>
        </div>

        {/* Body Section */}
        <div className="card-body">
          <h3 className="person-name">{data.name}</h3>
          <p className="person-title">{data.title} | 婚宴接駁與特殊裝備運送</p>

          <div className="divider" />

          <div className="info-rows">
            <div className="info-row">
              <span className="info-label">服務</span>
              <span className="info-value">{data.services}</span>
            </div>
            <div className="info-row">
              <span className="info-label">電話</span>
              <span className="info-value">{data.phone}</span>
            </div>
            {data.address && (
              <div className="info-row">
                <span className="info-label">地址</span>
                <span className="info-value">{data.address}</span>
              </div>
            )}
          </div>

          <div className="divider" />
        </div>

        {/* Footer Section */}
        <div className="card-footer">
          <button
            className="action-button primary"
            style={{ backgroundColor: data.brandColor }}
          >
            撥打聯絡電話
          </button>
          {data.lineOfficialId && (
            <button className="action-button secondary">
              加入 LINE 官方帳號
            </button>
          )}
          <p className="share-hint">
            👆 使用「分享」功能將此名片轉發給好友
          </p>
        </div>
      </div>

      <style jsx>{`
        .card-preview-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
        }

        .card-preview {
          width: 100%;
          max-width: 360px;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .card-hero {
          background-color: #0F172A;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
        }

        .card-logo {
          width: 100%;
          height: auto;
          aspect-ratio: 20 / 13;
          object-fit: cover;
        }

        .card-header {
          padding: 16px 12px;
          text-align: center;
        }

        .company-name {
          margin: 0;
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
        }

        .card-body {
          padding: 20px;
        }

        .person-name {
          margin: 0;
          font-size: 20px;
          font-weight: bold;
          color: #000000;
        }

        .person-title {
          margin: 8px 0 0 0;
          font-size: 14px;
          color: #8c8c8c;
        }

        .divider {
          height: 1px;
          background-color: #e5e7eb;
          margin: 24px 0;
        }

        .info-rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-row {
          display: flex;
          gap: 12px;
        }

        .info-label {
          flex: 1;
          font-size: 14px;
          color: #aaaaaa;
          min-width: 60px;
        }

        .info-value {
          flex: 4;
          font-size: 14px;
          color: #666666;
          line-height: 1.5;
        }

        .card-footer {
          padding: 0 20px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .action-button {
          width: 100%;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 8px;
        }

        .action-button.primary {
          color: white;
        }

        .action-button.secondary {
          color: #000000;
          background-color: white;
          border: 1px solid #d0d0d0;
        }

        .action-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .share-hint {
          margin: 12px 0 0 0;
          font-size: 11px;
          color: #999999;
          text-align: center;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
