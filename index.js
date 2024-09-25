document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const entriesTableBody = document.getElementById('entriesTableBody');
    const dobError = document.getElementById('dobError');

    loadEntries();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked;

        const age = calculateAge(dob);

        if (!isValidDateOfBirth(age)) {
            dobError.textContent = `You are ${age} years old. You must be between 18 and 55 years old. Please change your date of birth.`;
            return;
        } else {
            dobError.textContent = '';
        }

        const entry = { name, email, password, dob, termsAccepted };
        saveEntry(entry);
        form.reset();
        loadEntries();
    });

    function calculateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function isValidDateOfBirth(age) {
        return age >= 18 && age <= 55;
    }

    function saveEntry(entry) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
        console.log('Entry saved:', entry);
    }

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entriesTableBody.innerHTML = '';
        console.log('Loading entries:', entries);
        entries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.password}</td>
                <td>${entry.dob}</td>
                <td>${entry.termsAccepted ? 'Yes' : 'No'}</td>
            `;
            entriesTableBody.appendChild(row);
        });
    }
});
