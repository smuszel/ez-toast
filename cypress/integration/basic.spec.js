import { Toast } from '../../src/index';

jest.useFakeTimers();

beforeEach(() => {
    cy.visit('/cypress/site');
    // jest.runAllTimers();
    // document.body.innerHTML = '';
    // Toast.cleanup();
});

it('renders box with message', () => {
    Toast.success('abc');
    cy.get('.toast').should('have.text', 'abc');
});

it('renders box with method name styles', () => {
    Toast.info('abc');
    cy.get('.toast').should('have.class', 'toast-info');
});

it('does not appear when passed falsy value', () => {
    Toast.success(undefined);
    Toast.success(null);
    Toast.success(0);
    Toast.success('');
    cy.get('#toast-container').should('not.exist');
});

it('can render multiple toasts', () => {
    Toast.success('a');
    Toast.success('b');
    Toast.success('c');

    cy.get('.toast').should('have.text', 'abc');
});

// it('has proper exit class after given duration', () => {
//     Toast.success('abc');
//     jest.advanceTimersByTime(10000);
//     expect(page.toast).toHaveClass('fadeOut');
// });

// it('has exit class on click', () => {
//     Toast.success('abc');
//     page.toast.click();
//     expect(page.toast).toHaveClass('fadeOut');
// });

// it('is removed after end of exit animation', () => {
//     Toast.success('abc');
//     page.toast.dispatchEvent(page.animEvent);
//     expect(page.container).toBeEmpty();
// });
