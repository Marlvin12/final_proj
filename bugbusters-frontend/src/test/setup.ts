import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll } from 'vitest';

global.fetch = vi.fn();

const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;
const originalInfo = console.info;

beforeAll(() => {
  // Suppress console.log and console.info in tests (informational logs)
  console.log = vi.fn(() => {});
  console.info = vi.fn(() => {});

  console.error = vi.fn((...args: unknown[]) => {
    const message = args.map(arg => String(arg || '')).join(' ');
    if (
      message.includes('Error fetching AI recommendations') ||
      message.includes('Failed to create chart') ||
      message.includes('Network error') ||
      message.includes('Maximum update depth exceeded') ||
      message.includes('can\'t acquire context') ||
      message.includes('can\'t acquire context from the given item') ||
      message.includes('Error saving') ||
      message.includes('Error fetching') ||
      message.includes('Error creating') ||
      message.includes('Error generating') ||
      message.includes('Supabase client not initialized') ||
      message.includes('Successfully saved') ||
      message.includes('Error details') ||
      message.includes('Attempted to save')
    ) {
      return;
    }
    originalError.call(console, ...args);
  });

  console.warn = vi.fn((...args: unknown[]) => {
    const message = args.map(arg => String(arg || '')).join(' ');
    if (
      message.includes('Failed to create chart') ||
      message.includes('can\'t acquire context') ||
      message.includes('can\'t acquire context from the given item') ||
      message.includes('Supabase client not initialized')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  });
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
  console.log = originalLog;
  console.info = originalInfo;
});

if (typeof HTMLCanvasElement !== 'undefined') {
  // @ts-ignore - Mock canvas for testing
  HTMLCanvasElement.prototype.getContext = vi.fn(() => {
    return {
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(() => ({ data: new Array(4) })),
      putImageData: vi.fn(),
      createImageData: vi.fn(() => []),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      fillText: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      rotate: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      measureText: vi.fn(() => ({ width: 0 })),
      transform: vi.fn(),
      rect: vi.fn(),
      clip: vi.fn(),
    } as unknown as RenderingContext;
  });
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('@clerk/nextjs', () => ({
  useAuth: () => ({
    userId: 'test-user-id',
    isLoaded: true,
  }),
  useUser: () => ({
    user: {
      id: 'test-user-id',
      firstName: 'Test',
      lastName: 'User',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
    },
    isLoaded: true,
  }),
  auth: vi.fn().mockResolvedValue({
    userId: 'test-user-id',
  }),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({
            data: { id: 'test-response-id' },
            error: null,
          }),
        })),
      })),
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn().mockResolvedValue({
            data: [],
            error: null,
          }),
        })),
      })),
      upsert: vi.fn().mockResolvedValue({
        error: null,
      }),
    })),
  },
}));

