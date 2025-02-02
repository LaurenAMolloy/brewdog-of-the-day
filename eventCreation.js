import { fetchAndDisplay } from "./displayData.js";
import { handleClickOpenModal } from "./handleModal.js";
import { form } from "./elements.js";

export function attachGetRecipeEvent () {
    const buttons = document.querySelectorAll(".getRecipeBtn");
    //Loop through the nodelist to add an eventlistener to open the modal
    buttons.forEach((button) => {
        button.addEventListener('click', handleClickOpenModal);
    });
}

//create another async function to handlesubmit event
export async function handleSubmit(e){
    //prevent the deafult on the form
    e.preventDefault();
    //console.log(e.currentTarget.query.value);
    //console.log(e.currentTarget.mealType.value);
    
    //current target is the form input
    const input = e.currentTarget;
    //Grab the query from the form input
    //Use trim to remove whitespace
    const query = input.query.value.trim();
    const mealType = input.mealType.value.trim();
    console.log(mealType);

    //if no query alert user
    if(!query && !mealType) {
        alert('Please enter a search term');
        return;
    }

    fetchAndDisplay(query, mealType);
}


//Function to handle click
export function handleClickClear() {
    //reset the form
    form.reset();
    //Call fetch and display based on default value chicken
    fetchAndDisplay("", "");
}


