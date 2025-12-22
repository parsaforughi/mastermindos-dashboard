# Environment Variables Setup

## Affiliate Bot API Configuration

برای استفاده از سرور production، یک فایل `.env.local` در پوشه `client/` ایجاد کنید:

```env
VITE_AFFILIATE_BOT_API=https://mastermindos-dashboard-production.up.railway.app
```

### برای Development (Local)
```env
VITE_AFFILIATE_BOT_API=http://localhost:3001
```

### برای Production
```env
VITE_AFFILIATE_BOT_API=https://mastermindos-dashboard-production.up.railway.app
```

## نحوه استفاده

1. فایل `.env.local` را در `MastermindOSDashboard/client/` ایجاد کنید
2. متغیر `VITE_AFFILIATE_BOT_API` را با URL سرور خود تنظیم کنید
3. Dashboard را restart کنید

## Default Value

اگر environment variable تنظیم نشود، به صورت پیش‌فرض از `https://mastermindos-dashboard-production.up.railway.app` استفاده می‌شود.

