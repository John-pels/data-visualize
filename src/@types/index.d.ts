/**
 *
 * TypeScript declarations for component props, payloads, and environment variables
 *
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_BASE_URL: string;
      REACT_APP_API_KEY: string;
    }
  }
}
