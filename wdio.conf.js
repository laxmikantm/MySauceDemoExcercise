const baseUrl = 'https://www.saucedemo.com';

exports.config = {
	//
	// ====================
	// Runner Configuration
	// ====================
	//
	// WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
	// on a remote machine).
	runner: 'local',
	//
	// =====================
	// Server Configurations
	// =====================
	// Host address of the running Selenium server. This information is usually obsolete as
	// WebdriverIO automatically connects to localhost. Also, if you are using one of the
	// supported cloud services like Sauce Labs, Browserstack, or Testing Bot you don't
	// need to define host and port information because WebdriverIO can figure that out
	// according to your user and key information. However, if you are using a private Selenium
	// backend you should define the host address, port, and path here.
	//
	// hostname: '172.18.5.185',
	// port: 4444,
	// path: '/wd/hub',

	//
	// ==================
	// Specify Test Files
	// ==================
	// Define which test specs should run. The pattern is relative to the directory
	// from which `wdio` was called. Notice that, if you are calling `wdio` from an
	// NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
	// directory is where your package.json resides, so `wdio` will be called from there.
	//
	specs: [ './test/**/*.ts' ],
	// Patterns to exclude.
	exclude: [
		// 'path/to/excluded/files'
	],
	//
	// ============
	// Capabilities
	// ============
	// Define your capabilities here. WebdriverIO can run multiple capabilities at the same
	// time. Depending on the number of capabilities, WebdriverIO launches several test
	// sessions. Within your capabilities you can overwrite the spec and exclude options in
	// order to group specific specs to a specific capability.
	//
	// First, you can define how many instances should be started at the same time. Let's
	// say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
	// set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
	// files and you set maxInstances to 10, all spec files will get tested at the same time
	// and 30 processes will get spawned. The property handles how many capabilities
	// from the same test should run tests.
	//
	maxInstances: 10,
	//
	//
	capabilities: [
		{
			// maxInstances can get overwritten per capability. So if you have an in-house Selenium
			// grid with only 5 firefox instances available you can make sure that not more than
			// 5 instances get started at a time.
			maxInstances: 5,
			//
			browserName: 'firefox',
			'goog:chromeOptions': {
				// to run chrome headless the following flags are required
				// (see https://developers.google.com/web/updates/2017/04/headless-chrome)
				args: [ '--headless', '--disable-gpu' ]
			}
		}
	],
	//
	// ===================
	// Test Configurations
	// ===================
	// Define all options that are relevant for the WebdriverIO instance here
	//
	// Level of logging verbosity: trace | debug | info | warn | error
	logLevel: 'error',
	//
	// Warns when a deprecated command is used
	deprecationWarnings: true,
	//
	// If you only want to run your tests until a specific amount of tests have failed use
	// bail (default is 0 - don't bail, run all tests).
	bail: 0,
	//
	// Set a base URL in order to shorten url command calls. If your `url` parameter starts
	// with `/`, the base url gets prepended, not including the path portion of your baseUrl.
	// If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
	// gets prepended directly.
	baseUrl: baseUrl,
	//
	// Default timeout for all waitFor* commands.
	waitforTimeout: 10000,
	//
	// Default timeout in milliseconds for request
	// if Selenium Grid doesn't send response
	connectionRetryTimeout: 90000,
	//
	// Default request retries count
	connectionRetryCount: 3,
	//
	// Test runner services
	// Services take over a specific job you don't want to take care of. They enhance
	// your test setup with almost no effort. Unlike plugins, they don't add new
	// commands. Instead, they hook themselves up into the test process.
	services: [ 'selenium-standalone' ],
	//
	// Framework you want to run your specs with.
	// The following are supported: Mocha, Jasmine, and Cucumber
	// see also: https://webdriver.io/docs/frameworks.html
	//
	// Make sure you have the wdio adapter package for the specific framework installed
	// before running any tests.
	framework: 'mocha',
	//
	// Test reporter for stdout.
	// The only one supported by default is 'dot'
	// see also: https://webdriver.io/docs/dot-reporter.html
	reporters: [ 'spec', 'allure' ],

	//
	// Options to be passed to Mocha.
	// See the full list at http://mochajs.org/
	mochaOpts: {
		ui: 'bdd',
		timeout: 60000,
		compilers: [
			// 'ts-node/register',
			'tsconfig-paths/register'
		]
	},
	//
	// =====
	// Hooks
	// =====
	// WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
	// it and to build services around it. You can either apply a single function or an array of
	// methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
	// resolved to continue.
	/**
	 * Gets executed once before all workers get launched.
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 */
	// onPrepare: function (config, capabilities) {
	// },
	/**
	 * Gets executed just before initialising the webdriver session and test framework. It allows you
	 * to manipulate configurations depending on the capability or spec.
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that are to be run
	 */
	// beforeSession: function (config, capabilities, specs) {
	// },
	/**
	 * Gets executed before test execution begins. At this point you can access to all global
	 * variables like `browser`. It is the perfect place to define custom commands.
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that are to be run
	 */
	before: function(capabilities, specs) {
		// require('ts-node/register');
		require('ts-node').register({ files: true });
	},
	/**
	 * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
	 * @param {Object} test test details
	 */
	afterTest: function(test) {
		if (test.error !== undefined) {
			let name = 'ERROR-' + Date.now();
			browser.saveScreenshot('./errorShots/' + name + '.png');
		}
	}
};
