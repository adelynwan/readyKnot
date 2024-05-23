


    document.addEventListener('DOMContentLoaded', function() {
        const guestList = document.getElementById('guest-list');
        const guests = JSON.parse(localStorage.getItem('guests')) || [];
        const createTablesButton = document.getElementById('create-tables');
        const tablesContainer = document.getElementById('tables-container');
    
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
        guestItems.forEach(function(guestItem) {
            guestItem.setAttribute('draggable', true);
    
            guestItem.addEventListener('dragstart', function(event) {
                originalParent = event.target.parentNode;
                originalPosition = { x: event.clientX, y: event.clientY };
                event.target.classList.add('dragging');
            });
    
            guestItem.addEventListener('dragend', function(event) {
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
            }
        });
    
        // Create tables dynamically
        createTablesButton.addEventListener('click', function() {
            tablesContainer.innerHTML = ''; // Clear previous tables
            const numTables = document.getElementById('num-tables').value;
            for (let i = 0; i < numTables; i++) {
                const table = document.createElement('div');
                table.classList.add('table');
                table.textContent = `Table ${i + 1}`;
                tablesContainer.appendChild(table);
            }
        });
    });

    // Create tables based on user input
    createTablesButton.addEventListener('click', function() {
        const numTables = document.getElementById('num-tables').value;
        tablesContainer.innerHTML = ''; // Clear previous tables

        for (let i = 1; i <= numTables; i++) {
            const table = document.createElement('div');
            table.classList.add('table');
            table.textContent = `Table ${i}`;
            table.setAttribute('draggable', true);
            tablesContainer.appendChild(table);

            // Allow dropping on the tables
            table.addEventListener('dragover', function(event) {
                event.preventDefault(); // Allow drop
            });

            table.addEventListener('drop', function(event) {
                event.preventDefault();
                const draggedElement = document.querySelector('.dragging');
                if (originalParent !== this && draggedElement) {
                    this.appendChild(draggedElement);
                    draggedElement.classList.remove('dragging'); // Remove dragging class after dropping
                    
                    // Loop through all tables to check the number of elements
                    const allTables = document.querySelectorAll('.table');
                    allTables.forEach(function(table) {
                        const numElements = table.querySelectorAll('.guest-item').length;
                        if (numElements >= 10) {
                            table.style.backgroundColor = 'lightblue';
                        } else {
                            table.style.backgroundColor = ''; // Reset the background color if fewer than 10 elements
                        }
                    });
                }
            });
        }
    });

