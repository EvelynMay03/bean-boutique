document.addEventListener('DOMContentLoaded', function() {
    // Check if user has seen the modal before using localStorage
    if (!localStorage.getItem('modalShown')) {
        // Show modal after a short delay (e.g., 2 seconds)
        setTimeout(function() {
            const modal = document.getElementById('welcomeModal');
            modal.style.display = 'block';
            
            // Set flag in localStorage to indicate modal has been shown
            localStorage.setItem('modalShown', 'true');
         }, 2000);
    }

    // Close modal when clicking the X button
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = document.getElementById('welcomeModal');
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('welcomeModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    const emailForm = document.getElementById('emailSignupForm');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('emailInput').value;
            
            // Here you would typically send the email to your server
            // For demonstration, we'll just log it and show a success message
            console.log('Email submitted:', email);
            
            // Display success message
            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = `
                <h2>Thank You!</h2>
                <p>Your 10% discount code is: <strong>WELCOME10</strong></p>
                <p>We've sent it to your email as well.</p>
                <button id="continueShopping" style="margin-top: 20px;">Continue Shopping</button>
            `;
            
            // Add event listener to the new button
            document.getElementById('continueShopping').addEventListener('click', function() {
                document.getElementById('welcomeModal').style.display = 'none';
            });
            
            // In a real implementation, you would:
            // 1. Send the email to your server
            // 2. Generate/store the discount code
            // 3. Send the code to the user's email
            // 4. Potentially set a cookie to track the user's eligibility
        });
    }
});