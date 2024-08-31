export const decimalPattern = /^\d*\.?\d+$/

export function isDecimal(value: string) {
    return decimalPattern.test(value)
}