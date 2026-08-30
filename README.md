# 振碩汽車 - LINE 電子名片分享系統

這是一個基於 Next.js 與 LINE LIFF SDK 開發的電子名片分享系統，讓使用者可以透過 LINE 輕鬆分享精美的商務名片給好友。

## 🎯 功能特色

- ✅ **模組化架構**：採用 custom hook 與 Provider 模式，程式碼易於維護與擴充
- ✅ **TypeScript 完整支援**：所有介面與資料結構皆有型別定義
- ✅ **精美的 Flex Message 設計**：仿照真實商務名片的視覺呈現
- ✅ **完善的錯誤處理**：包含 LIFF 初始化失敗、非 LINE 環境等狀況
- ✅ **即時預覽功能**：可在網頁上預覽名片外觀
- ✅ **響應式設計**：支援各種螢幕尺寸

## 📂 專案結構

```
振碩汽車/
├── app/
│   ├── layout.tsx          # 根佈局
│   ├── page.tsx            # 主頁面（範例整合）
│   └── globals.css         # 全域樣式
├── components/
│   ├── BusinessCardShareButton.tsx   # 分享按鈕元件
│   └── BusinessCardPreview.tsx       # 名片預覽元件
├── hooks/
│   └── useLiff.tsx         # LIFF custom hook & Provider
├── lib/
│   └── liff.ts             # LIFF SDK 封裝
├── types/
│   └── businessCard.ts     # TypeScript 型別定義
├── utils/
│   └── flexMessageTemplates.ts  # Flex Message 產生器
├── .env.local.example      # 環境變數範本
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🚀 快速開始

### 1. 安裝相依套件

```bash
npm install
```

### 2. 設定 LINE LIFF

1. 前往 [LINE Developers Console](https://developers.line.biz/console/)
2. 建立一個新的 Provider（如果還沒有的話）
3. 在 Provider 下建立一個 LINE Login channel
4. 在 Channel 設定中，找到 LIFF 頁籤
5. 點擊「Add」新增一個 LIFF app
6. 填寫以下資訊：
   - **LIFF app name**: 振碩汽車電子名片
   - **Size**: Full
   - **Endpoint URL**: 您的網站網址（例如：`https://yourdomain.com`）
   - **Scope**: `profile` (基本即可)
   - **Bot link feature**: On (Optional)
7. 建立完成後，複製 **LIFF ID**

### 3. 設定環境變數

複製 `.env.local.example` 並重新命名為 `.env.local`：

```bash
cp .env.local.example .env.local
```

編輯 `.env.local`，填入您的 LIFF ID：

```env
NEXT_PUBLIC_LIFF_ID=your-liff-id-here
```

### 4. 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器前往 `http://localhost:3000`

### 5. 在 LINE 中測試

由於 LIFF 需要在 LINE 環境中執行，您需要：

1. 將專案部署到可公開存取的網址（例如 Vercel、Netlify）
2. 在 LINE Developers Console 中將 LIFF Endpoint URL 更新為您的部署網址
3. 在 LINE 中開啟 LIFF URL：`https://liff.line.me/YOUR_LIFF_ID`

## 📖 使用說明

### 在您的頁面中使用

**1. 包裹 LiffProvider**

```tsx
import { LiffProvider } from '@/hooks/useLiff';

export default function YourPage() {
  return (
    <LiffProvider liffId="YOUR_LIFF_ID" autoInit={true}>
      {/* 您的內容 */}
    </LiffProvider>
  );
}
```

**2. 加入分享按鈕**

```tsx
import { BusinessCardShareButton } from '@/components/BusinessCardShareButton';

function YourComponent() {
  const customData = {
    name: '蘇建誠',
    title: '特殊裝備與婚宴接駁專員',
    phone: '0912-345-678',
  };

  return (
    <BusinessCardShareButton
      cardData={customData}
      onShareSuccess={() => console.log('分享成功！')}
      onShareError={(error) => console.error('分享失敗:', error)}
    />
  );
}
```

**3. 自訂名片內容**

編輯 `utils/flexMessageTemplates.ts` 中的 `DEFAULT_BUSINESS_CARD` 或在使用時傳入自訂資料：

```tsx
import { BusinessCardData } from '@/types/businessCard';

const myCardData: Partial<BusinessCardData> = {
  companyName: '振碩汽車租賃有限公司',
  name: '張三',
  title: '業務經理',
  phone: '0912-345-678',
  email: 'contact@example.com',
  // ... 更多欄位
};
```

### 使用 useLiff Hook

在任何需要 LIFF 功能的元件中：

```tsx
import { useLiff } from '@/hooks/useLiff';

function YourComponent() {
  const { status, isInClient, isLoggedIn, error } = useLiff();

  if (status === 'loading') return <div>載入中...</div>;
  if (status === 'error') return <div>錯誤: {error?.message}</div>;
  if (!isInClient) return <div>請在 LINE 中開啟</div>;

  return <div>LIFF 已準備就緒！</div>;
}
```

## 🎨 自訂樣式

### 修改品牌色

在 `utils/flexMessageTemplates.ts` 的 `DEFAULT_BUSINESS_CARD` 中修改：

```typescript
export const DEFAULT_BUSINESS_CARD: BusinessCardData = {
  // ...
  brandColor: '#1E3A8A', // 修改為您的品牌色
  logoUrl: 'https://your-logo-url.com/logo.png', // 修改為您的 Logo
};
```

### 修改 Flex Message 版型

在 `utils/flexMessageTemplates.ts` 的 `generateBusinessCardFlex` 函式中調整 JSON 結構。

參考 [LINE Flex Message Simulator](https://developers.line.biz/flex-simulator/) 來設計您的版型。

## 🔧 進階功能

### 1. 新增多種名片樣板

在 `utils/flexMessageTemplates.ts` 中新增函式：

```typescript
export function generateExecutiveCardFlex(
  data: Partial<BusinessCardData>
): FlexMessage {
  // 高階主管專用的名片設計
}
```

### 2. 整合 GA 追蹤

在 `BusinessCardShareButton.tsx` 的分享成功回調中加入：

```typescript
const handleShareSuccess = () => {
  // Google Analytics
  gtag('event', 'share_business_card', {
    event_category: 'engagement',
    event_label: cardData?.name,
  });
  
  onShareSuccess?.();
};
```

### 3. 動態載入名片資料

從 API 取得名片資料：

```typescript
const [cardData, setCardData] = useState<BusinessCardData | null>(null);

useEffect(() => {
  fetch('/api/business-card')
    .then(res => res.json())
    .then(data => setCardData(data));
}, []);
```

## 📱 測試清單

- [ ] LIFF 初始化正常
- [ ] 在 LINE 客戶端內可正常開啟
- [ ] 分享按鈕可正常觸發 shareTargetPicker
- [ ] Flex Message 在 LINE 聊天室中正常顯示
- [ ] 名片中的電話按鈕可正常撥打
- [ ] 名片中的 LINE 官方帳號連結可正常開啟
- [ ] 錯誤處理機制正常（非 LINE 環境、初始化失敗等）

## 🐛 常見問題

### Q: LIFF 初始化失敗

**A:** 檢查以下項目：
1. LIFF ID 是否正確填入 `.env.local`
2. 網址是否與 LINE Developers Console 中設定的一致
3. 是否使用 HTTPS（本地開發除外）

### Q: shareTargetPicker 無法使用

**A:** 確認：
1. 您的 LINE 版本是否為最新版（iOS 10.3.0+ / Android 10.3.0+）
2. 是否在 LINE 客戶端內開啟（而非外部瀏覽器）
3. LIFF 已成功初始化（`status === 'ready'`）

### Q: Flex Message 顯示不正確

**A:** 使用 [LINE Flex Message Simulator](https://developers.line.biz/flex-simulator/) 驗證您的 JSON 結構是否正確。

## 📚 相關資源

- [LINE LIFF 官方文件](https://developers.line.biz/en/docs/liff/overview/)
- [Flex Message 設計指南](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/)
- [LINE Developers Console](https://developers.line.biz/console/)
- [Next.js 官方文件](https://nextjs.org/docs)

## 📄 授權

MIT License

## 👨‍💻 開發者

振碩汽車租賃有限公司 技術團隊

---

如有任何問題或建議，歡迎聯絡我們！
