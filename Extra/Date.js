function formatDateTime() {
    const date = new Date();

    // Format day and year
    const day = date.getDate(); // Get the day (1-31)
    const year = date.getFullYear(); // Get the year (e.g., 2019)

    // Format month
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()]; // Get month name

    // Format time
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2 digits for minutes
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour format

    const dateFormat = {
        date : `${day} ${month} ${year}`,
        time : `${hours}.${minutes} ${ampm}`
    }
    // Construct the formatted date-time string
    return dateFormat
}

function getDateFormateYYYYMMDD() {
    return  new Date().toISOString().split("T")[0];
}

function getFormattedDate(date) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
}

module.exports = {
    formatDateTime : formatDateTime,
    getFormattedDate : getFormattedDate,
    getDateFormateYYYYMMDD : getDateFormateYYYYMMDD
}
