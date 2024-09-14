function updateDateTime() {
    const indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const currentDateTime = new Date(indiaTime);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDateTime = currentDateTime.toLocaleDateString('en-IN', options);
    document.getElementById('datetime').innerText = formattedDateTime;
}
setInterval(updateDateTime, 1000);
updateDateTime();
