import { IRateLimitingStrategy } from "../interface/rateLimitingStrategy";

export class RateLimiterService {
    private rateLimiterStrategy: IRateLimitingStrategy | null = null;
    private static instance: RateLimiterService | null = null;

    private constructor() { }

    static getInstance(): RateLimiterService {
        if (this.instance) {
            return this.instance
        }

        this.instance = new RateLimiterService();
        return this.instance
    }

    setRateLimitingStrategy(rateLimiterStrategy: IRateLimitingStrategy) {
        this.rateLimiterStrategy = rateLimiterStrategy;
    }


    handleRequest(userId: string) {
        if (this.rateLimiterStrategy && this.rateLimiterStrategy.allowRequest(userId)) {
            console.log('request Allowed')
        } else {
            console.log('request Blocked')
        }
    }
}