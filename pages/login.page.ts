class LoginPage {
	private userNameField: string;
	private passwordField: string;
	private loginBtn: string;

	constructor() {
		this.userNameField = '#user-name';
		this.passwordField = '#password';
		this.loginBtn = '#login-button';
	}

	login = (userName: string, password: string): void => {
		$(this.userNameField).addValue(userName);
		$(this.passwordField).addValue(password);
		$(this.loginBtn).click();
	};
}

export default new LoginPage();
