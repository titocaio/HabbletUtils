import { EventEmitter } from 'events';

// Create an instance of EventEmitter
const userIdEventEmitter = new EventEmitter();

// Expose a method to emit the userId event
export function emitUserId(userId: number): void {
  userIdEventEmitter.emit('userId', userId);
}

// Expose a method to listen for the userId event with a timeout
export function getUserId(timeout = 10000): Promise<number> {
  return Promise.race([
    new Promise<number>((resolve) => {
      userIdEventEmitter.once('userId', (userId: number) => {
        resolve(userId);
      });
    }),
    new Promise<number>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout User: Failed to receive userId within the specified time.'));
      }, timeout);
    }),
  ]);
}