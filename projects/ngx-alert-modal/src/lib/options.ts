export type AlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'


export class AlertOptions {
    /**
    * The title of the popup, as HTML.
    *
    * @default ''
    */
    title?: string | HTMLElement='';

    /**
     * A description for the popup.
     *
     * @default ''
     */
    text?: string='';

    /**
     * A HTML description for the popup.
     * If `text` and `html` parameters are provided in the same time, `html` will be used.
     *
     * [Security] SweetAlert2 does NOT sanitize this parameter. It is the developer's responsibility
     * to escape any user input when using the `html` option, so XSS attacks would be prevented.
     *
     * @default ''
     */
    html?: string | HTMLElement='';


    /**
     * Whether or not SweetAlert2 should show a full screen click-to-dismiss backdrop.
     * Either a boolean value or a css background value (hex, rgb, rgba, url, etc.)
     *
     * @default true
     */
    backdrop?: boolean =true;


    icon?: AlertIcon;

    /**
     * Popup width, including paddings (`box-sizing: border-box`).
     *
     * @default undefined
     */
    width?: number | string


    /**
     * If set to `false`, the user can't dismiss the popup by clicking outside it.
     * You can also pass a custom function returning a boolean value, e.g. if you want
     * to disable outside clicks for the loading state of a popup.
     *
     * @default true
     */
    allowOutsideClick?: boolean=true;

    /**
     * If set to `false`, the user can't dismiss the popup by pressing the Escape key.
     * You can also pass a custom function returning a boolean value, e.g. if you want
     * to disable the escape key for the loading state of a popup.
     *
     * @default true
     */
    allowEscapeKey?: boolean=true;

    /**
     * If set to `false`, the user can't confirm the popup by pressing the Enter or Space keys,
     * unless they manually focus the confirm button.
     * You can also pass a custom function returning a boolean value.
     *
     * @default true
     */
    allowEnterKey?: boolean=true;


    /**
     * If set to `false`, the "Confirm" button will not be shown.
     * It can be useful when you're using custom HTML description.
     *
     * @default true
     */
    showConfirmButton?: boolean=true;

    /**
     * If set to `true`, the "Deny" button will be shown, which the user can click on to deny the popup.
     *
     * @default false
     */
    showDenyButton?: boolean=false;

    /**
     * If set to `true`, the "Cancel" button will be shown, which the user can click on to dismiss the popup.
     *
     * @default false
     */
    showCancelButton?: boolean=true;

    /**
     * Use this to change the text on the "Confirm" button.
     *
     * @default 'OK'
     */
    confirmButtonText?: string='Ok';

    /**
     * Use this to change the text on the "Confirm" button.
     *
     * @default 'No'
     */
    denyButtonText?: string='No';

    /**
     * Use this to change the text on the "Cancel" button.
     *
     * @default 'Cancel'
     */
    cancelButtonText?: string='Cancel';

    /**
     * Use this to change the background color of the "Confirm" button.
     *
     * @default undefined
     */
    confirmButtonColor?: string;

    /**
     * Use this to change the background color of the "Deny" button.
     *
     * @default undefined
     */
    denyButtonColor?: string;

    /**
     * Use this to change the background color of the "Cancel" button.
     *
     * @default undefined
     */
    cancelButtonColor?: string;

    /**
     * Use this to change the `aria-label` for the "Confirm" button.
     *
     * @default ''
     */
    confirmButtonAriaLabel?: string='';

    /**
     * Use this to change the `aria-label` for the "Deny" button.
     *
     * @default ''
     */
    denyButtonAriaLabel?: string='';

    /**
     * Use this to change the `aria-label` for the "Cancel" button.
     *
     * @default ''
     */
    cancelButtonAriaLabel?: string='';


    /**
     * Set to `true` if you want to invert default buttons positions.
     *
     * @default false
     */
    reverseButtons?: boolean=false;



    /**
     * Set to `true` to show close button.
     *
     * @default false
     */
    showCloseButton?: boolean=false;


    containerClass?: string = '';
}