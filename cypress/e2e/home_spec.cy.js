//User loads the page//
describe('Load Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display "Rancid Tomatillos" heading', () => {
    cy.get('h1').contains('Rancid Tomatillos');
  });

  it('should display movie cards', () => {
    cy.get('.card').should('exist');
  });

  //User selects a card//
  describe('View Card Details', () => {
    // beforeEach(() => {
    //   cy.visit('/');
    // });

    it('should display movie details when a card is clicked', () => {
      cy.get('.card').first().click();
      cy.get('.movie-card').should('exist');
    });
  });

  //User returns to main page//
  describe('Return to Main Page', () => {

    // it('should return to the main page when the "Return to All" button is clicked', () => {
    //   cy.get('.card').first().click();
    //   cy.get('.back-button').click();
    //   cy.get('.card').should('exist');
    // });
  });
});

describe('API calls', () => {
  it('should successfully retrieve data from the movies API', () => {
    // Intercept the GET request to the movies API and use the fixture without the extension
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      fixture: 'apiResponse', // Use the fixture without the file extension
    }).as('api1Request');

    // Visit the main page of your application
    cy.visit('/');

    // Wait for the API request to complete
    cy.wait('@api1Request');

    // Assertions to check the response data or UI elements
    cy.get('img[src="https://image.tmdb.org/t/p/original//pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"]').should('be.visible');
  });

  it('should successfully retrieve data from the endpoint with the id of the selected poster', () => {
    // Intercept the GET request to the movies API and use the fixture without the extension
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270', {
      fixture: 'apiResponse2', // Use the fixture without the file extension
    }).as('api2Request');

    // Visit the specified page of your application
    cy.visit('/436270');

    // Wait for the API request to complete
    cy.wait('@api2Request');

    cy.get('img[src="https://image.tmdb.org/t/p/original//pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"]').should('be.visible');

    cy.get(".runtime").should('contain.125 minutes');
  })
});
