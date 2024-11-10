const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function wpTests() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.wp.pl');

    // Test 1: Check title
    let title = await driver.getTitle();
    assert.ok(title.includes('Wirtualna Polska'), 'Title does not contain "WP"');
    assert.ok(title.length > 5, 'Title is too short');
    assert.ok(title !== '', 'Title is empty');

    // Test 2: Check search box presence
    let searchBox = await driver.findElement(By.name('q'));
    assert.ok(await searchBox.isDisplayed(), 'Search box is not displayed');
    assert.strictEqual(await searchBox.getAttribute('placeholder'), ' ', 'Search box placeholder is incorrect');
    assert.ok(await searchBox.isEnabled(), 'Search box is not enabled');

    // Test 3: Check main menu
    let menu = await driver.findElement(By.xpath("//span[contains(text(), 'Menu')]")); 
    assert.ok(await menu.isDisplayed(), 'Menu is not displayed'); 
    let menuItems = await driver.findElements(By.css('.sc-1d0vukv-1.gIRKSj li')); 
    assert.ok(menuItems.length < 20, 'Too many items in the main menu');
    // Test 8: Search for "news"
    await searchBox.sendKeys('Wiadomości');
    await searchBox.sendKeys('\n');
    await driver.wait(until.titleContains('Szukaj'), 5000);
    let searchTitle = await driver.getTitle();
    assert.ok(searchTitle.includes('Szukaj'), 'Search title does not contain "szukaj"');
    assert.ok(searchTitle !== '', 'Search title is empty');

  } finally {
    console.log("Tests finished");
    await driver.quit();
  }
}

wpTests();
