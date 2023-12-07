//User loads the page//
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

  it('should show error messaging to a user', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', { forceNetworkError: true }).as('error');
    //wait a second
    cy.wait(1000)
    //visit main page
    cy.visit('/')
    // assert that this request happened
    // and that it ended in an error
    cy.wait('@error');
    cy.get('h2').should('contain.text', 'Something went wrong, please try again later!');
  });

  it('should successfully retrieve data from the endpoint with the id of the selected poster', () => {
    // Intercept the GET request to the movies API and use the fixture without the extension
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270', {
      fixture: 'apiResponse2', // Use the fixture without the file extension
    }).as('api2Request');
    // Visit the specified page of your application
    cy.visit('/movie/436270');
    // Wait for the API request to complete
    cy.wait('@api2Request');
    //What you should see
    cy.get('img[src="https://image.tmdb.org/t/p/original//pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"]').should('be.visible');
    cy.get(".runtime").contains('125 minutes');
  })

  it('should show error messaging to a user regarding endpoint id', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270', { forceNetworkError: true }).as('error');
    //Wait a second
    cy.wait(1000)
    //Visit the page you want
    cy.visit('/movie/436270')
    // assert that this request happened
    // and that it ended in an error
    cy.wait('@error');
    cy.get('h2').should('contain.text', 'Something went wrong, please try again later!');
  });

  it('should successfully retrieve data from the endpoint with the id of the selected poster', () => {
    // Intercept the GET request to the movies API and use the fixture without the extension
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270/videos', {
      fixture: 'apiResponse3', // Use the fixture without the file extension
    }).as('api3Request');
    // Visit the specified page of your application
    cy.visit('/movie/436270');
    // Wait for the API request to complete
    cy.wait('@api3Request');
    // What you should see
    cy.get('iframe[src="https://www.youtube.com/embed/JaV7mmc9HGw"]').should('be.visible');
  })

  it('should show error messaging to a user regarding endpoint id', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270', { forceNetworkError: true }).as('error');
    //Wait a second
    cy.wait(1000);
    cy.visit('/movie/436270');
    // assert that this request happened
    // and that it ended in an error
    cy.wait('@error');
    cy.get('h2').should('contain.text', 'Something went wrong, please try again later!');
  });

  describe('Load Page', () => {
    beforeEach(() => {
      //Visit main page
      cy.visit('/');
    });
    //What you should see
    it('should display "Rancid Tomatillos" heading', () => {
      cy.get('h1').contains('Rancid Tomatillos');
    });
    //Display the movie image
    it('should display movie cards', () => {
      cy.get('.movie-poster').should('exist');
    });

    //User selects a card//
    describe('View Card Details', () => {
      it('should display movie details when a card is clicked', () => {
        //The movie image is clicked
        cy.get('.movie-poster').first().click();
        //The className of the container that has a bunch of stuff
        cy.get('.right-container').should('exist');
      });
    });
  });
  
  //User returns to main page//
    describe('Return to Main Page', () => {
      it('should return to the main page when the "Main" button is clicked', () => {
        //The page for MovieCard
        cy.visit('/movie/436270');
        //The container that has everything in MovieCard
        cy.get('.movie-card').should('exist');
        //.nav is the element that contains the Main nav link
        cy.get('.nav').click();
        //movie-poster is the className of the poser image from the main page
        cy.get('.movie-poster').should('exist');
      });
    });
});