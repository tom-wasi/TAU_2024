const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function amazonTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.amazon.com');
        
        // Asercja 1: Sprawdzenie tytułu strony
        let title = await driver.getTitle();
        assert.ok(title.includes('Amazon'), 'Title does not contain "Amazon"');

        // Asercja 2: Sprawdzenie obecności pola wyszukiwania
        let searchBox = await driver.findElement(By.id('twotabsearchtextbox'));
        assert.ok(await searchBox.isDisplayed(), 'Search box is not displayed');

        // Asercja 3: Sprawdzenie obecności przycisku wyszukiwania
        let searchButton = await driver.findElement(By.id('nav-search-submit-button'));
        assert.ok(await searchButton.isDisplayed(), 'Search button is not displayed');

        // Asercja 4: Sprawdzenie obecności menu "Account & Lists"
        let accountListMenu = await driver.findElement(By.id('nav-link-accountList'));
        assert.ok(await accountListMenu.isDisplayed(), '"Account & Lists" menu is not displayed');

        // Asercja 5: Sprawdzenie wartości tekstu w menu "Account & Lists"
        let accountListText = await accountListMenu.getText();
        assert.strictEqual(accountListText, 'Hello, sign in\nAccount & Lists', 'Account & Lists text is incorrect');

        // Asercja 6: Sprawdzenie obecności koszyka (cart)
        let cartIcon = await driver.findElement(By.id('nav-cart'));
        assert.ok(await cartIcon.isDisplayed(), 'Cart icon is not displayed');

        // Asercja 7: Sprawdzenie wartości liczby przedmiotów w koszyku (powinno być 0 przy nowej sesji)
        let cartCount = await driver.findElement(By.id('nav-cart-count')).getText();
        assert.strictEqual(cartCount, '0', 'Cart count is not zero');

        // Asercja 8: Sprawdzenie obecności stopki z linkiem "Conditions of Use"
        let footerLink = await driver.wait(until.elementLocated(By.linkText('Conditions of Use')), 10000);
        assert.ok(await footerLink.isDisplayed(), 'Footer link "Conditions of Use" is not displayed');
        
    } finally {
        console.log("Test finished");
        await driver.quit();
    }
}

amazonTest();
