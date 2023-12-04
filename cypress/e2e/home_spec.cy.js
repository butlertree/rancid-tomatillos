

//User loads the page//
describe('Load Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display "Rancid Tomatillos" heading', () => {
    cy.contains('Rancid Tomatillos');
  });

  it('should display movie cards', () => {
    cy.get('.card').should('exist');
  });
});


//User selects a card//
describe('View Card Details', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display movie details when a card is clicked', () => {
    cy.get('.card').first().click();
    cy.get('.movie-card').should('exist');
  });
});

//User returns to main page//
describe('Return to Main Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should return to the main page when the "Return to All" button is clicked', () => {
    cy.get('.card').first().click();
    cy.get('.back-button').click();
    cy.get('.card').should('exist');
  });
});




