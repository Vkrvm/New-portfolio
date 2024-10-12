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
        const responseDiv = document.getElementById('responseMessage');
        responseDiv.style.display = 'block'; // Make the div visible
        responseDiv.className = 'alert'; // Reset the classes for alert
        if (data.success) {
            responseDiv.classList.add('alert-success mt-3'); // Add success class
            responseDiv.innerText = data.message; // Set success message
            document.getElementById('contactForm').reset(); // Reset form fields
        } else {
            responseDiv.classList.add('alert-danger mt-3'); // Add error class
            responseDiv.innerText = data.message; // Set error message
        }
    })
    .catch(error => {
        const responseDiv = document.getElementById('responseMessage');
        responseDiv.style.display = 'block';
        responseDiv.className = 'alert alert-danger';
        responseDiv.innerText = 'An error occurred. Please try again.';
    });
});
