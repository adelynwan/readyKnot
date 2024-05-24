// make sure DOM content is fully loaded before executing the function
document.addEventListener('DOMContentLoaded', function() {
    const guestList = document.getElementById('guest-list');
    const guests = JSON.parse(localStorage.getItem('guests')) || [];
    const createTablesButton = document.getElementById('create-tables');
    const tablesContainer = document.getElementById('tables-container');
    const perTableInput = document.getElementById('per-table');

    guests.forEach(guest => {
        const listItem = document.createElement('li');
        listItem.textContent = guest.guestName;
        listItem.classList.add('guest-item');
        listItem.draggable = true;
        guestList.appendChild(listItem);
    });

    // Track the original parent and position of the dragged element
    let originalParent = null;
    let originalPosition = null;

    // Event listeners for making guest items draggable
    const guestItems = document.querySelectorAll('.guest-item');
    // add event listeners to each guest item to make them draggable
    guestItems.forEach(function(guestItem) {
        guestItem.setAttribute('draggable', true);

        // event triggered when guest item is dragged
        guestItem.addEventListener('dragstart', function(event) {

            // store the original parent element and position of dragged guest item
            originalParent = event.target.parentNode;
            originalPosition = { x: event.clientX, y: event.clientY };
            // add dragging class to the dragged guest item
            event.target.classList.add('dragging');
        });

        // add dragend event listener to each guest item
        guestItem.addEventListener('dragend', function(event) {
            // remove dragging class when dragging ends
            event.target.classList.remove('dragging');
        });
    });

    // Allow dropping on the tables and anywhere in the document
    document.body.addEventListener('dragover', function(event) {
        event.preventDefault(); // Allow drop
    });

    document.body.addEventListener('drop', function(event) {
        event.preventDefault();
        const draggedElement = document.querySelector('.dragging');
        if (draggedElement) {
            // If dropping on a table, append the dragged element to the table
            if (event.target.classList.contains('table')) {
                event.target.appendChild(draggedElement);
            } else { // Otherwise, append it back to the guest list
                guestList.appendChild(draggedElement);
            }
            draggedElement.classList.remove('dragging'); // Remove dragging class after dropping
        // change table colour based on number of guest 
        const perTable = parseInt(perTableInput.value);
        updateTableColors(perTable);
        }
    });

    // Create tables dynamically
    createTablesButton.addEventListener('click', function() {
        const numTables = document.getElementById('num-tables').value;
        const perTable = parseInt(perTableInput.value);
        tablesContainer.innerHTML = ''; // Clear previous tables

    //  starts loop that wil run numtables over each table that needs to be created
        for (let i = 0; i < numTables; i++) {
            const table = document.createElement('div');
            // assigning css class 'table' to this element
            table.classList.add('table');
            table.textContent = `Table ${i + 1}`;
            // append to tables container
            tablesContainer.appendChild(table);

            // Allow dragging onto the tables
            table.addEventListener('dragover', function(event) {
                event.preventDefault(); // Allow drop
            });

            // adds drop function on each table
            table.addEventListener('drop', function(event) {
                event.preventDefault();
                const draggedElement = document.querySelector('.dragging');
                if (originalParent !== this && draggedElement) {
                    this.appendChild(draggedElement);
                    draggedElement.classList.remove('dragging'); // Remove dragging class after dropping

                    // Change table color based on the number of guests
                    updateTableColors(perTable);
                }
            });
        }
    });


    // listen for changes to the per-table input
    perTableInput.addEventListener('input', function() {
        const perTable = parseInt(this.value);
        updateTableColors(perTable);
    });

    function updateTableColors(perTable) {
        const allTables = document.querySelectorAll('.table');
        allTables.forEach(function(table) {
            const numElements = table.querySelectorAll('.guest-item').length;
            if (numElements = perTable) {
                table.style.backgroundColor = 'rgba(144, 238, 144, 0.7)';
            } else if (numElements > perTable ) {
                table.style.backgroundColor ='rgba(255, 128, 128, 0.7)';
            } else {
                table.style.backgroundColor = ''; // Reset the background color if fewer than perTable elements
            }

        });
    }
});
