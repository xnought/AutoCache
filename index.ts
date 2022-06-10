import { AutoCache, ObjectCache, MapCache } from "./AutoCache";

function deepFlatten(array: any[], isArray = Array.isArray) {
	let flattenedArray: any[] = [];
	const recursiveFlatten = (_array: any) => {
		_array.forEach((item: any) => {
			if (isArray(item)) {
				recursiveFlatten(item);
			} else {
				flattenedArray.push(item);
			}
		});
	};
	recursiveFlatten(array);
	return flattenedArray;
}

class ArrayPlusPlus extends Array {
	cache: AutoCache;
	constructor(private arrayOrLength: any | number | any[]) {
		super(
			Array.isArray(arrayOrLength) ? arrayOrLength.length : arrayOrLength
		);
		if (Array.isArray(arrayOrLength)) {
			this.overrideData(arrayOrLength);
		}
		this.cache = new MapCache();
	}
	flatten() {
		const cacheKey = "flatten";
		const flattened = this.cache.autoCache(cacheKey, () => {
			return deepFlatten(this, Array.isArray);
		});
		return new ArrayPlusPlus(flattened);
	}
	protected overrideData(newArray: any[]) {
		for (let i = 0; i < this.length; i++) {
			this[i] = newArray[i];
		}
	}
}

let A = new ArrayPlusPlus([[[[[[[3]]]]], 3], 4]);
let B = A.flatten();
let C = A.flatten();

console.log(B, C);
