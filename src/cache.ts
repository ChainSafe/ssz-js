import LRU from "lru-cache";

const defaultCache = new LRU(2000);

// cache singleton
export let cache = defaultCache;
