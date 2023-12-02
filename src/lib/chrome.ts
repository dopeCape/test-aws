import { Builder, Browser, By, Key, until } from "selenium-webdriver";

import chrome from "selenium-webdriver/chrome";
import { sleep } from "../utils";
import fs from "fs";
const buffer = fs.readFileSync(
  "/home/tejes/workflow/mym/realply/test-aws-automation/extension-poc.crx"
);

export class LinkedinActions {
  static async launcBrowserWithLinkedinAndUserSession() {
    try {
      let options = new chrome.Options();
      options.setChromeBinaryPath("");
      options.addArguments("--no-sandbox");
      options.addArguments("--disable-dev-shm-usage");
      options.addExtensions(buffer);
      // options.windowSize({
      //   height: 1080,
      //   width: 1920,
      // });
      // options.headless();
      let driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();
      await driver.manage().setTimeouts({ implicit: 5000 });
      await driver.get("https://linkedin.com/404");
      await driver.manage().addCookie({
        name: "li_at",
        value:
          "AQEDATmgJn0CEgtGAAABi-5VcLUAAAGMP5EzAlYAOP-3emOkJQJkMBSZjH5EGlKEUP8WiftMZQlpod7l3rqh-uYocvI_Ki_U1BO1zuVKaR70htlq1jJ9qAmvNcYG4pGFuHJbMJ9gkJ-nbtvmYBV-LyXr",
      });
      await driver.get("https://linkedin.com");
      return driver;
    } catch (error) {
      throw error;
    }
  }

  static async fetchLeads(searchTerm: string, userId: string) {
    const session = await this.launcBrowserWithLinkedinAndUserSession();
    const searchBar = await session.findElements(
      By.className("search-global-typeahead__input")
    );
    await searchBar[0].clear();
    await searchBar[0].sendKeys(searchTerm);
    await searchBar[0].sendKeys(Key.ENTER);
    await session.wait(
      until.elementLocated(By.xpath(`//button[contains(text(), People)]`)),
      10000
    );
    const filterButtons = await session.findElements(
      By.className("search-reusables__filter-pill-button")
    );
    let peopleButton = await Promise.all(
      filterButtons.map(async (element) => {
        const menuTitle = await element.getText();
        if (menuTitle === "People") {
          return element;
        }
      })
    );
    peopleButton = peopleButton.filter((element) => element != undefined);

    await peopleButton[0]?.click();
    await session.wait(
      until.elementLocated(By.className("entity-result")),
      10000
    );

    const extensionButton = await session.findElements(By.id("realply_icon"));
    await extensionButton[0].click();
    const startCampainButton = await session.findElements(
      By.id("start_campaign")
    );

    await startCampainButton[0].click();
    await sleep(500);
    await session.quit();
    return;
  }
  static async sendReuqest(requestData: string) {
    const session = await this.launcBrowserWithLinkedinAndUserSession();
    const extensionButton = await session.findElements(By.id("realply_icon"));
    await extensionButton[0].click();
    const sendReuqest = await session.findElements(By.id("send_request"));
    await sendReuqest[0].click();
    await sleep(1000);
    await session.quit();
  }
}
