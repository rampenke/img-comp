// tslint:disable:forin
import { BodyType, EyeType, MouthType, PatternType } from './Compose';
let map = new Map<string, string>();
let initialized = false;
export const Genes: () => Promise<Map<string, string>> = async () => {
	if (initialized === true) {
		return map;
	}
	for (const b in BodyType) {
		for (const p in PatternType) {
			const svg = await fetch(`cattributes/body/${b}-${p}.svg`);
			map.set(`${b}-${p}`,await svg.text());
		}
	}

	for (const et in EyeType) {
		const svg = await fetch(`cattributes/eye/${et}.svg`);
		map.set(`${et}`, await svg.text());
	}

	for (const mt in MouthType) {
		const svg = await fetch(`cattributes/mouth/${mt}.svg`);
		map.set(`${mt}`, await svg.text());
	}
	initialized = true;
	return map;
};
