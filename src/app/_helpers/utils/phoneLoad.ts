export function phoneMask(val) {
	if (val.length <= 10) {
		return '(00) 0000-0000'
	} else {
		return '(00) 00000-0000'
	}
}
