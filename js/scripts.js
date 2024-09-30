function updateProgressBar(progressBar, value){
    value = Math.round(value*100)/100;
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    progressBar.querySelector(".progress__text").textContent = `${value}%`;
}

function updateGold(amount) {
    document.getElementById("gold-amount").textContent = amount;
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


// Function to add an item to the Inventory
function addItemToInventory(item) {
    const inventoryList = document.getElementById("inventory-list");
    const newItem = document.createElement("li");
    newItem.textContent = item;
    inventoryList.appendChild(newItem);
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

