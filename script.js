import { form, clearAllButton, modal } from "./elements.js";
import { fetchAndDisplay } from "./displayData.js";
import { handleSubmit, handleClickClear } from "./eventCreation.js";


//Add event listener to handle the submit event
form.addEventListener('submit', handleSubmit);
//Add the event listener to handle the clear all event
clearAllButton.addEventListener("click", handleClickClear);
//Add an event listener to close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

//call the function that gets the recipes
fetchAndDisplay("", "");

