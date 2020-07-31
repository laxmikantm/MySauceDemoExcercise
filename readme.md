# Automate CheckOut flow on Sauce Demo Website

(c) Laxmi Somni July/August 2020

Steps covered:
1. Login to https://www.saucedemo.com/ using the "standard_user" account
2. Sort the products by Price (high to low)
3. Add the two cheapest products to your basket
4. Open the basket
5. Remove the cheapest product from your basket
6. Checkout
7. Finish on the page where you need to enter your name and postal code


## How to Run test Framework

```sh
npm install
```

## Running Tests

Run all tests. Mocha will look for test folder. If you need to use another folder, please specify it in package.json file.

```sh
npm run test
```

OR

```sh
npx wdio wdio.conf.js
```

For development test, you can comment the --headless option in the wdio.conf.js for directly openning the chrome browser.

In order to run one suite test only, you can use:

```sh
npm run dev path-to-test-file
```

## Reports - WIP

NOTE- I haven't managed to incorporate this functionality fully yet but the skeleton incorporation is done.

For running the test and show the report:

```sh
npm run report
```

For showing the report only:

```sh
npm run run-report
```

OR

```sh
allure generate allure-results && allure open
```

## Rerferences

[WebdriverIO API](http://webdriver.io/api/)

Many Thanks
-Laxmi
