export function converterPrice(value) {
	if (value === "") {
		value = 0;
	} else {
		value = value.replace('.', ',');
	}
	return value;
}
