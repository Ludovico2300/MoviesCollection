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

//   it('should check if "The Godfather" Card is not visible when scrolling', async () => {
//     // await expect(element(by.id('The Godfather-movieViewId'))).toBeVisible();
//     await expect(element(by.id('homeFlatListId'))).toBeVisible();
//     await element(by.id('homeFlatListId')).scroll(150, 'down');
//     await expect(element(by.id('The Godfather-movieViewId'))).not.toBeVisible();
//   });

//   it('should check if "Spirited Away" Card is visible when scrolling', async () => {
//     await expect(element(by.text('Spirited Away'))).not.toBeVisible();
//     await expect(element(by.id('homeFlatListId'))).toBeVisible();
//     await element(by.id('homeFlatListId')).scroll(350, 'down');
//     await expect(element(by.text('Spirited Away'))).toBeVisible();
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

  it('should show and confirm alert "Added to Favorites!" after tap (Spirited Away)', async () => {
    await expect(element(by.id('homeFlatListId'))).toBeVisible();
    await element(by.id('homeFlatListId')).scroll(350, 'down');
    await expect(element(by.text('Spirited Away'))).toBeVisible();
    await element(by.id('Spirited Away-movieCardId').and(by.label('Spirited Away-movieCardLbl'))).tap(); 
    //gli attributi ricercati con "and" devono essere assegnati allo stesso elemento!!!
    await element(by.id('addFavoriteBtn')).tap();
    await expect(element(by.text('Added to Favorites!'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('should show and confirm alert "Added to Favorites!" after tap(The Godfather)', async () => {
    await element(by.id('The Godfather-movieCardId').and(by.label('The Godfather-movieCardLbl'))).tap(); 
    //gli attributi ricercati con "and" devono essere assegnati allo stesso elemento!!!
    await element(by.id('addFavoriteBtn')).tap();
    await expect(element(by.text('Added to Favorites!'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('should remove The Godfather from FavoriteList from Screen', async () => {
    await element(by.id('favoritesButtonID')).tap();
    await expect(element(by.id('favoritesViewId'))).toExist();
    await element(by.id('The Godfather-movieCardId').and(by.label('The Godfather-movieCardLbl'))).tap(); 
    //gli attributi ricercati con "and" devono essere assegnati allo stesso elemento!!!
    await element(by.id('addFavoriteBtn')).tap();
    await expect(element(by.text('Removed from Favorites'))).toBeVisible();
    await element(by.text('OK')).tap();
  });
  
  it('should show Favorites Screen after tap and refreshing after scroll down', async () => {
    await element(by.id('favoritesButtonID')).tap();
    await expect(element(by.id('favoritesViewId'))).toBeVisible();
    await element(by.id('favoritesFlatListId')).scroll(350, 'down', NaN, 0.85);
  });

});