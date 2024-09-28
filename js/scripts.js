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