import mockPostBody from '../fixtures/mockPost.json'

describe('URL Shortener', () => {

  const baseUrl = 'http://localhost:3000'

  before(() => {
    cy
    .fixture('urlsMockData.json')
    .then((mockUrlsData) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
        statusCode: 200,
        body: mockUrlsData
      })
    })

    cy
    .fixture('mockPost.json')
    .then((mockPostBody) => {
      cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
        statusCode: 200,
        body: mockPostBody
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

  it ('Should display the form inputs for a user to submit a new URL', () => {
    cy
      .get('form')
      .find('.title-input[type=text]').should('contain', '')
      .get('form')
      .find('.urlToShorten-input[type=text]').should('contain', '')
      .get('form')
      .find('.submit-btn').should('contain', 'Shorten Please')
  });

  it ('Should update with the info a user enters into the fields', () => {
    cy
      .get('form .title-input[type=text]').type('Title of New URL to add')
      .get('.urlToShorten-input[type=text]').type('https://http.cat/301')
      .get('form .submit-btn').click()
  });

  it ('Should add a Url successfully submitted by the user', () => {
    cy
      .get('section')
      .find('.url').should('have.length', 4)

      .get('form .title-input[type=text]').type(`${mockPostBody.title}`)
      .get('.urlToShorten-input[type=text]').type(`${mockPostBody.long_url}`)
      .get('form .submit-btn').click()

      .get('section')
      .find('.url h3').contains('Stubbing')

      .get('section')
      .find('.url').should('have.length', 5)
  });


})