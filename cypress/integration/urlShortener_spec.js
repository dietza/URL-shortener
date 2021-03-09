describe('URL Shortener', () => {

  const baseUrl = 'http://localhost:3000'

  before(() => {
    cy
    .fixture('urlsMockData.json')
    .then((mockUrlsData) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
        statusCode: 200,
        delay: 100,
        body: mockUrlsData
      })
    })
    
    cy.visit(baseUrl)
  });

  it ('Should have the correct url for the page on load', () => {
    cy
      .url().should('eq', `${baseUrl}/`)
  });

  it ('Should show the site header when the home page is loaded', () => {
    cy
      .get('header h1').should('contain', 'URL Shortener')
  });

  it ('Should display the URLs currently stored on the server', () => {
    cy
    .get('section')
    .find('.url').should('have.length', 4)
  });

})