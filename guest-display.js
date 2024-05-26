localStorage.clear(); 

// Clear local storage when the page loads
window.addEventListener('load', function() {
    localStorage.clear(); // This will remove all items from local storage
});


document.addEventListener('DOMContentLoaded', function() {
    // retrieves table body element with guest-table id and from local storage or puts up empty array if got no existing data
    const guestTableBody = document.querySelector('#guest-table tbody');
    const guests = JSON.parse(localStorage.getItem('guests')) || [];

    // creates new table row for each guest and populates each row with guest info
    guests.forEach(guest => {
        const row = document.createElement('tr');
        // creates multuple table cells
        row.innerHTML = `
            <td>${guest.guestName}</td>
            <td>${guest.countryCode}</td>
            <td>${guest.guestPhone}</td>
            <td>${guest.numPax}</td>
            <td>${guest.guestDiet}</td>
        `;
        
        // Add event listener for click to change color for attending guest
        row.addEventListener('click', function() {
            row.classList.toggle('attending');
        });

        // Add event listener for double click to undo color if click wrong or not attending
        row.addEventListener('dblclick', function() {
            row.classList.remove('attending');
        });

        // append each tr to tb
        guestTableBody.appendChild(row);
    });
});


// runs when user clicks submit on guest form

document.getElementById('guest-form').addEventListener('submit', function(event) {
    event.preventDefault(); // prevents page from reloading

    // retrieve values entered into form fields

    const guestName = document.getElementById('guest-name').value;
    const countryCode = document.getElementById('country-code').value;
    const guestPhone = document.getElementById('guest-phone').value;
    const numPax = document.getElementById('num-pax').value;
    const guestDiet = document.getElementById('guest-diet').value;

    // stores into guestdata
    const guestData = {
        guestName: guestName,
        countryCode: countryCode,
        guestPhone: guestPhone,
        numPax: numPax,
        guestDiet: guestDiet
    };

    // Store guest data in localStorage
    let guests = JSON.parse(localStorage.getItem('guests')) || [];
    guests.push(guestData);
    localStorage.setItem('guests', JSON.stringify(guests));

    // Display success message
    alert('Form has been successfully submitted!');

});

