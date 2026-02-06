# DEC-000015 - Connection Pool Management

## Summary
Implement connection pool management to prevent browser connection pool exhaustion with 4 concurrent request limit and priority queuing.

## Status
**Implemented** - Performance optimization

## Context
Browsers limit concurrent connections per domain (typically 6-10). PQS makes many simultaneous requests:
- Session validation (every 60s)
- Activity updates (every 60s)
- Asset loading
- Map data fetching
- Photo loading

Without connection management, requests can stall when pool is exhausted.

## Decision
Implement **connection pool manager** in SessionManager with:
- **Max concurrent**: 4 (conservative vs browser limit of 6-10)
- **Request queuing**: FIFO with priority support
- **Stale connection cleanup**: 30s timeout
- **Statistics tracking**: Monitor pool utilization

### Implementation
```javascript
class SessionManager {
  constructor() {
    this.connectionPool = {
      maxConcurrent: 4,
      activeConnections: new Map(),
      queue: [],
      stats: {
        totalRequests: 0,
        queuedRequests: 0,
        completedRequests: 0
      }
    };
  }
  
  async acquireConnection(requestId, url, priority = 0) {
    if (this.connectionPool.activeConnections.size < this.maxConcurrent) {
      this.connectionPool.activeConnections.set(requestId, { url, startTime: Date.now() });
      return true;
    }
    
    // Queue with priority
    return new Promise((resolve) => {
      this.connectionPool.queue.push({ id: requestId, url, priority, resolve });
      this.connectionPool.queue.sort((a, b) => b.priority - a.priority);
    });
  }
  
  releaseConnection(requestId) {
    this.connectionPool.activeConnections.delete(requestId);
    this.processConnectionQueue();
  }
}
```

### Request Priorities
- **Priority 10**: Session checks (critical)
- **Priority 5**: Activity updates (important)
- **Priority 0**: Asset loading (default)

## Alternatives Considered
- **No Management**: Rejected - requests stall
- **Higher Limit (6-10)**: Rejected - less conservative, still risk stalls
- **Backend Batching**: Rejected - requires backend changes

## Consequences
### Positive
✅ Prevents request stalling  
✅ Priority-based queuing  
✅ Statistics for monitoring  
✅ Automatic cleanup of stale connections  

### Negative
⚠️ Adds latency for queued requests  
⚠️ Conservative limit (4) might be increased  
⚠️ Additional complexity in SessionManager  

## Technical Details
- **Cleanup Interval**: Every 30 seconds
- **Max Connection Time**: 30 seconds before forced cleanup
- **Queue Processing**: FIFO within same priority

## References
- src/services/SessionManager.js: Lines 1171-1289 (connection pool implementation)
- [Browser Connection Limits](https://developer.mozilla.org/en-US/docs/Web/HTTP/Connection_management_in_HTTP_1.x)

## Tags
`performance`, `connection-pool`, `browser-limits`, `queuing`

## Version History
- **v1.0** (2026-02-06): Initial documentation
