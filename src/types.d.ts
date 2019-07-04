type Flavour = keyof typeof import('./constants').flavours;
type ShowMethod = 'fadeIn' | 'bounceIn';
type HideMethod = 'fadeOut' | 'bounceOut';
export type Options = {
    hideMetod: HideMethod;
    showMethod: ShowMethod;
    timeout: number;
};

export type ToastHandler = {
    [F in Flavour]: (message: string, options?: Options) => void;
};

export type AppendToast = (flavour: Flavour, message: string, options?: Options) => void;
export type CreateToast = (
    flavour: Flavour,
    message: string,
    options: Options,
) => HTMLDivElement;
