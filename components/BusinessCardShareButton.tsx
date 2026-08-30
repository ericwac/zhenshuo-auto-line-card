'use client';

/**
 * 電子名片分享按鈕元件
 * 整合 LIFF shareTargetPicker 功能，讓使用者可以將名片轉傳給 LINE 好友
 */

import { useState } from 'react';
import { useLiff } from '@/hooks/useLiff';
import { liff } from '@/lib/liff';
import { generateBusinessCardFlex } from '@/utils/flexMessageTemplates';
import { BusinessCardData } from '@/types/businessCard';

interface BusinessCardShareButtonProps {
  /** 名片資料（選填，未提供則使用預設資料） */
  cardData?: Partial<BusinessCardData>;
  /** 按鈕文字 */
  buttonText?: string;
  /** 按鈕樣式類別 */
  className?: string;
  /** 分享成功的回調函式 */
  onShareSuccess?: () => void;
  /** 分享失敗的回調函式 */
  onShareError?: (error: Error) => void;
}

/**
 * 電子名片分享按鈕
 */
export function BusinessCardShareButton({
  cardData,
  buttonText = '📤 分享電子名片',
  className = '',
  onShareSuccess,
  onShareError,
}: BusinessCardShareButtonProps) {
  const { status, isInClient, error: liffError } = useLiff();
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const handleShare = async () => {
    // 重置錯誤狀態
    setShareError(null);

    // 檢查 LIFF 是否準備就緒
    if (status !== 'ready') {
      setShareError('LIFF 尚未準備就緒，請稍候再試');
      return;
    }

    // 檢查是否在 LINE 客戶端內
    if (!isInClient) {
      setShareError('請在 LINE 應用程式中開啟此功能');
      return;
    }

    // 檢查是否支援 shareTargetPicker
    if (!liff.isApiAvailable('shareTargetPicker')) {
      // 嘗試使用舊版的 sendMessages API
      try {
        const flexMessage = generateBusinessCardFlex(cardData);
        await liff.sendMessages([
          {
            type: 'flex',
            altText: flexMessage.altText,
            contents: flexMessage.contents,
          },
        ]);
        console.log('使用 sendMessages 發送成功');
        onShareSuccess?.();
        setIsSharing(false);
        return;
      } catch (sendError) {
        setShareError('您的 LINE 版本不支援此功能，請更新至最新版本');
        setIsSharing(false);
        return;
      }
    }

    setIsSharing(true);

    try {
      // 產生 Flex Message
      const flexMessage = generateBusinessCardFlex(cardData);

      // 呼叫 shareTargetPicker
      const result = await liff.shareTargetPicker([
        {
          type: 'flex',
          altText: flexMessage.altText,
          contents: flexMessage.contents,
        },
      ]);

      if (result) {
        // 分享成功
        console.log('電子名片分享成功');
        onShareSuccess?.();
      } else {
        // 使用者取消分享
        console.log('使用者取消分享');
      }
    } catch (error) {
      console.error('分享電子名片時發生錯誤:', error);
      const errorMessage =
        error instanceof Error ? error.message : '分享失敗，請稍後再試';
      setShareError(errorMessage);
      onShareError?.(
        error instanceof Error ? error : new Error('Unknown error')
      );
    } finally {
      setIsSharing(false);
    }
  };

  // 錯誤狀態顯示
  if (liffError) {
    return (
      <div className="error-container">
        <p className="error-message">❌ LIFF 初始化失敗</p>
        <p className="error-detail">{liffError.message}</p>
      </div>
    );
  }

  // 載入中狀態
  if (status === 'loading') {
    return (
      <button disabled className={`share-button loading ${className}`}>
        ⏳ 載入中...
      </button>
    );
  }

  // 未在 LINE 客戶端內的提示
  if (status === 'ready' && !isInClient) {
    return (
      <div className="warning-container">
        <p className="warning-message">⚠️ 請在 LINE 中開啟</p>
        <p className="warning-detail">
          此功能需要在 LINE 應用程式中使用
        </p>
      </div>
    );
  }

  return (
    <div className="share-button-container">
      <button
        onClick={handleShare}
        disabled={isSharing || status !== 'ready'}
        className={`share-button ${isSharing ? 'sharing' : ''} ${className}`}
      >
        {isSharing ? '📨 分享中...' : buttonText}
      </button>

      {shareError && (
        <div className="error-toast">
          <p>{shareError}</p>
        </div>
      )}

      <style jsx>{`
        .share-button-container {
          position: relative;
          width: 100%;
        }

        .share-button {
          width: 100%;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(30, 58, 138, 0.2);
        }

        .share-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(30, 58, 138, 0.3);
        }

        .share-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .share-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .share-button.loading,
        .share-button.sharing {
          background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
        }

        .error-container,
        .warning-container {
          padding: 16px;
          border-radius: 12px;
          text-align: center;
        }

        .error-container {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
        }

        .warning-container {
          background-color: #fffbeb;
          border: 1px solid #fde68a;
        }

        .error-message,
        .warning-message {
          margin: 0;
          font-weight: 600;
          font-size: 16px;
          color: #991b1b;
        }

        .warning-message {
          color: #92400e;
        }

        .error-detail,
        .warning-detail {
          margin: 8px 0 0 0;
          font-size: 14px;
          color: #7f1d1d;
        }

        .warning-detail {
          color: #78350f;
        }

        .error-toast {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          padding: 12px;
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          animation: slideDown 0.3s ease;
        }

        .error-toast p {
          margin: 0;
          font-size: 14px;
          color: #991b1b;
          text-align: center;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
