import BasePage from 'pages/base.page';

class ProductsPage extends BasePage {
	private sortControl: string;
	private itemsList: string;
	private checkOut: string;
	private ADD_TO_BASKET_BTN: string;

	constructor() {
		super();
		this.sortControl = '.product_sort_container';
		this.itemsList =
			'//div[@id="inventory_container"]//div[@class="inventory_item"]';
		this.checkOut = '#shopping_cart_container>a';
		// this.ADD_TO_BASKET_BTN = '.btn_primary .btn_inventory';
		this.ADD_TO_BASKET_BTN =
			'//button[@class="btn_primary btn_inventory" and contains(text(),"ADD TO CART")]';
	}

	isIntendedOptionSelected = (sortOption: string): boolean => {
		return $(this.sortControl)
			.$(`option[value=${this.getSortByAttribute(sortOption).toString()}]`)
			.isSelected();
	};

	sortByOption = (sortOption: string) => {
		$(this.sortControl).selectByAttribute(
			'value',
			this.getSortByAttribute(sortOption).toString()
		);
	};

	/* Better alternative for Switch-case-default statement */
	private getSortByAttribute = (sortOption: string) =>
		({
			'High to Low': 'hilo',
			'Low to High': 'lohi',
			'A to Z': 'az',
			'Z to A': 'za',
		}[sortOption]);

	selectCheapestElements = (count: number) => {
		let i: number = 0;
		while (i < count) {
			this.getAllItems(this.itemsList)
				.slice(-1)[0]
				.$(this.ADD_TO_BASKET_BTN)
				.click();
			i++;
		}
		$(this.checkOut).click();
	};
}

export default new ProductsPage();
