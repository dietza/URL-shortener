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

})