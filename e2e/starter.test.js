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

//   it('should check if Movies are fetched when scrolling bottom', async () => {
//     await expect(element(by.text('Cinema Paradiso'))).not.toBeVisible();
//     await expect(element(by.id('homeFlatListId'))).toBeVisible();
//     await waitFor(element(by.text('Cinema Paradiso'))).toBeVisible().whileElement(by.id('homeFlatListId')).scroll(300, 'down');
//   });  

// });




// describe('Favorites Test', () => {
//   beforeAll(async () => {
//     await device.launchApp();
//   });

//   beforeEach(async () => {
//     await device.reloadReactNative();
//   });

//   it('should show Favorites Screen after tap', async () => {
//     await element(by.id('favoritesButtonID')).tap();
//     await expect(element(by.id('favoritesViewId'))).toBeVisible();
//   });

//   it('should show and confirm alert "Added to Favorites!" after tap', async () => {
//     await element(by.id('The Godfather-movieCardId').and(by.label('The Godfather-movieCardLbl'))).tap(); 
//     //gli attributi ricercati con "and" devono essere assegnati allo stesso elemento!!!
//     await element(by.id('addFavoriteBtn')).tap();
//     await expect(element(by.text('Added to Favorites!'))).toBeVisible();
//     await element(by.text('OK')).tap();
//   });

//   it('should show The Godfather in Favorites Screen after tap', async () => {
//     await element(by.id('favoritesButtonID')).tap();
//     await expect(element(by.id('favoritesViewId'))).toBeVisible();
//     await expect(element(by.text('The Godfather'))).toBeVisible();
//   });


//   it('should show and confirm alert "Removed from Favorites" after tap', async () => {
//     await element(by.id('The Godfather-movieCardId').and(by.label('The Godfather-movieCardLbl'))).tap(); 
//     //gli attributi ricercati con "and" devono essere assegnati allo stesso elemento!!!
//     await element(by.id('addFavoriteBtn')).tap();
//     await expect(element(by.text('Removed from Favorites'))).toBeVisible();
//     await element(by.text('OK')).tap();
//   });

//   it('should not show The Godfather in Favorites Screen after tap', async () => {
//     await element(by.id('favoritesButtonID')).tap();
//     await expect(element(by.id('favoritesViewId'))).toExist();
//     await expect(element(by.text('The Godfather'))).not.toExist();
//   });

//   it('should show and confirm alert "Added to Favorites!" after tap (Spirited Away)', async () => {
//     await expect(element(by.id('homeFlatListId'))).toBeVisible();
//     await element(by.id('homeFlatListId')).scroll(350, 'down');
//     await expect(element(by.text('Spirited Away'))).toBeVisible();
//     await element(by.id('Spirited Away-movieCardId').and(by.label('Spirited Away-movieCardLbl'))).tap(); 
//     //gli attributi ricercati con "and" devono essere assegnati allo stesso elemento!!!
//     await element(by.id('addFavoriteBtn')).tap();
//     await expect(element(by.text('Added to Favorites!'))).toBeVisible();
//     await element(by.text('OK')).tap();
//   });

//   it('should show and confirm alert "Added to Favorites!" after tap(The Godfather)', async () => {
//     await element(by.id('The Godfather-movieCardId').and(by.label('The Godfather-movieCardLbl'))).tap(); 
//     //gli attributi ricercati con "and" devono essere assegnati allo stesso elemento!!!
//     await element(by.id('addFavoriteBtn')).tap();
//     await expect(element(by.text('Added to Favorites!'))).toBeVisible();
//     await element(by.text('OK')).tap();
//   });

//   it('should remove The Godfather from FavoriteList and refresh the screen', async () => {
//     await element(by.id('favoritesButtonID')).tap();
//     await expect(element(by.id('favoritesViewId'))).toExist();
//     await element(by.id('The Godfather-movieCardId').and(by.label('The Godfather-movieCardLbl'))).tap(); 
//     //gli attributi ricercati con "and" devono essere assegnati allo stesso elemento!!!
//     await element(by.id('addFavoriteBtn')).tap();
//     await expect(element(by.text('Removed from Favorites'))).toBeVisible();
//     await element(by.text('OK')).tap();
//     await element(by.id('goBackBtn')).tap();
//     await expect(element(by.id('favoritesFlatListId'))).toBeVisible();
//     await element(by.id('favoritesFlatListId')).swipe("down","slow", NaN, 0.5, 0.8);
//     await expect(element(by.text('The Godfather'))).not.toExist();
//   });
  

// });


//questa è una funzione che racchiude una parte di test, alla quale si pososno passare parametri
async function movieIsVisible(movieId) {
  const movie = element(by.id(movieId));
  await expect(movie).toBeVisible();
}


describe('Filter Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should filter Films and Show only Parasite in HomeScreen', async () => {
    await expect(element(by.id('homeViewId'))).toBeVisible();
    await expect(element(by.id('Parasite-movieCardId'))).not.toBeVisible();
    await element(by.id('textFieldId')).typeText('parasite');
    // await expect(element(by.id('Parasite-movieCardId'))).toBeVisible();
    // al posto di usare la riga di codice sopra, uso la funzione che ho creato e passo il parametro scelto
    await movieIsVisible("Parasite-movieCardId")
    await expect(element(by.id('The Godfather-movieCardId'))).not.toBeVisible();
    await expect(element(by.id('Spirited Away-movieCardId'))).not.toBeVisible();
  });

  
  it('should filter Films and Show only Parasite in HomeScreen and then clear the filter field', async () => {
    await expect(element(by.id('homeViewId'))).toBeVisible();
    await expect(element(by.id('Parasite-movieCardId'))).not.toBeVisible();
    await element(by.id('textFieldId')).typeText('parasite');
    await expect(element(by.id('Parasite-movieCardId'))).toBeVisible();
    await expect(element(by.id('The Godfather-movieCardId'))).not.toBeVisible();
    await expect(element(by.id('Spirited Away-movieCardId'))).not.toBeVisible();

    await element(by.id('textFieldId')).clearText();
    await expect(element(by.id('Parasite-movieCardId'))).not.toBeVisible();
    await expect(element(by.id('The Godfather-movieCardId'))).toBeVisible();
  });


});