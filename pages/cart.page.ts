import { Element } from '@wdio/sync';
import BasePage from './base.page';
import ElementInterface from '../models/elementInterface';

class CartPage extends BasePage implements ElementInterface {
	private cart_list: string;
	private item_price: string;
	private remove_btn: string;
	private checkOut_btn: string;

	products: ElementInterface[] = [];
	value: number;
	element: Element;

	constructor() {
		super();
		// this.cart_list = '.cart_list .cart_item';
		this.cart_list = '//div[@class="cart_item"]';
		// this.item_price = '.inventory_item_price';
		this.item_price = '//div[@class="inventory_item_price"]';
		// this.remove_btn = '.btn_secondary .cart_button';
		this.remove_btn = '//button[contains(@class,"cart_button") and contains(text(), "REMOVE")]';
		this.checkOut_btn = '.checkout_button';
	}

	removeCheapestItem = () => {
		// Step1: Reterive items into list
		let list: Array<any> = this.getAllItems(this.cart_list);

		for (let j = 0; j < list.length; j++) {
			var record = {
				value: parseInt(list.slice(j - 1)[0]),
				element: $(`//*[@class="cart_item"][${j + 1}]`).$(this.item_price)
			};
			this.products.push(record);
		}

		// Step2: Find lowest value and remove it
		this.products.reduce((acc, product) => (acc = acc < product.value ? acc : product.value), 0);
		this.products[0].element.$(this.remove_btn).click();
	};

	checkOut = () => {
		$(this.checkOut_btn).click();
	};
}

export default new CartPage();
