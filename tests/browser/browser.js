const screenshotPath = './tests/browser/screenshots/';

casper.on("page.error", function(msg, trace) {
  this.echo("Error: " + msg, "ERROR");
});

describe('Videos searching', function() {
  beforeEach(function() {
    casper.start('http://localhost:8000/', function() {
      this.capture(screenshotPath + '1 - first-launch.png');

      this.fillSelectors('.search-box', {
        'input' : 'react',
      });
      this.sendKeys('.search-box > input', this.page.event.key.Enter, { keepFocus: true });
    });
  });

  it('should show loading indicator', function() {
    casper.then(function() {
      'Youtube Search - #react #redux #webpack'.should.matchTitle;
      '.search-box'.should.be.inDOM.and.be.visible;
    })

    casper.then(function() {
      this.waitForSelector('.loading', function gone() {
        '.loading'.should.be.inDOM;
        this.capture(screenshotPath + '2 - loading-indicator.png');
      });
    });
  });

  it('should retrieve 12 results or fewer', function() {
    casper.then(function() {
      this.waitWhileSelector('.loading', function gone() {
        '.loading'.should.not.be.inDOM;

        this.waitFor(function() {
          // Wait for all images loaded
          return this.evaluate(function() {
            var images = document.getElementsByTagName('img');

            return Array.prototype.every.call(images, function(i) {
              return i.complete;
            });
          });
        }, function() {
          this.capture(screenshotPath + '3 - search-results.png');
        });
      });
    });
  });

  it('should retrieve others result when navigating to next page', function() {
    casper.then(function() {
      this.waitWhileSelector('.loading', function gone() {
        '.loading'.should.not.be.inDOM;

        const prevPageContent = this.getElementInfo('.search-results').text;

        this.capture(screenshotPath + '4.1 - next-page-search-results.png');
        this.thenClick('.pagination > .next > a');
        this.waitWhileSelector('.loading', function gone() {
          const nextPageContent = this.getElementInfo('.search-results').text;

          chai.expect(prevPageContent).to.not.equal(nextPageContent);
          this.capture(screenshotPath + '4.2 - next-page-search-results.png');
        });
      });
    });
  });

  it('should retrieve others result when changing the filter', function() {
    casper.then(function() {
      this.waitWhileSelector('.loading', function gone() {
        '.loading'.should.not.be.inDOM;

        const prevPageContent = this.getElementInfo('.search-results').text;

        this.capture(screenshotPath + '5.1 - filtered-search-results.png');
        this.evaluate(function() {
          // https://github.com/facebook/react/issues/3249
          var event = document.createEvent("HTMLEvents");

          event.initEvent('change', true, true);
          document.querySelector('.content-filter .order select').selectedIndex = 2;
          document.querySelector('.content-filter .order select')
            .dispatchEvent(event);;
        });

        this.waitWhileSelector('.loading', function gone() {
          const nextPageContent = this.getElementInfo('.search-results').text;

          chai.expect(prevPageContent).to.not.equal(nextPageContent);
          this.capture(screenshotPath + '5.2 - filtered-search-results.png');
        });
      });
    });
  });

  it('should show "No results found"', function() {
    casper.then(function() {
      this.waitWhileSelector('.loading', function() {
        this.fillSelectors('.search-box', {
          'input' : 'qwertyfghasdf',
        });
        this.sendKeys('.search-box > input', this.page.event.key.Enter, { keepFocus: true });
        this.capture(screenshotPath + '6.1 - no-results-found.png');

        this.waitForText('No results found', function gone() {
          this.capture(screenshotPath + '6.2 - no-results-found.png');
        });
      });
    });
  });
});
