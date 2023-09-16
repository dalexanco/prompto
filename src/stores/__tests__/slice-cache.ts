import { assert } from 'vitest';
import { CacheSlice, createCacheSlice } from '../slice-cache';

describe('stores/slice-cache', () => {
  describe('#cacheStatus', () => {
    test("should return 'miss' with empty store", () => {
      const get = () => ({ cacheEntries: {} } as CacheSlice);
      const set = (arg: CacheSlice) => {
        console.log(arg);
      };
      const getState = () => ({} as CacheSlice);
      const setState = () => {};
      const subscribe = () => () => {};
      const destroy = () => {};
      const store = createCacheSlice(set, get, {
        getState,
        setState,
        subscribe,
        destroy
      });
      const result = store.cacheStatus('any-key');
      assert.equal(result, 'miss');
    });
  });
});
