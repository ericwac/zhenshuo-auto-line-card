/**
 * LINE Flex Message 樣板產生器
 * 提供各種商務場景的 Flex Message JSON 產生函式
 */

import { BusinessCardData } from '@/types/businessCard';

/**
 * Flex Message 型別定義（根據 LINE API）
 */
interface FlexMessage {
  type: 'flex';
  altText: string;
  contents: FlexBubble;
}

interface FlexBubble {
  type: 'bubble';
  size?: 'nano' | 'micro' | 'kilo' | 'mega' | 'giga';
  header?: FlexBox;
  hero?: FlexBox;
  body?: FlexBox;
  footer?: FlexBox;
}

interface FlexBox {
  type: 'box';
  layout: 'horizontal' | 'vertical' | 'baseline';
  contents: any[];
  backgroundColor?: string;
  paddingAll?: string;
  paddingTop?: string;
  paddingBottom?: string;
  margin?: string;
  spacing?: string;
}

/**
 * 預設的振碩汽車名片資料
 */
export const DEFAULT_BUSINESS_CARD: BusinessCardData = {
  companyName: '振碩汽車租賃',
  companyTaxId: '60531668',
  name: '蘇謹誠',
  title: '長期租賃 機場接送',
  services: '機場接送、商務接送、包車旅遊、婚禮與活動包車、服務接駁、長租、短租、企業交通',
  phone: '0935-625-555',
  email: 'service@zhenshuo-auto.com',
  address: '臺中市霧峰區坑口里中正路575之10號',
  lineOfficialId: 'https://lin.ee/y8zGwYc',
  websiteUrl: 'https://socialflow.tw/',
  brandColor: '#1E3A8A',
  // 部署後請將此網址更新為您的 Cloudflare Pages 網址
  logoUrl: typeof window !== 'undefined' 
    ? `${window.location.origin}/logo.jpg`
    : '/logo.jpg',
};

/**
 * 產生電子名片的 Flex Message（採用振碩汽車自訂設計）
 * @param data 名片資料
 * @returns LINE Flex Message 物件
 */
export function generateBusinessCardFlex(
  data: Partial<BusinessCardData> = {}
): FlexMessage {
  // 合併預設資料與傳入資料
  const cardData: BusinessCardData = {
    ...DEFAULT_BUSINESS_CARD,
    ...data,
  };

  // 處理電話號碼（移除連字符）
  const cleanPhone = cardData.phone.replace(/-/g, '');

  const bubble: FlexBubble = {
    type: 'bubble',
    size: 'mega',
    hero: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: cardData.logoUrl || DEFAULT_BUSINESS_CARD.logoUrl!,
          size: 'full',
          aspectMode: 'cover',
          aspectRatio: '20:13',
          gravity: 'center',
          backgroundColor: '#0F172A',
        },
      ],
      paddingAll: '0px',
    },
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: cardData.companyName,
          color: '#ffffff',
          weight: 'bold',
          size: 'xl',
          align: 'center',
        },
      ],
      backgroundColor: cardData.brandColor || '#1E3A8A',
      paddingTop: '16px',
      paddingAll: '12px',
      paddingBottom: '16px',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: cardData.name,
          weight: 'bold',
          size: 'xl',
          margin: 'md',
        },
        {
          type: 'text',
          text: `${cardData.title} | 婚宴接駁與特殊裝備運送`,
          size: 'sm',
          color: '#8c8c8c',
          margin: 'sm',
        },
        {
          type: 'separator',
          margin: 'xxl',
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'xxl',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: '服務',
                  size: 'sm',
                  color: '#aaaaaa',
                  flex: 1,
                },
                {
                  type: 'text',
                  text: cardData.services,
                  wrap: true,
                  color: '#666666',
                  size: 'sm',
                  flex: 4,
                },
              ],
            },
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: '電話',
                  size: 'sm',
                  color: '#aaaaaa',
                  flex: 1,
                },
                {
                  type: 'text',
                  text: cardData.phone,
                  wrap: true,
                  color: '#666666',
                  size: 'sm',
                  flex: 4,
                },
              ],
            },
            ...(cardData.address
              ? [
                  {
                    type: 'box',
                    layout: 'horizontal',
                    contents: [
                      {
                        type: 'text',
                        text: '地址',
                        size: 'sm',
                        color: '#aaaaaa',
                        flex: 1,
                      },
                      {
                        type: 'text',
                        text: cardData.address,
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 4,
                      },
                    ],
                  } as const,
                ]
              : []),
          ],
        },
        {
          type: 'separator',
          margin: 'xxl',
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          action: {
            type: 'uri',
            label: '撥打聯絡電話',
            uri: `tel:${cleanPhone}`,
          },
          style: 'primary',
          color: cardData.brandColor || '#1E3A8A',
          margin: 'sm',
        },
        ...(cardData.lineOfficialId
          ? [
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: '加入 LINE 官方帳號',
                  uri: cardData.lineOfficialId.startsWith('http') 
                    ? cardData.lineOfficialId 
                    : `https://line.me/R/ti/p/${cardData.lineOfficialId}`,
                },
                style: 'secondary',
                margin: 'sm',
              } as const,
            ]
          : []),
        ...(cardData.websiteUrl
          ? [
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: '🌐 官方網站',
                  uri: cardData.websiteUrl,
                },
                style: 'link',
                margin: 'sm',
              } as const,
            ]
          : []),
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '👆 長按此名片使用 LINE「轉傳」功能分享給好友',
              size: 'xxs',
              color: '#999999',
              align: 'center',
              wrap: true,
              margin: 'md',
            },
          ],
        },
      ],
    },
  };

  return {
    type: 'flex',
    altText: `${cardData.name} - ${cardData.title} | ${cardData.companyName}`,
    contents: bubble,
  };
}

/**
 * 產生簡易版電子名片（適用於較小的顯示空間）
 */
export function generateCompactBusinessCardFlex(
  data: Partial<BusinessCardData> = {}
): FlexMessage {
  const cardData: BusinessCardData = {
    ...DEFAULT_BUSINESS_CARD,
    ...data,
  };

  const bubble: FlexBubble = {
    type: 'bubble',
    size: 'kilo',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: cardData.companyName,
          weight: 'bold',
          size: 'md',
          wrap: true,
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'md',
          spacing: 'xs',
          contents: [
            {
              type: 'text',
              text: cardData.name,
              weight: 'bold',
              size: 'sm',
            },
            {
              type: 'text',
              text: cardData.title,
              size: 'xs',
              color: '#6B7280',
              wrap: true,
            },
          ],
        },
        {
          type: 'text',
          text: `📞 ${cardData.phone}`,
          size: 'xs',
          margin: 'md',
        },
      ],
      paddingAll: '15px',
    },
  };

  return {
    type: 'flex',
    altText: `${cardData.name} - ${cardData.companyName}`,
    contents: bubble,
  };
}
