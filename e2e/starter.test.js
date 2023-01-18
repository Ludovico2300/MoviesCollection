// describe('Navigation Test', () => {
//   beforeAll(async () => {
//     await device.launchApp();
//   });

//   beforeEach(async () => {
//     await device.reloadReactNative();
//   });

//   it('should have HomeScreen / All Movies Screen', async () => {
//     await expect(element(by.id('homeViewId'))).toBeVisible();
//   });

//   it('should show Favorites Screen after tap', async () => {
//     await element(by.id('favoritesButtonID')).tap();
//     await expect(element(by.id('favoritesViewId'))).toBeVisible();
//   });

//   it('should show "The Godfather" Screen after tap', async () => {
//     await element(by.id('The Godfather-movieCardId').and(by.label('The Godfather-movieCardLbl'))).tap(); 
//     //gli attributi ricercati con "and" devono essere assegnati allo stesso elemento!!!
//     await expect(element(by.id('The Godfather-movieViewId'))).toBeVisible();
//   });

//   it('should show "The Godfather Part II" Screen after tap', async () => {
//     await element(by.id('The Godfather Part II-movieCardId').withAncestor(by.id('The Godfather Part II-movieCardBtnId'))).tap(); 
//     await expect(element(by.id('The Godfather Part II-movieViewId'))).toBeVisible();
//   });


// });


describe('Favorites Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show Favorites Screen after tap', async () => {
    await element(by.id('favoritesButtonID')).tap();
    await expect(element(by.id('favoritesViewId'))).toBeVisible();
  });

  it('should show and confirm alert "Added to Favorites!" after tap', async () => {
    await element(by.id('The Godfather-movieCardId').and(by.label('The Godfather-movieCardLbl'))).tap(); 
    //gli attributi ricercati con "and" devono essere assegnati allo stesso elemento!!!
    await element(by.id('addFavoriteBtn')).tap();
    await expect(element(by.text('Added to Favorites!'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('should show The Godfather in Favorites Screen after tap', async () => {
    await element(by.id('favoritesButtonID')).tap();
    await expect(element(by.id('favoritesViewId'))).toBeVisible();
    await expect(element(by.text('The Godfather'))).toBeVisible();
  });


  it('should show and confirm alert "Removed from Favorites" after tap', async () => {
    await element(by.id('The Godfather-movieCardId').and(by.label('The Godfather-movieCardLbl'))).tap(); 
    //gli attributi ricercati con "and" devono essere assegnati allo stesso elemento!!!
    await element(by.id('addFavoriteBtn')).tap();
    await expect(element(by.text('Removed from Favorites'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('should not show The Godfather in Favorites Screen after tap', async () => {
    await element(by.id('favoritesButtonID')).tap();
    await expect(element(by.id('favoritesViewId'))).toExist();
    await expect(element(by.text('The Godfather'))).not.toExist();
  });


});