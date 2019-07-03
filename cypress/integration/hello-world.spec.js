import { add } from '../../src/index';

describe('add', () => {
    beforeEach(() => {
        cy.visit('/cypress/site');
    });

    it('adds', () => {
        expect(add(2)).to.eq(1);
    });
});
