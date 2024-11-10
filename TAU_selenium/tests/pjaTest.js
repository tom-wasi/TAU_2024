const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function pjaTests() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://pja.edu.pl/');

        let title = await driver.getTitle();
        assert.ok(title.includes('Polsko-Japońska'), 'Title does not contain "PJATK"');
        assert.ok(title.length > 5, 'Title is too short');
        assert.ok(title !== '', 'Title is empty');
    
        let rekrutacjaButton = await driver.findElement(By.css('a.btn.btn--border'));
        assert.ok(await rekrutacjaButton.isDisplayed(), 'Rekrutacja button is not displayed');
        assert.strictEqual(await rekrutacjaButton.getText(), 'Rekrutacja', 'Button text is incorrect');
        await rekrutacjaButton.click();
        await driver.wait(until.urlContains('/dla-kandydata'), 5000);
        let currentUrl = await driver.getCurrentUrl();
        assert.ok(currentUrl.includes('/dla-kandydata'), 'Did not navigate to rekrutacja page');

        let menu = await driver.findElement(By.css('.side-nav__menu-toggler'));
        assert.ok(await menu.isDisplayed(), 'Menu is not displayed');
        

        let langSwitcher = await driver.wait(
            until.elementLocated(By.css('#lang-selected')),
            5000
          );
          assert.ok(await langSwitcher.isDisplayed(), 'Language switcher is not displayed');
        
          let langText = await langSwitcher.getText();
          assert.strictEqual(langText, 'pl', 'Language is not set to Polish (pl)');
      
          await langSwitcher.click();
          let languageOption = await driver.wait(
            until.elementLocated(By.xpath("//a[text()='en']")),
            5000
          );
          assert.ok(await languageOption.isDisplayed(), 'English language option is not displayed');


        let footer = await driver.findElement(By.css('footer'));
        assert.ok(await footer.isDisplayed(), 'Footer is not displayed');
        let footerLinks = await driver.findElements(By.css('footer a'));
        assert.ok(footerLinks.length > 5, 'Not enough links in the footer');
        assert.ok(footerLinks.length < 50, 'Too many links in the footer');

        let searchLink = await driver.findElement(By.css('a.js-search'));
        assert.ok(await searchLink.isDisplayed(), 'Search link is not displayed');
        await searchLink.click();

        let inputField = await driver.wait(
            until.elementIsVisible(driver.findElement(By.css('.full-search__input'))),
            5000
        );
        await inputField.sendKeys('informatyka');
        await inputField.sendKeys('\n');

        let results = await driver.findElements(By.css('.full-search__results'))
        assert.ok(results !== '', 'Search results is empty');

    } finally {
        console.log("Tests finished");
        await driver.quit();
    }
}

pjaTests();