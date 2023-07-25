export interface AlertResult<T = any> {
    readonly isConfirmed: boolean
    readonly isDenied: boolean
    readonly isDismissed: boolean
    readonly value?: T
    readonly dismiss?: DismissReason
}


/**
 * An enum of possible reasons that can explain an alert dismissal.
 */
export enum DismissReason {
    cancel,
    backdrop,
    close,
    esc,
    timer,
}
