# Web Push Notifications - Setup Instructions

## 📦 Installation Steps

### 1. Install Dependencies

```bash
pnpm add web-push
pnpm add -D @types/web-push
```

### 2. Generate VAPID Keys

```bash
pnpm run generate:vapid
```

Copy the output and add to your `.env` file:

```env
VAPID_PUBLIC_KEY=YOUR_PUBLIC_KEY_HERE
VAPID_PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
VAPID_SUBJECT=mailto:your-email@example.com
```

### 3. Run Database Migration

```bash
npx prisma migrate dev --name add_push_subscriptions
npx prisma generate
```

### 4. Start Development Server

```bash
pnpm dev
```

---

## 🎯 Features Implemented

✅ **Auto-Prompt Dialog** - Beautiful Shadcn dialog appears 2 seconds after login  
✅ **Settings Page** - Full notification management UI with device list  
✅ **Bell Icon** - Persistent reminder if user dismisses the dialog  
✅ **Auto-Healing** - Syncs subscriptions across browsers automatically  
✅ **Multi-Device Support** - Users can enable on multiple devices  
✅ **Test Notifications** - Easy testing from settings page  
✅ **Expired Subscription Cleanup** - Auto-removes invalid subscriptions

---

## 🚀 Usage

### For Users

1. **First Login**: Dialog appears asking to enable notifications
2. **Enable**: Click "Enable Notifications" → Allow browser permission
3. **Dismiss**: Click "Maybe Later" → Bell icon appears in navbar
4. **Settings**: Go to Settings → Notifications tab for full control
5. **Test**: Click "Test" button to send a test notification
6. **Multi-Device**: Login on another device → Same dialog appears

### For Developers (Sending Notifications)

```typescript
// Send notification to specific user
await fetch("/api/notifications/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: "user_id_here",
    title: "New Message!",
    body: "You have a new message",
    url: "/dashboard/messages",
    icon: "/icon.png",
  }),
});
```

### API Endpoints

- `POST /api/notifications/subscribe` - Subscribe user
- `POST /api/notifications/unsubscribe` - Unsubscribe user
- `GET /api/notifications/status` - Check subscription status
- `POST /api/notifications/send` - Send notification to user
- `POST /api/notifications/test` - Send test notification to current user
- `GET /api/notifications/vapid-public-key` - Get public VAPID key

---

## 🔧 Components Created

- `hooks/useWebPush.ts` - React Query hook with auto-healing
- `components/notification-prompt-dialog.tsx` - Auto-prompt dialog
- `components/notification-bell-button.tsx` - Persistent bell icon
- `app/dashboard/settings/page.tsx` - Settings UI (updated)
- `app/api/notifications/*` - All API routes
- `lib/web-push.ts` - VAPID configuration
- `public/sw.js` - Service worker for push events

---

## 📱 How It Works

### User Journey

1. **Login** → Service worker registers
2. **Wait 2s** → Dialog appears
3. **Click Enable** → Browser asks permission
4. **Allow** → Subscription saved to database
5. **Done** → User receives notifications

### Cross-Browser Support

- User logs in on Chrome → Enables notifications
- User logs in on Firefox → Dialog shows "You have notifications on 1 device"
- User can enable on Firefox too → Both receive notifications
- Auto-healing syncs if subscription exists in browser but not server

### Notification Flow

1. API call to `/api/notifications/send` with userId
2. Server fetches all subscriptions for that user
3. Encrypts message with VAPID keys
4. Sends to push service (Google FCM, Mozilla, Apple)
5. Push service delivers to all user's devices
6. Service worker receives push event
7. Shows notification to user
8. User clicks → Opens app at specified URL

---

## 🎨 Hackathon Ready

Perfect for hackathons because:

- ✅ Zero configuration for users
- ✅ Auto-prompts but not annoying
- ✅ Works across all devices
- ✅ Easy to test (test button)
- ✅ Simple API to send notifications
- ✅ Beautiful UI with Shadcn
- ✅ Auto-healing prevents errors
- ✅ Toast messages guide users

---

## 🐛 Troubleshooting

### VAPID Keys Not Configured

```bash
pnpm run generate:vapid
# Add output to .env file
```

### Service Worker Not Registering

- Check browser console for errors
- Ensure `/sw.js` exists in public folder
- HTTPS required in production (localhost works)

### Notifications Not Showing

- Check browser permission settings
- Test notification from settings page
- Check browser console for errors
- Ensure VAPID keys are in .env

### Database Errors

```bash
npx prisma migrate reset
npx prisma migrate dev
npx prisma generate
```

---

## 📝 Environment Variables Required

```env
# Existing variables...

# Web Push Notifications
VAPID_PUBLIC_KEY=BKxH7w... (generate via pnpm run generate:vapid)
VAPID_PRIVATE_KEY=xyz123... (generate via pnpm run generate:vapid)
VAPID_SUBJECT=mailto:your-email@example.com
```

---

## 🎉 Done!

Your app now has a complete web push notification system with auto-prompting, multi-device support, and auto-healing. Perfect for hackathons! 🚀
