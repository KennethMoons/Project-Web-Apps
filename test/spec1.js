var urlChanged = function(url) {
  return function () {
    return browser.getCurrentUrl().then(function(actualUrl) {
      return url == actualUrl;
    });
  };
};


describe('Inloggen', function() {
  it('moet inloggen met de juiste gegevens', function() {
    browser.get('https://rocky-peak-80147.herokuapp.com/#/aanmelden');
    element(by.model('preAanmelding.email')).sendKeys('kenneth.moons1@gmail.com');
    element(by.model('preAanmelding.wachtwoord')).sendKeys('test123');

    element(by.id('aanmeldenBtn')).click();
    browser.wait(urlChanged("https://rocky-peak-80147.herokuapp.com/#/home"), 5000); 

    });
});