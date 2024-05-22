document.addEventListener('DOMContentLoaded', function() {
    // Retrieve event data from localStorage
    const eventData = JSON.parse(localStorage.getItem('eventData'));

    if (eventData) {
        document.getElementById('display-event-name').textContent = eventData.name;
        document.getElementById('display-event-date').textContent = eventData.date;
        document.getElementById('display-event-time').textContent = eventData.time;
        document.getElementById('display-event-venue').textContent = eventData.venue;
    }
});

document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventTime = document.getElementById('event-time').value;
    const eventVenue = document.getElementById('event-venue').value;

    const eventData = {
        name: eventName,
        date: eventDate,
        time: eventTime,
        venue: eventVenue  
    };

    // Store event data in localStorage
    localStorage.setItem('eventData', JSON.stringify(eventData));

    // Display success message
    alert('Event has been created successfully! Redirecting you to your event page, you may now share this event page and registration form with your guests!');

    // Redirect to event-details.html after 2 seconds
    setTimeout(function() {
        window.open('event-details.html', '_blank');
    }, 2000);
});

