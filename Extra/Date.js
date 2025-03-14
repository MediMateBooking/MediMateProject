function formatDateTime() {
    const date = new Date();

  
    const day = date.getDate(); 
    const year = date.getFullYear(); 

   
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()]; 

   
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0'); 
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 

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
