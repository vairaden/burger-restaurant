describe('Constructor page', () => {
  before(() => {
    cy.visit('/');
  });

  it('opens ingredient details', () => {

  })

  describe('Drag and drop', () => {
    it('should add ingredient to constructor', () => {
      cy.get('[data-test-id=ingredients]').as('ingredientsContainer');
      cy.get('[data-test-id=constructor-area]').as('constructorArea');

      cy.get('@ingredientsContainer')
        .find('[data-test-id=buns-list]')
        .as('buns');
      // cy.get('@ingredientsContainer')
      //   .find('[data-test-id=sauces-list]')
      //   .first()
      //   .as('sauces');
      // cy.get('@ingredientsContainer')
      //   .find('[data-test-id=ingredients-list]')
      //   .first()
      //   .as('ingredients');

      const dataTransfer = new DataTransfer();

      cy.get('@buns').children().first().as('bun');

      cy.get('@bun').trigger('dragstart', { dataTransfer });

      cy.get('@constructorArea').trigger('dragover', { dataTransfer });
      cy.get('@constructorArea').trigger('drop', { dataTransfer });

      cy.get('@bun').trigger('dragend', { dataTransfer });
    });
  });
});
