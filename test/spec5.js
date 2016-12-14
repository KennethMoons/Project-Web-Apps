describe('toevoegen', function() {
  it('nieuwe bluray toevoegen', function() {
    browser.get('https://rocky-peak-80147.herokuapp.com/#/aanmelden');
    element(by.model('preAanmelding.email')).sendKeys('test@test.com');
    element(by.model('preAanmelding.wachtwoord')).sendKeys('test');

    element(by.id('aanmeldenBtn')).click();
    var number1 = element.all(by.repeater('bluray in bluraylist')).count();

    element(by.id('goToCreateBtn')).click();
    element(by.model('bluray.titel')).sendKeys('test');
    element(by.id('createBlurayBtn')).click();
    var number2 = element.all(by.repeater('bluray in bluraylist')).count();
    var resultaat = number2 - number1;

    expect(resultaat == 1);

    });
});