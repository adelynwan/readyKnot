// to display guest details

document.addEventListener('DOMContentLoaded', function() {
    const guestTableBody = document.querySelector('#guest-table tbody');
    const guests = JSON.parse(localStorage.getItem('guests')) || [];

    guests.forEach(guest => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${guest.guestName}</td>
            <td>${guest.countryCode}</td>
            <td>${guest.guestPhone}</td>
            <td>${guest.numPax}</td>
            <td>${guest.guestDiet}</td>
        `;
        
        // Add event listener for click to change color
        row.addEventListener('click', function() {
            row.classList.toggle('attending');
        });

        // Add event listener for double click to undo color
        row.addEventListener('dblclick', function() {
            row.classList.remove('attending');
        });

        guestTableBody.appendChild(row);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById('display-guest-name').textContent = urlParams.get('guestName');
    document.getElementById('display-country-code').textContent = urlParams.get('countryCode');
    document.getElementById('display-guest-phone').textContent = urlParams.get('guestPhone');
    document.getElementById('display-num-pax').textContent = urlParams.get('numPax');
    document.getElementById('display-guest-diet').textConent = urlParams.get('guestDiet')
});

document.getElementById('guest-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const guestName = document.getElementById('guest-name').value;
    const countryCode = document.getElementById('country-code').value;
    const guestPhone = document.getElementById('guest-phone').value;
    const numPax = document.getElementById('num-pax').value;
    const guestDiet = document.getElementById('guest-diet').value;

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

