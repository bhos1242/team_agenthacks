# 📱 Using the Notification API - Quick Examples

## ✅ Everything is Ready!

You now have:

- ✅ `/api/notifications/send-to-user` endpoint
- ✅ Helper functions in `lib/notification-helpers.ts`
- ✅ Test page at `http://localhost:2222/test-notifications.html`

---

## 🚀 Quick Start

### 1️⃣ Test in Browser (Easiest)

Open: **http://localhost:2222/test-notifications.html**

The page will auto-fill your user ID and let you send test notifications!

---

### 2️⃣ Use in Your Code

#### Client-Side (React Components)

```typescript
import { notifyUser } from "@/lib/notification-helpers";

export function MyComponent() {
  const handleNotifyUser = async (userId: string) => {
    const result = await notifyUser({
      userId,
      title: "🎉 Welcome!",
      body: "Thanks for joining our app!",
      url: "/dashboard",
      data: { action: "welcome" },
    });

    if (result.success) {
      console.log(`Sent to ${result.summary?.successful} devices`);
    } else {
      console.error("Failed:", result.error);
    }
  };

  return <button onClick={() => handleNotifyUser("user_123")}>Notify</button>;
}
```

#### Server Actions / API Routes

```typescript
"use server";

import { notifyUserServer } from "@/lib/notification-helpers";

export async function onUserSignup(userId: string, name: string) {
  // ... signup logic

  // Send welcome notification
  await notifyUserServer({
    userId,
    title: `Welcome ${name}! 👋`,
    body: "Your account is ready. Let's get started!",
    url: "/onboarding",
  });
}

export async function onNewMessage(recipientId: string, senderName: string) {
  await notifyUserServer({
    userId: recipientId,
    title: "New Message",
    body: `${senderName} sent you a message`,
    url: "/messages",
    data: { type: "message", sender: senderName },
  });
}
```

---

### 3️⃣ Test with cURL (Command Line)

```bash
# Get your user ID first
curl http://localhost:2222/api/auth/session

# Send notification
curl -X POST http://localhost:2222/api/notifications/send-to-user \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "YOUR_USER_ID_HERE",
    "title": "Test",
    "body": "This is a test notification"
  }'
```

---

### 4️⃣ PowerShell Script

```powershell
# Save as send-notification.ps1

param(
    [string]$UserId = "clxxx123456789",
    [string]$Title = "Test Notification",
    [string]$Body = "This is a test"
)

$body = @{
    userId = $UserId
    title = $Title
    body = $Body
    url = "/dashboard"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:2222/api/notifications/send-to-user" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

**Usage:**

```powershell
.\send-notification.ps1 -UserId "user_123" -Title "Hello" -Body "Test message"
```

---

## 📋 Common Use Cases

### 1. Welcome New Users

```typescript
// After signup
await notifyUserServer({
  userId: newUser.id,
  title: "Welcome to Our App! 🎉",
  body: "Your account has been created successfully",
  url: "/welcome",
});
```

### 2. Activity Notifications

```typescript
// When someone likes a post
await notifyUserServer({
  userId: post.authorId,
  title: "New Like ❤️",
  body: `${liker.name} liked your post "${post.title}"`,
  url: `/posts/${post.id}`,
  data: { postId: post.id, likerId: liker.id },
});
```

### 3. Reminders

```typescript
// Scheduled reminder
await notifyUserServer({
  userId: user.id,
  title: "Reminder ⏰",
  body: "Your meeting starts in 15 minutes",
  url: "/calendar",
});
```

### 4. Notify Multiple Users

```typescript
import { notifyMultipleUsers } from "@/lib/notification-helpers";

// Notify all team members
const teamMemberIds = ["user1", "user2", "user3"];

await notifyMultipleUsers(teamMemberIds, {
  title: "Team Update",
  body: "New project has been created",
  url: "/projects",
});
```

---

## 🔍 Check User Status

### Before Sending

```typescript
import { getUserNotificationStatus } from "@/lib/notification-helpers";

const status = await getUserNotificationStatus(userId);

if (status.notificationsEnabled) {
  console.log(`User has ${status.deviceCount} active devices`);
  // Safe to send notification
} else {
  console.log("User has not enabled notifications");
  // Maybe show a prompt to enable notifications
}
```

---

## 🎯 Advanced: Custom Notification Handlers

### Handle clicks in service worker

Edit `public/sw.js`:

```javascript
self.addEventListener("notificationclick", function (e) {
  e.notification.close();

  const data = e.notification.data;

  // Custom action handling
  if (data.action === "message") {
    // Open messages
    e.waitUntil(clients.openWindow("/messages"));
  } else if (data.action === "like") {
    // Open specific post
    e.waitUntil(clients.openWindow(`/posts/${data.postId}`));
  } else {
    // Default behavior
    e.waitUntil(clients.openWindow(data.url || "/"));
  }
});
```

---

## ⚡ Performance Tips

1. **Don't await** if you don't need the result:

```typescript
// Fire and forget (faster)
notifyUserServer({ ... }).catch(console.error);
```

2. **Batch notifications**:

```typescript
// Instead of sending one by one, use notifyMultipleUsers
await notifyMultipleUsers(userIds, notification);
```

3. **Check status first**:

```typescript
// Avoid unnecessary API calls
if (!(await getUserNotificationStatus(userId)).notificationsEnabled) {
  return; // Don't send
}
```

---

## 🐛 Troubleshooting

### "User has no active push subscriptions"

→ User needs to click the 🔔 bell icon to enable notifications

### "User not found"

→ Double-check the user ID (get it from session)

### Network error

→ Make sure dev server is running on port 2222

### Notification doesn't appear

→ Check browser permissions (allow notifications)
→ Check browser console for service worker errors

---

## 🔒 Production Checklist

Before deploying, add:

1. **Authentication**

```typescript
// Add API key check
const apiKey = req.headers.get("x-api-key");
if (apiKey !== process.env.NOTIFICATION_API_KEY) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

2. **Rate Limiting**

```typescript
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

await limiter.check(userId, 10); // 10 notifications per minute
```

3. **Logging**

```typescript
console.log(`[Notification] Sent to user ${userId} by ${senderId}`);
```

4. **Environment Variables**

```env
NOTIFICATION_API_KEY=your-secret-key-here
```

---

**Need help? Check the full documentation in API_SEND_NOTIFICATION.md**
