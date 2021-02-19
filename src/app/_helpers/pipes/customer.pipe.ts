import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'customer'
})

export class CustomerPipe implements PipeTransform {
	transform(items: any[], filter: string, type = 'customer'): any {
		if (!items || !filter) {
			return items;
		}

		if (type != 'customer') {
			return items.filter(item => item.customer.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
		} else {
			return items.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
		}
	}
}
