function updateProgressBar(progressBar, value){
    value = Math.round(value*100)/100;
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    progressBar.querySelector(".progress__text").textContent = `${value}%`;
}

// Functions for opening and closing the options menu
document.addEventListener('DOMContentLoaded', function() {
    // Attach the openOptions function to the Options button
    document.getElementById("options-button").querySelector('button').onclick = openOptions;

    // Attach the closeOptions function to the close button
    document.querySelector('.close').onclick = closeOptions;

    // Function to open the options modal
    function openOptions() {
        document.getElementById("options-modal").style.display = "block";
    }

    // Function to close the options modal
    function closeOptions() {
        document.getElementById("options-modal").style.display = "none";
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById("options-modal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});


// Define the inventory as an empty object
let inventory = {};

// Function to add an item to the inventory
function addItemToInventory(itemName) {
    if (inventory[itemName]) {
        inventory[itemName]++; // If the item already exists, increase the quantity
    } else {
        inventory[itemName] = 1; // If the item doesn't exist, add it with a quantity of 1
    }
    updateInventoryUI(); // Update the displayed inventory
}

// Function to update the inventory display in the UI
function updateInventoryUI() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = ''; // Clear the current display

    // Loop through the inventory object and display each item
    for (const item in inventory) {
        if (inventory.hasOwnProperty(item)) {
            const listItem = document.createElement('li');
            const quantity = inventory[item];
            // Display "Item xN" if quantity is greater than 1
            listItem.textContent = (quantity > 1) ? `${item} x${quantity}` : item;
            inventoryList.appendChild(listItem);
        }
    }
}

// Function to add an event to the Event Log
function addEventToLog(event) {
    const eventLogList = document.getElementById("event-log-list");
    const newEvent = document.createElement("li");
    newEvent.textContent = event;
    eventLogList.appendChild(newEvent);
}

// Function to add a quest to the Quest Tracker
function addQuest(quest) {
    const questList = document.getElementById("quest-list");
    const newQuest = document.createElement("li");
    newQuest.textContent = quest;
    questList.appendChild(newQuest);
}

// Optional: Function to clear a list (e.g., clearing the inventory)
function clearList(listId) {
    const list = document.getElementById(listId);
    list.innerHTML = ''; // Clears all content from the list
}

//Function to update gold
function updateGold(amount) {
    document.getElementById("gold-amount").textContent = amount;
}

// Function to set the gold amount to a specific value
function setGold(amount) {
    const goldElement = document.getElementById("gold-amount");
    goldElement.textContent = amount; // Update the displayed amount
}

// Function to add gold
function addGold(amount) {
    const goldElement = document.getElementById("gold-amount");
    const currentGold = parseInt(goldElement.textContent); // Convert current gold to an integer
    goldElement.textContent = currentGold + amount; // Add the new amount to the current value
}

// Function to subtract gold
function subtractGold(amount) {
    const goldElement = document.getElementById("gold-amount");
    const currentGold = parseInt(goldElement.textContent); // Convert current gold to an integer
    goldElement.textContent = Math.max(0, currentGold - amount); // Subtract but ensure gold doesn’t go below 0
}

// Function to check how much total storage is used in cache (can measure values beforehand to calculate the difference)
function getLocalStorageSize() {
    let totalSize = 0;

    // Iterate through all keys in localStorage
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            // Get the length of each stored item and sum them
            totalSize += (localStorage[key].length * 2); // Multiply by 2 because `localStorage` stores strings in UTF-16
        }
    }

    console.log(`Total localStorage size: ${(totalSize / 1024).toFixed(2)} KB`);
    return totalSize;
}

// Save progress function (same as before)
function saveProgress() {
    const gameData = {
        gold: document.getElementById("gold-amount").textContent,
        inventory: inventoryArray,  // Assuming inventoryArray is the array holding inventory data
        eventLog: eventLogArray,    // Assuming eventLogArray holds events
        quests: questList,          // Assuming questList holds quest data
        playerStats: playerStats,   // Assuming playerStats is an object with player stats
    };

    localStorage.setItem('gameData', JSON.stringify(gameData)); // Save the game data
    alert("Progress Saved!");
}

// Function to confirm delete with a pop-up warning
function confirmDelete() {
    document.getElementById("confirm-delete-modal").style.display = "block"; // Show confirmation modal
}

// Function to delete progress
function deleteProgress() {
    localStorage.removeItem('gameData');  // Clear saved progress
    alert("Progress Deleted!");
    closeConfirmDelete(); // Close the confirmation modal
}

// Function to close the confirmation delete modal
function closeConfirmDelete() {
    document.getElementById("confirm-delete-modal").style.display = "none";
}

// Load progress function (same as before)
function loadProgress() {
    const savedGameData = localStorage.getItem('gameData');

    if (savedGameData) {
        const gameData = JSON.parse(savedGameData);
        document.getElementById("gold-amount").textContent = gameData.gold;
        inventoryArray = gameData.inventory || [];
        eventLogArray = gameData.eventLog || [];
        questList = gameData.quests || [];
        playerStats = gameData.playerStats || { strength: 0, agility: 0, intelligence: 0 };

        updateInventoryUI();
        updateEventLogUI();
        updateQuestUI();

        alert("Progress Loaded!");
    }
}

// Optional: Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("options-modal");
    const confirmModal = document.getElementById("confirm-delete-modal");
    if (event.target === modal) {
        closeOptions();
    }
    if (event.target === confirmModal) {
        closeConfirmDelete();
    }
}




document.addEventListener('DOMContentLoaded', function() {
    loadProgress(); // Automatically load saved data when the page is loaded
});




let eventLogArray = []; // Array to store event messages

// Function to add an event to the log
function addEventToLog(eventMessage) {
    // Add the new event to the end of the array
    eventLogArray.push(eventMessage);

    // Limit the number of events (optional)
    if (eventLogArray.length > 5) {
        eventLogArray.shift(); // Remove the oldest event (first in the array)
    }

    // Update the UI to reflect the new event log
    updateEventLogUI();
}

// Function to update the event log display in the UI
function updateEventLogUI() {
    const eventLogList = document.getElementById('event-log-list');
    eventLogList.innerHTML = '';  // Clear the current event log display

    // Loop through the event log array and display each event
    eventLogArray.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = event;
        eventLogList.appendChild(listItem);

        // Use a short timeout to add the 'visible' class for the transition effect
        setTimeout(() => {
            listItem.classList.add('visible');
        }, 100); // Delay slightly to trigger the transition
    });
}





