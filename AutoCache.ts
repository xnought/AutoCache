export abstract class AutoCache {
	abstract setCache(key: any, value: any): void;
	abstract clearCache(key: any | "all"): void;
	abstract inCache(key: any): boolean;
	abstract getCache(key: any): any;
	autoCache(key: any, executable: () => any) {
		let toCache: any;
		if (!this.inCache(key)) {
			toCache = executable();
			this.setCache(key, toCache);
		}
		return this.getCache(key);
	}
}

export class MapCache extends AutoCache {
	cache: Map<any, any>;
	constructor() {
		super();
		this.cache = new Map<any, any>();
	}
	setCache(key: any, value: any) {
		this.cache.set(key, value);
	}
	clearCache(key: any = "all") {
		if (key === "all") {
			this.cache.clear();
		} else {
			this.cache.delete(key);
		}
	}
	inCache(key: any) {
		return this.cache.has(key);
	}
	getCache(key: any) {
		return this.cache.get(key);
	}
}

export class ObjectCache extends AutoCache {
	cache: Object;
	constructor() {
		super();
		this.cache = {};
	}
	setCache(key: any, value: any) {
		this.cache[key as keyof Object] = value;
	}
	clearCache(key: any = "all") {
		if (key === "all") {
			this.cache = {};
		} else {
			delete this.cache[key as keyof Object];
		}
	}
	inCache(key: any) {
		return (key as keyof Object) in this.cache;
	}
	getCache(key: any) {
		return this.cache[key as keyof Object];
	}
}
