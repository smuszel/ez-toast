const createContainer = () => {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-top-center';
    document.body.appendChild(container);

    return container;
};

const Toast = ({ text, duration, type, animationIn, animationOut }) => {
    const prepareExit = () => {
        clearTimeout(defaultExit);
        innerToast.className = `toast toast-${type} ${animationOut} animated`;
    };

    const innerToast = document.createElement('div');
    innerToast.setAttribute('aria-live', 'polite');
    innerToast.addEventListener('click', prepareExit);
    innerToast.className = `toast toast-${type} ${animationIn} animated`;
    innerToast.style.width = '600px';
    innerToast.addEventListener('animationend', ev => {
        ev.animationName === animationOut &&
            innerToast.parentNode.removeChild(innerToast);
    });

    const message = document.createElement('div');
    message.className = 'toast-message';
    message.textContent = text;
    innerToast.appendChild(message);

    const defaultExit = setTimeout(prepareExit, duration);

    return innerToast;
};

const ToastHandler = {
    container: createContainer(),
    ensureContainer: function() {
        !this.container && (this.container = createContainer());
    },
    appendToast: function(fullOptions) {
        if (fullOptions.text && typeof fullOptions.text === 'string') {
            this.ensureContainer();
            this.container.appendChild(
                Toast({
                    ...fullOptions,
                    duration: fullOptions.duration || 10000,
                    animationIn: fullOptions.animationIn || 'fadeIn',
                    animationOut: fullOptions.animationOut || 'fadeOut',
                }),
            );
        }
    },
    success: function(text, options = {}) {
        this.appendToast({ text, type: 'success', ...options });
    },
    error: function(text, options = {}) {
        this.appendToast({ text, type: 'error', ...options });
    },
    info: function(text, options = {}) {
        this.appendToast({ text, type: 'info', ...options });
    },
    warning: function(text, options = {}) {
        this.appendToast({ text, type: 'warning', ...options });
    },
    cleanup: function() {
        this.container && this.container.remove();
        delete this.container;
    },
};

export default ToastHandler;
