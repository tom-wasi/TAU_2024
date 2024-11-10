const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function olxTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // 1. Otwórz stronę główną OLX
    await driver.get('https://www.olx.pl');
    await driver.manage().setTimeouts({ implicit: 5000 });

    // 2. Czekaj na pojawienie się i zaakceptowanie ewentualnego popupu (np. cookie consent)
    try {
      let acceptCookiesButton = await driver.findElement(By.css('.onetrust-accept-btn-handler'));
      await driver.wait(until.elementIsVisible(acceptCookiesButton), 5000);
      await acceptCookiesButton.click();
      console.log('Cookies accepted');
    } catch (e) {
      console.log('No cookies banner or already accepted');
    }

    // 3. Czekaj, aż overlay (cookie consent) zniknie
    let overlay = await driver.findElement(By.css('.onetrust-pc-dark-filter'));
    try {
      await driver.wait(until.elementIsNotVisible(overlay), 5000);
    } catch (e) {
      console.log('Overlay not visible or already gone');
    }

    // 4. Wyszukaj produkt
    let searchBox = await driver.findElement(By.id('search')); // Use the correct ID for the search bar
    await searchBox.sendKeys('laptop'); // Send a product search query
    await searchBox.submit(); // Submit the search

    // 5. Czekaj na wyniki wyszukiwania
    await driver.wait(until.elementLocated(By.css('l-card')), 5000); // Wait for the first product result to be visible

    // 6. Zweryfikuj, czy wyniki wyszukiwania są wyświetlane
    let productResults = await driver.findElements(By.css('css-1g5933j'));
    assert.ok(productResults.length > 0, 'No product results found');

    // 7. Zweryfikuj, czy pierwszy wynik wyszukiwania zawiera nazwę "laptop" w tytule (lub słowo kluczowe)
    let firstProductTitle = await productResults[0].findElement(By.css('.title'));
    let titleText = await firstProductTitle.getText();
    assert.ok(titleText.toLowerCase().includes('laptop'), 'First product title does not contain "laptop"');

  } finally {
    await driver.quit();
  }
})();
