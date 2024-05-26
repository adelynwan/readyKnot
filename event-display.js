// for the event-details html

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve event data from localStorage
    const eventData = JSON.parse(localStorage.getItem('eventData'));
    // check if eventData is avail, if yes, display event data
    if (eventData) {
        document.getElementById('display-event-name').textContent = eventData.name;
        document.getElementById('display-event-date').textContent = eventData.date;
        document.getElementById('display-event-time').textContent = eventData.time;
        document.getElementById('display-event-venue').textContent = eventData.venue;
    }
});

// handling submisison of event form for event html
// addeventlistener sets up function that will be called whenever a specific event is delivered to target

document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault(); // prevents default submission behaviour

    // retrieves form fields

    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventTime = document.getElementById('event-time').value;
    const eventVenue = document.getElementById('event-venue').value;

    // creating object to store event data
    const eventData = {
        name: eventName,
        date: eventDate,
        time: eventTime,
        venue: eventVenue  
    };

    // Store event data in localStorage after converting into json
    localStorage.setItem('eventData', JSON.stringify(eventData));

    // Display success message
    alert('Event has been created successfully! Redirecting you to your event page, you may now share this event page and registration form with your guests!');

    // Redirect to event-details.html after 2 seconds
    setTimeout(function() {
        window.open('event-details.html', '_blank');
    }, 1000);
});

