var urlChanged = function(url) {
  return function () {
    return browser.getCurrentUrl().then(function(actualUrl) {
      return url == actualUrl;
    });
  };
};


describe('Nieuwe gebruiker toevoegen', function() {
  it('nakijken of hij een nieuwe gebruiker toevoegt', function() {
    browser.get('http://localhost:3000/#/registreer');

    element(by.model('gebruikerRegistratie.email')).sendKeys('test@test.com');
    element(by.model('gebruikerRegistratie.wachtwoord')).sendKeys('test');
    element(by.model('gebruikerRegistratie.naam')).sendKeys('test');
    element(by.model('gebruikerRegistratie.voornaam')).sendKeys('test');

    element(by.id('registreerGebruikerBtn')).click();

    element(by.model('preAanmelding.email')).sendKeys('test@test.com');
    element(by.model('preAanmelding.wachtwoord')).sendKeys('test');

    element(by.id('aanmeldenBtn')).click();
    browser.wait(urlChanged("http://localhost:3000/#/home"), 5000); 

    });
});