"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedinActions = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = __importDefault(require("selenium-webdriver/chrome"));
const utils_1 = require("../utils");
const fs_1 = __importDefault(require("fs"));
const buffer = fs_1.default.readFileSync("/home/tejes/workflow/mym/realply/test-aws-automation/extension-poc.crx");
class LinkedinActions {
    static launcBrowserWithLinkedinAndUserSession() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let options = new chrome_1.default.Options();
                options.setChromeBinaryPath("");
                options.addArguments("--no-sandbox");
                options.addArguments("--disable-dev-shm-usage");
                options.addExtensions(buffer);
                // options.windowSize({
                //   height: 1080,
                //   width: 1920,
                // });
                // options.headless();
                let driver = yield new selenium_webdriver_1.Builder()
                    .forBrowser(selenium_webdriver_1.Browser.CHROME)
                    .setChromeOptions(options)
                    .build();
                yield driver.manage().setTimeouts({ implicit: 5000 });
                yield driver.get("https://linkedin.com/404");
                yield driver.manage().addCookie({
                    name: "li_at",
                    value: "AQEDATmgJn0CEgtGAAABi-5VcLUAAAGMP5EzAlYAOP-3emOkJQJkMBSZjH5EGlKEUP8WiftMZQlpod7l3rqh-uYocvI_Ki_U1BO1zuVKaR70htlq1jJ9qAmvNcYG4pGFuHJbMJ9gkJ-nbtvmYBV-LyXr",
                });
                yield driver.get("https://linkedin.com");
                return driver;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static fetchLeads(searchTerm, userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.launcBrowserWithLinkedinAndUserSession();
            const searchBar = yield session.findElements(selenium_webdriver_1.By.className("search-global-typeahead__input"));
            yield searchBar[0].clear();
            yield searchBar[0].sendKeys(searchTerm);
            yield searchBar[0].sendKeys(selenium_webdriver_1.Key.ENTER);
            yield session.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath(`//button[contains(text(), People)]`)), 10000);
            const filterButtons = yield session.findElements(selenium_webdriver_1.By.className("search-reusables__filter-pill-button"));
            let peopleButton = yield Promise.all(filterButtons.map((element) => __awaiter(this, void 0, void 0, function* () {
                const menuTitle = yield element.getText();
                if (menuTitle === "People") {
                    return element;
                }
            })));
            peopleButton = peopleButton.filter((element) => element != undefined);
            yield ((_a = peopleButton[0]) === null || _a === void 0 ? void 0 : _a.click());
            yield session.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.className("entity-result")), 10000);
            const extensionButton = yield session.findElements(selenium_webdriver_1.By.id("realply_icon"));
            yield extensionButton[0].click();
            const startCampainButton = yield session.findElements(selenium_webdriver_1.By.id("start_campaign"));
            yield startCampainButton[0].click();
            yield (0, utils_1.sleep)(500);
            yield session.quit();
            return;
        });
    }
    static sendReuqest(requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.launcBrowserWithLinkedinAndUserSession();
            const extensionButton = yield session.findElements(selenium_webdriver_1.By.id("realply_icon"));
            yield extensionButton[0].click();
            const sendReuqest = yield session.findElements(selenium_webdriver_1.By.id("send_request"));
            yield sendReuqest[0].click();
            yield (0, utils_1.sleep)(1000);
            yield session.quit();
        });
    }
}
exports.LinkedinActions = LinkedinActions;
