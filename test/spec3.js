var urlChanged = function(url) {
  return function () {
    return browser.getCurrentUrl().then(function(actualUrl) {
      return url == actualUrl;
    });
  };
};


describe('Registreer', function() {
  it('nakijken of hij naar de registreer pagina gaat', function() {
    browser.get('https://rocky-peak-80147.herokuapp.com/#/aanmelden');


    element(by.id('registrerenBtn')).click();
    browser.wait(urlChanged("https://rocky-peak-80147.herokuapp.com/#/registreer"), 5000); 

    });
});