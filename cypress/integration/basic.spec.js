import { add } from '../../src/index';

const page = {
    get container() {
        return document.querySelector('#toast-container');
    },
    get toast() {
        return document.querySelector('.toast');
    },
    get message() {
        return document.querySelector('.toast-message');
    },
    get allMessages() {
        return Array.from(document.querySelectorAll('.toast-message'));
    },
    get animEvent() {
        const ev = new Event('animationend');
        ev.animationName = 'fadeOut';
        return ev;
    },
};

jest.useFakeTimers();

beforeEach(() => {
    jest.runAllTimers();
    document.body.innerHTML = '';
    Toast.cleanup();
});

it('renders box with message', () => {
    Toast.success('abc');
    expect(page.message).toHaveTextContent('abc');
});

it('renders box with success styles', () => {
    Toast.success('abc');
    expect(page.toast).toHaveClass('toast-success');
});

it('renders box with error stlyes', () => {
    Toast.error('abc');
    expect(page.toast).toHaveClass('toast-error');
});

it('renders box with info stlyes', () => {
    Toast.info('abc');
    expect(page.toast).toHaveClass('toast-info');
});

it('renders box with warning stlyes', () => {
    Toast.warning('abc');
    expect(page.toast).toHaveClass('toast-warning');
});

it('has container with proper class', () => {
    Toast.success('abc');
    expect(page.container).toHaveClass('toast-top-center');
});

it('does not appear when passed falsy value', () => {
    Toast.success(undefined);
    Toast.success(null);
    Toast.success(0);
    Toast.success('');
    expect(page.container).toBeNull();
});

it('has proper exit class after given duration', () => {
    Toast.success('abc');
    jest.advanceTimersByTime(10000);
    expect(page.toast).toHaveClass('fadeOut');
});

it('has exit class on click', () => {
    Toast.success('abc');
    page.toast.click();
    expect(page.toast).toHaveClass('fadeOut');
});

it('is removed after end of exit animation', () => {
    Toast.success('abc');
    page.toast.dispatchEvent(page.animEvent);
    expect(page.container).toBeEmpty();
});

it('can render multiple toasts', () => {
    Toast.success('a');
    Toast.success('b');
    Toast.success('c');

    expect(page.allMessages.map(m => m.textContent).join('')).toEqual('abc');
});
