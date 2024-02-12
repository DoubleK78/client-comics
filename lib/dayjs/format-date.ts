export const formatDateToLocale = (utcDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const formattedDate = new Date(utcDate).toLocaleString(undefined, options);
    return formattedDate;
}