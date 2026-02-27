# Send Notifications to Users API

## API Endpoint: `/api/notifications/send-to-user`

Send push notifications to specific users by their user ID.

---

## 📤 POST - Send Notification

Send a push notification to all of a user's subscribed devices.

### Request

```http
POST /api/notifications/send-to-user
Content-Type: application/json

{
  "userId": "user_id_here",
  "title": "Notification Title",
  "body": "Notification message body",
  "url": "/destination-page",           // Optional
  "icon": "/custom-icon.png",           // Optional
  "data": {                             // Optional
    "customField": "value"
  }
}
```

### Example using cURL

```bash
curl -X POST http://localhost:2222/api/notifications/send-to-user \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_123",
    "title": "Hello!",
    "body": "This is a test notification",
    "url": "/dashboard"
  }'
```

### Example using JavaScript/Fetch

```javascript
async function sendNotification(userId, title, body, options = {}) {
  const response = await fetch("/api/notifications/send-to-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      title,
      body,
      url: options.url || "/",
      icon: options.icon || "/icon.svg",
      data: options.data || {},
    }),
  });

  const result = await response.json();
  return result;
}

// Usage
sendNotification(
  "clxxx123456789",
  "New Message",
  "You have a new message from John",
  { url: "/messages", data: { messageId: "123" } }
)
  .then((result) => console.log("Notification sent:", result))
  .catch((error) => console.error("Error:", error));
```

### Response (Success)

```json
{
  "success": true,
  "message": "Notification sent to 2 of 2 device(s)",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "summary": {
    "totalDevices": 2,
    "successful": 2,
    "failed": 0
  },
  "devices": [
    {
      "endpoint": "https://fcm.googleapis.com/fcm/send/...",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
      "success": true
    },
    {
      "endpoint": "https://fcm.googleapis.com/fcm/send/...",
      "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0...)...",
      "success": true
    }
  ]
}
```

### Response (Errors)

**User not found:**

```json
{
  "error": "User not found"
}
```

**No subscriptions:**

```json
{
  "error": "User has no active push subscriptions",
  "message": "The user needs to enable notifications in their browser first"
}
```

**Validation error:**

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

---

## 🔍 GET - Check User's Notification Status

Get information about a user's notification subscriptions.

### Request

```http
GET /api/notifications/send-to-user?userId=user_123
```

### Example using cURL

```bash
curl http://localhost:2222/api/notifications/send-to-user?userId=user_123
```

### Example using JavaScript/Fetch

```javascript
async function getUserNotificationStatus(userId) {
  const response = await fetch(
    `/api/notifications/send-to-user?userId=${userId}`
  );
  const result = await response.json();
  return result;
}

// Usage
getUserNotificationStatus("clxxx123456789")
  .then((status) => console.log("User status:", status))
  .catch((error) => console.error("Error:", error));
```

### Response

```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "notificationsEnabled": true,
  "deviceCount": 2,
  "devices": [
    {
      "id": "sub_123",
      "endpoint": "https://fcm.googleapis.com/fcm/send/...",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
      "createdAt": "2025-12-19T00:00:00.000Z",
      "lastUpdated": "2025-12-19T00:00:00.000Z"
    }
  ]
}
```

---

## 🧪 Testing

### Get Your User ID

1. Open browser console on your app
2. Run:

```javascript
// If using NextAuth
const session = await fetch("/api/auth/session").then((r) => r.json());
console.log("Your User ID:", session.user.id);
```

### Test the API

**PowerShell:**

```powershell
# Set your user ID
$userId = "your_user_id_here"

# Check status
Invoke-RestMethod -Uri "http://localhost:2222/api/notifications/send-to-user?userId=$userId"

# Send test notification
$body = @{
    userId = $userId
    title = "Test Notification"
    body = "This is a test from PowerShell!"
    url = "/dashboard"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:2222/api/notifications/send-to-user" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

**Browser Console:**

```javascript
// Get your user ID first
const session = await fetch("/api/auth/session").then((r) => r.json());
const userId = session.user.id;

// Send yourself a notification
await fetch("/api/notifications/send-to-user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: userId,
    title: "🎉 Test Notification",
    body: "This is a test notification!",
    url: "/dashboard",
    data: { test: true },
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

---

## 📝 Use Cases

1. **Welcome Notification**: Send when user signs up
2. **Activity Alerts**: Notify when someone interacts with their content
3. **Reminders**: Send scheduled reminders
4. **System Alerts**: Notify about important system events
5. **Messages**: Alert about new messages or mentions

## 🔒 Security Note

⚠️ **This API currently has no authentication**. For production, you should:

1. Add authentication (API key, JWT, etc.)
2. Add rate limiting
3. Add authorization (who can send to whom)
4. Log all notification sends for audit

Example with API key:

```typescript
// In route.ts
const apiKey = req.headers.get("x-api-key");
if (apiKey !== process.env.NOTIFICATION_API_KEY) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```
