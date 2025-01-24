export interface IntervalsInterface {
    [key: string]: NodeJS.Timeout | null; // Intervals can be null initially
}

export const intervals: IntervalsInterface = {
    antiafk: null, // Example interval for "antiafk"
};