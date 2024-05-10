export const getPercentByDivdeTwoNumber = (number1?: number | null, number2?: number | null) => {
    if (!number1 || !number2) return 0;
    if (number2 === 0) return 0;
    return Math.floor((number1 - (number2 - 1000) / 2) / ((number2 + 1000) / 2) * 100);
}