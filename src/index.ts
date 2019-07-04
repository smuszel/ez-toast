import { ToastHandler, AppendToast, CreateToast, Options } from './types';

let container: HTMLDivElement;

const defaultOptions: Options = {
    showMethod: 'fadeIn',
    hideMetod: 'fadeOut',
    timeout: 3000,
};

const createContainer = () => {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-top-center';

    return container;
};

const createToast: CreateToast = (flavour, message, options) => {
    const startDisposal = () => {
        clearTimeout(disposeByTime);
        toast.className = `toast toast-${flavour}`;
    };

    const toast = document.createElement('div');
    toast.setAttribute('aria-live', 'polite');
    toast.addEventListener('click', startDisposal);
    toast.className = `toast toast-${flavour}`;
    toast.addEventListener('animationend', () => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    });

    const messageElement = document.createElement('div');
    messageElement.className = 'toast-message';
    messageElement.textContent = message;
    toast.appendChild(messageElement);

    const disposeByTime = setTimeout(startDisposal, options.timeout);

    return toast;
};

const appendToast: AppendToast = (flavour, message, options) => {
    if (!container || container.parentElement) {
        container = createContainer();
        document.body.appendChild(container);
    }

    const opt = { ...defaultOptions, ...(options || {}) };
    const toast = createToast(flavour, message, opt);
    container.appendChild(toast);
};

export const Toast: ToastHandler = {
    error: (message: string, options) => appendToast('error', message, options),
    success: (message: string, options) => appendToast('success', message, options),
    info: (message: string, options) => appendToast('info', message, options),
    warning: (message: string, options) => appendToast('warning', message, options),
};
