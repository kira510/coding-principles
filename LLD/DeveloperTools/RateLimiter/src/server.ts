import { FixedWindowStrategy } from "./service/fixedWindowStrategy";
import { RateLimiterService } from "./service/rateLimiterService";
import { TokenBucketStrategy } from "./service/tokenBucketStrategy";

function main(): void {
    const userId = "user123";

    console.log("=== Fixed Window Demo ===");
    runFixedWindowDemo(userId);

    console.log("\n=== Token Bucket Demo ===");
    runTokenBucketDemo(userId);
}

function runFixedWindowDemo(userId: string): void {
    const maxRequests = 5;
    const windowSeconds = 10;

    const fixedWindowStrategy = new FixedWindowStrategy(windowSeconds, maxRequests);
    const service = RateLimiterService.getInstance();
    service.setRateLimitingStrategy(fixedWindowStrategy);

    for (let i = 0; i < 10; i++) {
        service.handleRequest(userId);
    }
}

function runTokenBucketDemo(userId: string): void {
    const capacity = 5;
    const refillRate = 1;

    const tokenBucketStrategy = new TokenBucketStrategy(capacity, refillRate);
    const service = RateLimiterService.getInstance();
    service.setRateLimitingStrategy(tokenBucketStrategy);

    for (let i = 0; i < 10; i++) {
        service.handleRequest(userId);
    }
}

main();