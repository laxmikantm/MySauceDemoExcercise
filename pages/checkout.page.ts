class CheckoutPage {
	private subheader: string;
	private checkout_info_form: string;

	constructor() {
		this.subheader = '.subheader';
		this.checkout_info_form = '#checkout_info_container form .checkout_info';
	}

	checkoutInfoFormPresent = () => $(this.checkout_info_form).isExisting();
	getSubHeader = (): string => $(this.subheader).getText();
}

export default new CheckoutPage();
