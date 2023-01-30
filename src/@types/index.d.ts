/**
 *
 * TypeScript declarations for component props, payloads, and environment variables
 *
 */

import React from "react";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_BASE_URL: string;
      REACT_APP_API_KEY: string;
    }
  }
}

export type ISelectBox = {
  options: Array<{
    name: string;
    code: string;
  }>;
} & React.ComponentPropsWithoutRef<"select">;

export type ICheckbox = {
  label: string;
} & React.ComponentPropsWithoutRef<"input">;
