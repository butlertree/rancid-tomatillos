//User loads the page//
describe('API calls', () => {
  it('should successfully retrieve data from the movies API', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      fixture: 'apiResponse',
    }).as('api1Request');
    cy.visit('/');
    cy.wait('@api1Request');
    //These images represent the first and last images of the moveis api
    cy.get('img[src="https://image.tmdb.org/t/p/original//pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"]').should('be.visible');
    cy.get('img[src="https://image.tmdb.org/t/p/original//woTQx9Q4b8aO13jR9dsj8C9JESy.jpg"]').should('be.visible');
  });

  it('should show error messaging to a user', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', { forceNetworkError: true }).as('error');
    cy.wait(1000);
    cy.visit('/');
    cy.wait('@error');
    cy.get('h2').should('contain.text', 'Something went wrong, please try again later!');
  });

  it('should successfully retrieve movie data from the endpoint with the id of the selected poster', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270', {
      fixture: 'apiResponse2',
    }).as('api2Request');
    cy.visit('/movie/436270');
    cy.wait('@api2Request');
    cy.get('img[src="https://image.tmdb.org/t/p/original//pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"]').should('be.visible');
    cy.get(".runtime").contains('125 minutes');
  });

  it('should show error messaging to a user regarding endpoint id', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270', { forceNetworkError: true }).as('error');
    cy.wait(1000);
    cy.visit('/movie/436270');
    cy.wait('@error');
    cy.get('h2').should('contain.text', 'Something went wrong, please try again later!');
  });

  it('should successfully retrieve a video from the endpoint with the id of the selected poster', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270/videos', {
      fixture: 'apiResponse3',
    }).as('api3Request');
    cy.visit('/movie/436270');
    cy.wait('@api3Request');
    //There is only one video that can be displayed
    cy.get('iframe[src="https://www.youtube.com/embed/JaV7mmc9HGw"]').should('be.visible');
  });

  it('should show error messaging to a user regarding endpoint id', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270', { forceNetworkError: true }).as('error');
    cy.wait(1000);
    cy.visit('/movie/436270');
    cy.wait('@error');
    cy.get('h2').should('contain.text', 'Something went wrong, please try again later!');
  });

  describe('Load Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('should display "Rancid Tomatillos" heading', () => {
      cy.get('h1').contains('Rancid Tomatillos');
    });
    it('should display movie cards', () => {
      cy.get('.movie-poster').should('exist');
    });

    describe('View Card Details', () => {
      it('should display movie details when a card is clicked', () => {
        cy.get('.movie-poster').first().click();
        cy.get('.right-container').should('exist');
      });
    });
  });

    describe('Return to Main Page', () => {
      it('should return to the main page when the "Main" button is clicked', () => {
        cy.visit('/movie/436270');
        cy.get('.movie-card').should('exist');
        cy.get('.nav').click();
        cy.get('.movie-poster').should('exist');
      });
    });
});

describe('Invalid Route Handling', () => {
  it('should display the NotFound component on a non-existent path', () => {
    // Visit a non-existent path
    cy.visit('/path-that-does-not-exist');

    // Check if the NotFound component is rendered
    cy.get('.not-found').should('exist');
    cy.get('h2').contains('404 Page Not Found');
    cy.get('p').contains('The page you are looking for does not exist.');
    cy.get('.nav').contains('Main').should('exist');
  });
});