# Auto Cache JS

```ts
export abstract class AutoCache {
	abstract getCache(key: any): any;
	abstract setCache(key: any, value: any): void;
	abstract inCache(key: any): boolean;
	abstract clearCache(key: any | "all"): void;
	autoCache(key: any, executable: () => any) {
		let toCache: any;
		if (!this.inCache(key)) {
			toCache = executable();
			this.setCache(key, toCache);
		}
		return this.getCache(key);
	}
}
```

This defines how the cache will work. Bing bong. Check out the `index.ts` use of autoCache wrapper to see how it works. It basically just checks for the key in the cache and if not will execute whatever you define and then set the cache.
