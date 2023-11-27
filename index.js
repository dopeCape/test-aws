const { Builder, Browser, web } = require("selenium-webdriver");

var chrome = require("selenium-webdriver/chrome");
var fs = require("fs");

// "AQEDATmgJn0AUTdYAAABi-5SmPcAAAGMEl8c904AvO6GJabYR4gUbpA3Yv9Cp9DiW4Yw55M0IbQB7OLhmmgowwAIe5ciCSOfdS55BW6rMg2csFsDhD15SM8sOOaZyTA0TGh4PwVf5Lm7yHhbpoMPVEPu",

async function example() {
  let options = new chrome.Options();
  options.addExtensions("/home/tejes/workflow/mym/realply/extension-poc.crx");

  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
  try {
    await driver.manage().setTimeouts({ implicit: 5000 });
    await driver.get("https://linkedin.com/404");
    await driver.manage().addCookie({
      name: "li_at",
      value:
        "AQEDATmgJn0AUTdYAAABi-5SmPcAAAGMEl8c904AvO6GJabYR4gUbpA3Yv9Cp9DiW4Yw55M0IbQB7OLhmmgowwAIe5ciCSOfdS55BW6rMg2csFsDhD15SM8sOOaZyTA0TGh4PwVf5Lm7yHhbpoMPVEPu",
    });
    await driver.get("https://linkedin.com");
  } finally {
  }
}

(async function x() {
  example();
})();
