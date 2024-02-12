export const getPercentByDivdeTwoNumber = (number1?: number | null, number2?: number | null) => {
    if (!number1 || !number2) return 0;
    if (number2 === 0) return 0;
    return Math.ceil((number1 / number2) * 100);
}