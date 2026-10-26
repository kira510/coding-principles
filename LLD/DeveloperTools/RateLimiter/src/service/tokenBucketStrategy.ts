import { IRateLimitingStrategy } from "../interface/rateLimitingStrategy";

class TokenBucket {
    private readonly capacity: number;
    private readonly refillRatePerSecond: number;
    tokens: number;
    lastRefillTimestamp: number;

    constructor(capacity: number, refillRatePerSecond: number, currentTimeInMillis: number) {
        this.capacity = capacity;
        this.refillRatePerSecond = refillRatePerSecond;
        this.tokens = capacity;
        this.lastRefillTimestamp = currentTimeInMillis;
    }

    refill(currentTime: number) {
        const elapseTime = currentTime - this.lastRefillTimestamp;
        const tokensObtained = Math.floor((elapseTime / 1000) * this.refillRatePerSecond);

        if (tokensObtained > 0) {
            this.tokens = Math.min(this.capacity, this.tokens + tokensObtained);
            this.lastRefillTimestamp = currentTime;
        }
    }
}

export class TokenBucketStrategy implements IRateLimitingStrategy {
    private readonly capacity: number
    private readonly refillRatePerSecond: number
    private readonly userBuckets: Map<string, TokenBucket> = new Map();

    constructor(capacity: number, refillRatePerSecond: number) {
        this.capacity = capacity;
        this.refillRatePerSecond = refillRatePerSecond;
    }

    allowRequest(userId: string): boolean {
        const currentTime = Date.now();

        if (!this.userBuckets.has(userId)) {
            this.userBuckets.set(userId, new TokenBucket(this.capacity, this.refillRatePerSecond, currentTime))
        }

        const userBucket = this.userBuckets.get(userId)!;

        userBucket.refill(currentTime);
        if (userBucket.tokens > 0) {
            userBucket.tokens--
            return true
        }

        return false
    }
}