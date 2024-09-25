document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const entriesTableBody = document.getElementById('entriesTableBody');
    const dobError = document.getElementById('dobError');

    // Load existing entries from local storage
    loadEntries();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Validate email
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Calculate age
        const age = calculateAge(dob);

        // Validate date of birth
        if (!isValidDateOfBirth(age)) {
            dobError.textContent = `You are ${age} years old. You must be between 18 and 55 years old. Please change your date of birth.`;
            return;
        } else {
            dobError.textContent = ''; // Clear the error message
        }

        // Save to local storage
        const entry = { name, email, password, dob, termsAccepted };
        saveEntry(entry);

        // Clear form fields
        form.reset();

        // Load entries to update the table
        loadEntries();
    });

    function calculateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        // Adjust age if birth date hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function isValidDateOfBirth(age) {
        return age >= 18 && age <= 55;
    }

    function isValidEmail(email) {
        // Simple regex for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function saveEntry(entry) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
        console.log('Entry saved:', entry); // Debugging line
    }

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entriesTableBody.innerHTML = ''; // Clear the table before loading entries
        console.log('Loading entries:', entries); // Debugging line
        entries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.password}</td>
                <td>${entry.dob}</td>
                <td>${entry.termsAccepted ? 'true' : 'false'}</td>
            `;
            entriesTableBody.appendChild(row);
        });
    }
});
