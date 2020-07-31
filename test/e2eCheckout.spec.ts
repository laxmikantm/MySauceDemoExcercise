import { expect } from 'chai';
import loginPage from '../pages/login.page';
import productPage from '../pages/products.page';
import cartPage from '../pages/cart.page';
import checkOutPage from '../pages/checkout.page';

describe('Sauce Demo Page Test', () => {
	before(() => {
		browser.url('/');
	});
	it('should login', () => {
		loginPage.login('standard_user', 'secret_sauce');
	});
	it('allow me to sort products by High to Low price and select 2 cheapest products', () => {
		productPage.sortByOption('High to Low');
		expect(productPage.isIntendedOptionSelected('High to Low')).to.be.true;
		productPage.selectCheapestElements(2);
	});
	it('allow me to remove cheapest product from basket', () => {
		cartPage.removeCheapestItem();
	});
	it('takes me to Checkout page', () => {
		cartPage.checkOut();
		expect(checkOutPage.checkoutInfoFormPresent()).to.be.true;
		expect(checkOutPage.getSubHeader()).to.equal('Checkout: Your Information');
	});
});
