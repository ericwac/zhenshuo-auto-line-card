'use client';

/**
 * LIFF 測試與除錯頁面
 * 用於檢查 LIFF 初始化狀態
 */

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [debug, setDebug] = useState({
    liffId: '',
    envVar: '',
    userAgent: '',
    isLine: false,
    error: '',
  });

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID || '2011335675-iuw7oMqv';
    const userAgent = navigator.userAgent;
    const isLine = userAgent.includes('Line') || userAgent.includes('LINE');

    setDebug({
      liffId,
      envVar: process.env.NEXT_PUBLIC_LIFF_ID || '未設定',
      userAgent,
      isLine,
      error: '',
    });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>LIFF 除錯資訊</h1>
      
      <div style={{ background: '#f0f0f0', padding: '15px', marginBottom: '10px' }}>
        <h3>LIFF ID</h3>
        <p>{debug.liffId}</p>
      </div>

      <div style={{ background: '#f0f0f0', padding: '15px', marginBottom: '10px' }}>
        <h3>環境變數</h3>
        <p>{debug.envVar}</p>
      </div>

      <div style={{ background: '#f0f0f0', padding: '15px', marginBottom: '10px' }}>
        <h3>User Agent</h3>
        <p style={{ fontSize: '12px', wordBreak: 'break-all' }}>{debug.userAgent}</p>
      </div>

      <div style={{ background: debug.isLine ? '#d4edda' : '#f8d7da', padding: '15px', marginBottom: '10px' }}>
        <h3>是否在 LINE 中開啟</h3>
        <p><strong>{debug.isLine ? '是 ✓' : '否 ✗'}</strong></p>
      </div>

      <div style={{ background: '#fff3cd', padding: '15px', marginBottom: '10px' }}>
        <h3>測試連結</h3>
        <p>請在 LINE 中點擊此連結：</p>
        <a href="https://liff.line.me/2011335675-iuw7oMqv">
          https://liff.line.me/2011335675-iuw7oMqv
        </a>
      </div>

      <div style={{ background: '#e7f3ff', padding: '15px' }}>
        <h3>Vercel 網址</h3>
        <p>當前網址：{typeof window !== 'undefined' ? window.location.href : '載入中...'}</p>
      </div>
    </div>
  );
}
