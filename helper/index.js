function formatDate(date) {
    dateString = String(date);
    dateString = dateString.slice(0,10);

    return dateString;
}
module.exports = {
    formatDate : formatDate
} ;