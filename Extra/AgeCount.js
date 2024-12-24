function calculateYearsSince(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    const differenceInMilliseconds = currentDate - givenDate;

    const millisecondsInAYear = 1000 * 60 * 60 * 24 * 365.25;
    const yearsDifference = differenceInMilliseconds / millisecondsInAYear;
    return Math.trunc(yearsDifference);
}

module.exports = {
    calculateYearsSince : calculateYearsSince
}