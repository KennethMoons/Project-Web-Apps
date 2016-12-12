describe('LoginFailed', function() {
  it('moet het juiste foutbericht tonen', function() {
    browser.get('https://rocky-peak-80147.herokuapp.com/#/aanmelden');
    element(by.model('preAanmelding.email')).sendKeys('kenneth');
    element(by.model('preAanmelding.wachtwoord')).sendKeys('test');

    element(by.id('aanmeldenBtn')).click();

    expect(element(by.binding('errorMsg')).getText()).
        toEqual('aanmelden niet gelukt. wachtwoord of email niet in orde'); // This is wrong!
  });
});