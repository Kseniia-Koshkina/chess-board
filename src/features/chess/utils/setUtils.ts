export const stringSetIntersection = (
	setA: Set<string>,
	setB: Set<string>
): Set<string> => {
	const result = new Set<string>();
	for (const item of setA) {
		if (setB.has(item)) result.add(item);
	}

	return result;
}