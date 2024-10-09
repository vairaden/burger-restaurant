describe('Constructor page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open ingredient details', () => {
    cy.get('[data-test-id=ingredients]').as('ingredientsContainer');
    cy.get('@ingredientsContainer').find('[data-test-id=buns-list]').as('buns');
    cy.get('@buns').children().first().as('bun');

    cy.get('@bun').click();

    cy.get('[data-test-id=ingredient-details]')
      .should('be.visible')
      .as('ingredientDetails');

    cy.get('@bun')
      .invoke('attr', 'data-test-ingredient-id')
      .then((s) => {
        cy.get('@ingredientDetails').should(
          'have.attr',
          'data-test-ingredient-id',
          s
        );
      });

    cy.get('@ingredientDetails').children().first().should(
      'contain',
      'Детали ингедиента'
    );
  });

  it('should add ingredient to constructor', () => {
    cy.get('[data-test-id=ingredients]').as('ingredientsContainer');
    cy.get('[data-test-id=constructor-area]').as('constructorArea');
    cy.get('@ingredientsContainer').find('[data-test-id=buns-list]').as('buns');
    cy.get('@buns').children().first().as('bun');

    const dataTransfer = new DataTransfer();
    cy.get('@bun').trigger('dragstart', { dataTransfer });
    cy.get('@constructorArea').trigger('dragover', { dataTransfer });
    cy.get('@constructorArea').trigger('drop', { dataTransfer });
    cy.get('@bun').trigger('dragend', { dataTransfer });

    cy.get('@bun')
      .invoke('attr', 'data-test-ingredient-id')
      .then((s) => {
        cy.get('@constructorArea')
          .children()
          .first()
          .should('have.attr', 'data-test-ingredient-id', s);
      });
  });

  it('should create order', () => {
    cy.get('[data-test-id=ingredients]').as('ingredientsContainer');
    cy.get('[data-test-id=constructor-area]').as('constructorArea');
    cy.get('@ingredientsContainer').find('[data-test-id=buns-list]').as('buns');
    cy.get('@buns').children().first().as('bun');

    const dataTransfer = new DataTransfer();
    cy.get('@bun').trigger('dragstart', { dataTransfer });
    cy.get('@constructorArea').trigger('dragover', { dataTransfer });
    cy.get('@constructorArea').trigger('drop', { dataTransfer });
    cy.get('@bun').trigger('dragend', { dataTransfer });

    cy.get('[data-test-id=create-order-button]').click();

    cy.get('input[type=email]').type('kek@test.ru');
    cy.get('input[type=password]').type('Lolkek');
    cy.get('button[type=submit]').click();

    cy.get('[data-test-id=create-order-button]').click();

    cy.get('[data-test-id=create-order-info]', { timeout: 20000 }).should(
      'be.visible'
    );
  });

  describe('modals', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should close ingredient details', () => {
      cy.get('[data-test-id=ingredients]').as('ingredientsContainer');
      cy.get('@ingredientsContainer')
        .find('[data-test-id=buns-list]')
        .as('buns');
      cy.get('@buns').children().first().as('bun');

      cy.get('@bun').click();

      cy.get('[data-test-id=ingredient-details]')
        .should('be.visible')
        .as('ingredientDetails');

      cy.get('@bun')
        .invoke('attr', 'data-test-ingredient-id')
        .then((s) => {
          cy.get('@ingredientDetails').should(
            'have.attr',
            'data-test-ingredient-id',
            s
          );
        });

      cy.get('[data-test-id=modal-close-button]').click();
      cy.get('@ingredientDetails').should('not.exist');
    });

    it('should close order details', () => {
      cy.get('[data-test-id=ingredients]').as('ingredientsContainer');
      cy.get('[data-test-id=constructor-area]').as('constructorArea');
      cy.get('@ingredientsContainer')
        .find('[data-test-id=buns-list]')
        .as('buns');
      cy.get('@buns').children().first().as('bun');

      const dataTransfer = new DataTransfer();
      cy.get('@bun').trigger('dragstart', { dataTransfer });
      cy.get('@constructorArea').trigger('dragover', { dataTransfer });
      cy.get('@constructorArea').trigger('drop', { dataTransfer });
      cy.get('@bun').trigger('dragend', { dataTransfer });

      cy.get('[data-test-id=create-order-button]').click();

      cy.get('input[type=email]').type('kek@test.ru');
      cy.get('input[type=password]').type('Lolkek');
      cy.get('button[type=submit]').click();

      cy.get('[data-test-id=create-order-button]').click();

      cy.get('[data-test-id=create-order-info]', { timeout: 20000 })
        .should('be.visible')
        .as('orderInfo');

      cy.get('[data-test-id=modal-close-button]').click();
      cy.get('@orderInfo').should('not.exist');
    });
  });
});
