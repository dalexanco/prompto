import { produce } from 'immer';
import { StateCreator } from 'zustand';

export interface CacheEntry<T> {
  data?: T;
  createdAt: number;
  isFreezed: boolean;
  timeToLive: number;
  timeToStale: number;
}

interface CacheOptions {
  timeToLive?: number;
  timeToStale?: number;
}

interface ExecutorTask<T> {
  promise: Promise<CacheEntry<T>>;
  state: 'done' | 'loading' | 'canceled';
}

export interface CacheSlice {
  cacheEntries: Record<string, CacheEntry<unknown>>;
  cache: (key: string) => unknown | undefined;
  cacheInvalidate: (key: string) => void;
  cacheStatus: (key: string) => 'hit' | 'miss' | 'stale';
  cacheFetch: <T>(
    key: string,
    fetchFn: (key: string) => Promise<T>,
    options?: CacheOptions
  ) => Promise<CacheEntry<T>>;
  cacheForce: <T>(
    key: string,
    fetchFn: (key: string) => Promise<T>,
    options?: CacheOptions
  ) => Promise<CacheEntry<T>>;
}

const EXECUTOR_TASKS: Record<string, ExecutorTask<unknown>> = {};

function generateEntry<T>(data: T, options?: CacheOptions): CacheEntry<T> {
  return {
    data,
    isFreezed: false,
    createdAt: Date.now(),
    timeToLive: options?.timeToLive || -1,
    timeToStale: options?.timeToStale || -1
  };
}

export const createCacheSlice: StateCreator<CacheSlice, [], [], CacheSlice> = (
  set,
  get
) => ({
  cacheEntries: {},
  cache: (key: string) => get().cacheEntries[key]?.data,
  cacheStatus: (key: string) => {
    const entry = get().cacheEntries[key];
    if (!entry) return 'miss';

    const { createdAt, timeToLive, timeToStale, isFreezed } = entry;
    if (isFreezed) return 'hit';

    const isOutdated = timeToLive > 0 && Date.now() > createdAt + timeToLive;
    if (isOutdated) return 'miss';

    const isStaled = timeToStale == 0 || Date.now() > createdAt + timeToStale;
    if (isStaled) return 'stale';

    return 'hit';
  },
  cacheInvalidate: (key: string) => {
    set(
      produce(get(), (state) => {
        state.cacheEntries[key].timeToLive = 0;
        return state;
      })
    );
  },
  cacheForce: async <T>(
    key: string,
    fetchFn: (key: string) => Promise<T>,
    options?: CacheOptions
  ) => {
    const existingTask = EXECUTOR_TASKS[key];
    console.log('#cacheForce(%s) - existing-task = %s', key, existingTask);
    const task =
      existingTask?.state == 'loading'
        ? existingTask
        : ({
            promise: fetchFn(key).then((data) => generateEntry(data, options)),
            state: 'loading'
          } as ExecutorTask<T>);
    EXECUTOR_TASKS[key] = task;

    const cacheEntry = (await task.promise) as CacheEntry<T>;
    delete EXECUTOR_TASKS[key];

    if (!existingTask) {
      console.log('Update cache ', cacheEntry);
      set(
        produce(get(), (state) => {
          state.cacheEntries[key] = cacheEntry as CacheEntry<unknown>;
          return state;
        })
      );
    }
    return cacheEntry;
  },
  cacheFetch: async <T>(
    key: string,
    fetchFn: (key: string) => Promise<T>,
    options?: CacheOptions
  ): Promise<CacheEntry<T>> => {
    const cacheStatus = get().cacheStatus(key);
    console.log('#cacheFetch(%s) status=%s', key, cacheStatus);
    switch (cacheStatus) {
      case 'miss':
        return get().cacheForce(key, fetchFn, options);
      case 'stale':
        get().cacheForce(key, fetchFn, options);
        return get().cacheEntries[key] as CacheEntry<T>;
      case 'hit':
      default:
        return get().cacheEntries[key] as CacheEntry<T>;
    }
  }
});
