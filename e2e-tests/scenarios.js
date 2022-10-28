'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /ferramenta when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/ferramenta");
  });


  describe('ferramenta', function() {

    beforeEach(function() {
      browser.get('index.html#!/ferramenta');
    });


    it('should render ferramenta when user navigates to /ferramenta', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for ferramenta/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#!/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
