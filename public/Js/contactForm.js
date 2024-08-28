document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            // Display the response message
            document.getElementById('responseMessage').innerText = data.message;

            // Clear the form fields
            if (data.success) {
                document.getElementById('contactForm').reset();
            }
        })
        .catch(error => {
            document.getElementById('responseMessage').innerText = 'An error occurred. Please try again.';
        });
});