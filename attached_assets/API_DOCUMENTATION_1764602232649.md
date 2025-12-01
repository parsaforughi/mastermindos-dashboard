# Seylane Explainer AI - Complete API Documentation

## Base URL

```
https://bdcd0c9f-392c-4eca-a76a-4ab4fdca9994-00-2hisy5qmiaduo.spock.replit.dev:3000
```

**Note:** Replace with your actual deployed Replit URL if different.

---

## Authentication

**No authentication required** - All endpoints are publicly accessible.

CORS is enabled for cross-origin requests from any domain.

---

## API Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check & status |
| `GET` | `/stats` | Message statistics |
| `GET` | `/conversations` | List all conversations |
| `GET` | `/messages` | Get messages for a conversation |
| `POST` | `/events/message` | Send/receive message events |
| `GET` | `/live-messages` | Real-time message streaming (SSE) |
| `GET` | `/logs` | Real-time logs (SSE) |

---

## Endpoint Details

### 1. GET `/health` - Health Check

**Description:** Check API status and metrics

**Request:**
```bash
GET /health
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2025-12-01T09:33:14.123Z",
  "conversations": 4,
  "liveClients": 2
}
```

**Fields:**
- `status` (string): API status ("ok")
- `timestamp` (ISO 8601): Server timestamp
- `conversations` (number): Total active conversations
- `liveClients` (number): Connected SSE clients

---

### 2. GET `/stats` - Message Statistics

**Description:** Get message statistics (total & today)

**Request:**
```bash
GET /stats
```

**Response (200 OK):**
```json
{
  "totalReceived": 145,
  "totalSent": 142,
  "todayReceived": 12,
  "todaySent": 11
}
```

**Fields:**
- `totalReceived` (number): Total messages received from users (all time)
- `totalSent` (number): Total messages sent by bot (all time)
- `todayReceived` (number): Messages received today
- `todaySent` (number): Messages sent today

---

### 3. GET `/conversations` - List All Conversations

**Description:** Get list of all active conversations with metadata

**Request:**
```bash
GET /conversations
```

**Response (200 OK):**
```json
[
  {
    "id": "arman_rahimi",
    "userId": "arman_rahimi",
    "username": "arman_rahimi",
    "lastMessageAt": "2025-12-01T09:32:59.000Z",
    "inboundCount": 5,
    "outboundCount": 4
  },
  {
    "id": "shop_luxirana",
    "userId": "shop_luxirana",
    "username": "shop_luxirana",
    "lastMessageAt": "2025-12-01T08:15:23.000Z",
    "inboundCount": 23,
    "outboundCount": 22
  }
]
```

**Conversation Object Schema:**
- `id` (string): Unique conversation identifier (username)
- `userId` (string): User/conversation ID
- `username` (string): Username
- `lastMessageAt` (ISO 8601): Timestamp of last message
- `inboundCount` (number): Total messages from user
- `outboundCount` (number): Total messages from bot
- **Sorted by:** `lastMessageAt` (newest first)

---

### 4. GET `/messages` - Get Messages for Conversation

**Description:** Retrieve all messages in a specific conversation

**Request:**
```bash
GET /messages?conversationId=arman_rahimi
```

**Query Parameters:**
- `conversationId` (required, string): The conversation ID

**Response (200 OK):**
```json
[
  {
    "id": "arman_rahimi_0",
    "conversationId": "arman_rahimi",
    "from": "user",
    "text": "سلام",
    "createdAt": "2025-12-01T09:32:59.000Z"
  },
  {
    "id": "arman_rahimi_1",
    "conversationId": "arman_rahimi",
    "from": "bot",
    "text": "سلام! خوش اومدی به لوکسیرانا 🌿",
    "createdAt": "2025-12-01T09:33:05.000Z"
  },
  {
    "id": "arman_rahimi_2",
    "conversationId": "arman_rahimi",
    "from": "user",
    "text": "چندتا برند دارید؟",
    "createdAt": "2025-12-01T09:33:12.000Z"
  }
]
```

**Message Object Schema:**
- `id` (string): Unique message ID
- `conversationId` (string): Associated conversation ID
- `from` (string): Message sender ("user" or "bot")
- `text` (string): Message content
- `createdAt` (ISO 8601): When message was created
- **Sorted by:** `createdAt` (oldest first)

**Error Responses:**

```json
// Missing conversationId
{
  "error": "conversationId is required"
}
```

---

### 5. POST `/events/message` - Send Message Event

**Description:** Send a new message event to the API (for bot dashboard integration)

**Request:**
```bash
POST /events/message
Content-Type: application/json

{
  "conversationId": "arman_rahimi",
  "id": "msg_1234567890",
  "from": "user",
  "text": "میسویک چیه؟",
  "createdAt": "2025-12-01T09:35:00.000Z"
}
```

**Request Body Schema:**
- `conversationId` (required, string): Unique conversation identifier
- `id` (required, string): Unique message ID
- `from` (required, enum): "user" or "bot"
- `text` (required, string): Message content
- `createdAt` (required, ISO 8601): Message timestamp

**Response (200 OK):**
```json
{
  "ok": true
}
```

**Response on Success:**
- Message is saved to store
- Message is broadcast to all connected SSE clients
- HTTP 200 response sent

**Error Responses:**

```json
// Missing required fields
{
  "error": "Missing required fields: conversationId, id, from, text, createdAt"
}
```

```json
// Invalid 'from' value
{
  "error": "Invalid \"from\" value. Must be \"user\" or \"bot\""
}
```

```json
// Invalid timestamp
{
  "error": "Invalid \"createdAt\". Must be a valid ISO timestamp"
}
```

**Example cURL:**
```bash
curl -X POST https://bdcd0c9f-392c-4eca-a76a-4ab4fdca9994-00-2hisy5qmiaduo.spock.replit.dev:3000/events/message \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "arman_rahimi",
    "id": "msg_12345",
    "from": "user",
    "text": "سلام",
    "createdAt": "2025-12-01T09:35:00.000Z"
  }'
```

---

### 6. GET `/live-messages` - Real-Time Message Streaming (SSE)

**Description:** Server-Sent Events stream for real-time message updates

**Request:**
```bash
GET /live-messages
```

**Response Headers:**
```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
Access-Control-Allow-Origin: *
```

**Event Flow:**

**1. Initial Connection Confirmation:**
```
event: connected
data: {"type":"connected","timestamp":"2025-12-01T09:33:14.123Z"}

```

**2. Incoming Message Events:**
```
event: message
data: {"type":"message","message":{"id":"msg_123","conversationId":"arman_rahimi","from":"user","text":"سلام","createdAt":"2025-12-01T09:35:00.000Z"}}

```

**3. Heartbeat (every 25 seconds):**
```
:heartbeat

```

**Event Object Schema (for messages):**
```json
{
  "type": "message",
  "message": {
    "id": "msg_123",
    "conversationId": "user_id",
    "from": "user|bot",
    "text": "message content",
    "createdAt": "2025-12-01T09:35:00.000Z"
  }
}
```

**JavaScript Example:**
```javascript
const eventSource = new EventSource(
  'https://bdcd0c9f-392c-4eca-a76a-4ab4fdca9994-00-2hisy5qmiaduo.spock.replit.dev:3000/live-messages'
);

// Listen for connection
eventSource.addEventListener('connected', (event) => {
  const data = JSON.parse(event.data);
  console.log('Connected:', data);
});

// Listen for new messages
eventSource.addEventListener('message', (event) => {
  const eventData = JSON.parse(event.data);
  const message = eventData.message;
  console.log(`[${message.from}] ${message.text}`);
});

// Handle errors
eventSource.addEventListener('error', (error) => {
  console.error('SSE Error:', error);
  eventSource.close();
});
```

---

### 7. GET `/logs` - Real-Time Logs Streaming (SSE)

**Description:** Server-Sent Events stream for real-time bot logs

**Request:**
```bash
GET /logs
```

**Response Headers:**
```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
Access-Control-Allow-Origin: *
```

**Log Events:**
```
data: {"id":"log_1701414594567","source":"explainer","message":"Heartbeat: 2025-12-01T09:33:14.567Z","timestamp":"2025-12-01T09:33:14.567Z"}

```

**Log Object Schema:**
- `id` (string): Unique log ID
- `source` (string): Log source (e.g., "explainer")
- `message` (string): Log message
- `timestamp` (ISO 8601): When log was created
- **Max stored:** Last 100 logs

**JavaScript Example:**
```javascript
const logSource = new EventSource(
  'https://bdcd0c9f-392c-4eca-a76a-4ab4fdca9994-00-2hisy5qmiaduo.spock.replit.dev:3000/logs'
);

logSource.onmessage = (event) => {
  const log = JSON.parse(event.data);
  console.log(`[${log.timestamp}] ${log.message}`);
};
```

---

## Integration Examples

### Example 1: Send a User Message

```javascript
async function sendUserMessage(conversationId, messageText) {
  const response = await fetch(
    'https://bdcd0c9f-392c-4eca-a76a-4ab4fdca9994-00-2hisy5qmiaduo.spock.replit.dev:3000/events/message',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId: conversationId,
        id: `msg_${Date.now()}`,
        from: 'user',
        text: messageText,
        createdAt: new Date().toISOString()
      })
    }
  );

  return response.json();
}

// Usage
sendUserMessage('arman_rahimi', 'چندتا برند دارید؟');
```

### Example 2: Get All Conversations

```javascript
async function getAllConversations() {
  const response = await fetch(
    'https://bdcd0c9f-392c-4eca-a76a-4ab4fdca9994-00-2hisy5qmiaduo.spock.replit.dev:3000/conversations'
  );
  return response.json();
}

// Usage
const conversations = await getAllConversations();
conversations.forEach(conv => {
  console.log(`${conv.username}: ${conv.inboundCount} in, ${conv.outboundCount} out`);
});
```

### Example 3: Get Conversation Messages

```javascript
async function getConversationMessages(conversationId) {
  const response = await fetch(
    `https://bdcd0c9f-392c-4eca-a76a-4ab4fdca9994-00-2hisy5qmiaduo.spock.replit.dev:3000/messages?conversationId=${conversationId}`
  );
  return response.json();
}

// Usage
const messages = await getConversationMessages('arman_rahimi');
messages.forEach(msg => {
  console.log(`${msg.from}: ${msg.text}`);
});
```

### Example 4: Listen to Real-Time Messages

```javascript
function listenToMessages(onMessageReceived) {
  const eventSource = new EventSource(
    'https://bdcd0c9f-392c-4eca-a76a-4ab4fdca9994-00-2hisy5qmiaduo.spock.replit.dev:3000/live-messages'
  );

  eventSource.addEventListener('message', (event) => {
    const eventData = JSON.parse(event.data);
    onMessageReceived(eventData.message);
  });

  return eventSource; // Return to allow closing with eventSource.close()
}

// Usage
const events = listenToMessages((message) => {
  console.log(`New message from ${message.from}: ${message.text}`);
});
```

---

## Common Use Cases

### Dashboard Integration
1. Connect to `/live-messages` to show real-time messages
2. Poll `/stats` every 10 seconds for updated statistics
3. Use `/conversations` to show conversation list

### Chat Widget
1. Call `POST /events/message` when user sends a message
2. Call `GET /messages?conversationId=ID` to load message history
3. Connect to `/live-messages` to receive bot responses

### Monitoring
1. Poll `GET /health` every 30 seconds
2. Connect to `GET /logs` for real-time activity
3. Use `GET /stats` to track message volume

---

## Error Handling

All endpoints follow standard HTTP status codes:

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Bad Request (missing/invalid parameters) |
| `500` | Server Error |

**Example Error Response:**
```json
{
  "error": "conversationId is required"
}
```

---

## Rate Limiting

No rate limiting is currently enforced. All public endpoints are unlimited.

---

## CORS

All endpoints support CORS with:
- **Allow Origin:** `*` (any domain)
- **Allow Methods:** GET, POST, OPTIONS
- **Allow Headers:** Content-Type

---

## Notes for Developers

- **Message IDs:** Must be unique per conversation
- **Timestamps:** Always use ISO 8601 format
- **SSE Connections:** Use heartbeat monitoring to detect disconnects
- **Conversation IDs:** Typically Instagram usernames or user IDs
- **From Field:** Must be exactly "user" or "bot" (case-sensitive)

---

**Last Updated:** December 1, 2025
**API Version:** 1.0
**Bot Version:** Seylane Explainer AI v3.10
