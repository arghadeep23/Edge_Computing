// script.js
document.getElementById('webhookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const eventData = {
        event: formData.get('event'),
        data: formData.get('data')
    };

    fetch('http://localhost:3000/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('response').textContent = data;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('response').textContent = 'An error occurred while sending the webhook';
        });
});
