export function cpfCnpjMask(val) {
	if (val.length == 11) {
		return '000.000.000-00'
	} else {
		return '00.000.000/0000-00'
	}
}
