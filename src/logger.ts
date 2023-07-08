/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  ExtensionRuntimeRequest,
  ExtensionRuntimeRequestType
} from './types/extension';
import browser from 'webextension-polyfill';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG
}

export interface Log {
  level: LogLevel;
  message: any;
  params: any[];
}

export const info = (message?: any, ...optionalParams: any[]): void =>
  log(LogLevel.INFO, message, optionalParams);

export function log(
  level: LogLevel,
  message?: any,
  ...optionalParams: any[]
): void {
  const log = {
    level,
    message,
    params: optionalParams
  };

  browser.runtime.sendMessage({
    type: ExtensionRuntimeRequestType.LOG,
    content: log
  } as ExtensionRuntimeRequest);
}

export default {
  log,
  info
};
