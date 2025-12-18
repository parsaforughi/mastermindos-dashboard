# Starting the Dashboard on Port 3001

## Quick Start

```bash
cd MastermindOSDashboard
npm run dev
```

The dashboard will start on **http://localhost:3001**

## Verify It's Running

1. Open your browser to: http://localhost:3001
2. You should see the Projects Overview page
3. Click on "Instagram DM Bot" to access the dashboard

## Troubleshooting

### Dashboard doesn't load

1. **Check if server is running:**
   ```bash
   lsof -i:3001
   ```

2. **Check for errors:**
   ```bash
   cd MastermindOSDashboard
   npm run dev
   ```
   Look for any error messages in the console

3. **Clear cache and restart:**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

4. **Check browser console:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab to see if requests are failing

### Port already in use

If port 3001 is already in use:
```bash
# Find what's using the port
lsof -i:3001

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3002 npm run dev
```

### API Connection Issues

If the Instagram DM bot API isn't connecting:

1. Make sure the Instagram DM bot service is running on port 8080:
   ```bash
   cd instagram-dm-bot
   npm run dev
   ```

2. Check the API configuration in `client/src/lib/apiConfig.ts`:
   ```typescript
   INSTAGRAM_DM_API: import.meta.env.VITE_INSTAGRAM_DM_API || 'http://localhost:8080/api'
   ```

3. Create a `.env` file in `MastermindOSDashboard/` if needed:
   ```
   VITE_INSTAGRAM_DM_API=http://localhost:8080/api
   ```

## Accessing Instagram DM Dashboard

Once the dashboard is running:

1. Go to: http://localhost:3001
2. Click on "Instagram DM Bot" project card
3. You'll see:
   - **Overview** - Main dashboard with stats
   - **Campaigns** - Create and manage campaigns
   - **Accounts** - Manage Instagram accounts
   - **Logs** - View campaign logs
   - **Settings** - Configure rate limits

## Routes

- `/` - Projects Overview
- `/dashboard/instagram-dm` - Main dashboard
- `/dashboard/instagram-dm/campaigns` - Campaign management
- `/dashboard/instagram-dm/accounts` - Account management
- `/dashboard/instagram-dm/logs` - Logs viewer
- `/dashboard/instagram-dm/settings` - Settings






