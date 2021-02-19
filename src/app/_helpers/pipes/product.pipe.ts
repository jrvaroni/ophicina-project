import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/product'

@Pipe({
	name: 'product'
})

export class ProductPipe implements PipeTransform {
	transform(items: Product[], filter: string): any {
		if (!items || !filter) {
			return items;
		}

		return items.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
	}
}
