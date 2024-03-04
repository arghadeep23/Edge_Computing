const updatesList = document.getElementById('updates-list');

const evtSource = new EventSource('http://localhost:3000/updates');

evtSource.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const update = data.update;
    const listItem = document.createElement('li');
    listItem.textContent = update;
    updatesList.appendChild(listItem);
};
evtSource.onclose = function () {
    console.log("Event source closed. Match is over.");
    evtSource.close(); // Close the event source explicitly
};