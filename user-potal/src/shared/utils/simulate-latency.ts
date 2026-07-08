const MOCK_LATENCY_MS = 180;

/**
 * Simulates network latency for mock services. Keeping this in every mock
 * call means components already handle loading/pending states correctly,
 * so nothing needs to change in the UI once a real API replaces the mock.
 */
export const simulateLatency = (ms: number = MOCK_LATENCY_MS): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
