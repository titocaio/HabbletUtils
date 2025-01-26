import { EventEmitter } from 'events';

// Create an instance of EventEmitter
const furniIdEventEmitter = new EventEmitter();

// Expose a method to emit the furniId event
export function emitfurniId(furniId: number): void {
  furniIdEventEmitter.emit('furniId', furniId);
}

// Expose a method to listen for the furniId event with a timeout
export function getfurniId(timeout = 10000): Promise<number> {
  return Promise.race([
    new Promise<number>((resolve) => {
      furniIdEventEmitter.once('furniId', (furniId: number) => {
        resolve(furniId);
      });
    }),
    new Promise<number>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout Furni: Failed to receive furniId within the specified time.'));
      }, timeout);
    }),
  ]);
}