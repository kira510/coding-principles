export interface IRateLimitingStrategy {
    allowRequest(userId: string): boolean
}