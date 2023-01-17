describe('Navigation Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have HomeScreen / All Movies Screen', async () => {
    await expect(element(by.id('homeViewId'))).toBeVisible();
  });

  it('should show Favorites Screen after tap', async () => {
    await element(by.id('favoritesButtonID')).tap();
    await expect(element(by.id('favoritesViewId'))).toBeVisible();
  });

  it('should show "The Godfather" Screen after tap', async () => {
    await element(by.text('The Godfather')).tap();
    await expect(element(by.id('movieViewId'))).toBeVisible();
  });


});
