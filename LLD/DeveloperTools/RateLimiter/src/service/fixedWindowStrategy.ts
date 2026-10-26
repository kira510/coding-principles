import { IRateLimitingStrategy } from "../interface/rateLimitingStrategy";

export class UserRequestInfo {
    private windowStart: number;
    private requestCount: number;

    constructor(windowStart: number) {
        this.windowStart = windowStart;
        this.requestCount = 0;
    }

    reset(newStart: number) {
        this.windowStart = newStart;
        this.requestCount = 0;
    }

    increament() {
        this.requestCount++;
    }

    getWindowStart(): number {
        return this.windowStart;
    }

    getRequestCount(): number {
        return this.requestCount;
    }
}

export class FixedWindowStrategy implements IRateLimitingStrategy {
    private readonly windowSizeInMs: number;
    private readonly maxRequests: number;
    private readonly userRequestsMap: Map<String, UserRequestInfo> = new Map();

    constructor(windowSizeInSeconds: number, maxRequests: number) {
        this.windowSizeInMs = windowSizeInSeconds * 1000;
        this.maxRequests = maxRequests;
    }


    allowRequest(userId: string): boolean {
        const currentTime = Date.now();

        if (!this.userRequestsMap.has(userId)) {
            this.userRequestsMap.set(userId, new UserRequestInfo(currentTime));
        }

        const userRequestInfo = this.userRequestsMap.get(userId)!;

        if (currentTime - userRequestInfo.getWindowStart() >= this.windowSizeInMs) {
            userRequestInfo.reset(currentTime);
        }

        if (userRequestInfo.getRequestCount() < this.maxRequests) {
            userRequestInfo.increament();
            return true
        }

        return false
    }
}