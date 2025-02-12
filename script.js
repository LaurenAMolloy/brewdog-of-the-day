//Retreive form element
const form = document.querySelector('form');
//Retreive card element
const beerCard = document.querySelector('.beer-container');
//Retreive img element
const imgContainer = document.querySelector('.img-container');
//Retreive submit element
const submitBtn = document.querySelector('input[type="submit"]');

//Api url and end point
const BASEURL = 'https://punkapi.online/v3/';
const randomEndPoint = 'beers/random';


//Retrieve loader
const loader = document.querySelector('.loader');
//Retrieve the error message
const errorMessage = document.querySelector('#error-message');
//Retrieve typed haeding container
const typedHeadingEl = document.querySelector('.sentence');
//Retrieve typed haeding container text content
const heading = typedHeadingEl.textContent;

//array to hold different button text
const buttonText = [
  "You're brew-tiful!",
  "Hoppy days ahead!",
  "Ale you need is love.",
  "Don't worry, be hoppy!",
  "Sip happens, stay frothy.",
  "You stout my heart!",
  "Life is brewtiful!",
  "Beer me up, Scotty!",
  "Lager than life!",
  "Hop, sip, and a jump!",
  "Pint-sized perfection!",
  "Malt does a body good!",
  "Foam sweet foam!",
  "IPA lot but it's worth it.",
  "Wheat do you mean there's no beer?",
  "Draft me into your plans.",
  "Keg stand for something!",
  "You had me at ale!",
];

//add event listener to the form
form.addEventListener("submit", getRandomBeer);

//Function to retrieve data
async function getRandomBeer(e) {
    e.preventDefault();
    console.log(e);
    //implement loader
    loader.hidden=false;
    //hide img
    imgContainer.hidden = true;
    //disable button
    submitBtn.setAttribute('disabled', 'true');

    try {
        const response = await fetch(`${BASEURL}${randomEndPoint}`);

        if(!response.ok) {
            throw new Error(`Response status: {$response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const imageUrl = `${BASEURL}images/${data.image}`;
        displayBeer(data, imageUrl);

    } catch (error) {
        console.error("Error fetching beer:", error);

        //Display error message in the UI
        errorMessage.hidden = false;
        errorMessage.textContent = "Failed to fetch beer.\nPlease try again!";
       
    } finally {
        loader.hidden=true;  
    }
};

//function to display the data
function displayBeer(beer, imageUrl) {

    const beerHtml =`
    <div class="img-container">
    <img src="${imageUrl}" alt="${beer.name}">
    </div>
    <h4 class="bold"><span>Name: </span>${beer.name}</h4>
    <p class="bold">${beer.tagline}</p>
    <h4 class="bold"><span>abv: </span>${4.5}%</h4>
    <h4 class= "bold"><span>First brewed: </span>${beer.first_brewed}</h4>
    `
    beerCard.innerHTML = beerHtml;

    //update button text
    randomButtonText(buttonText);
    console.log(heading);

    //update header
    deleteSentence(typedHeadingEl, 100);
    
    //2 second delay to update heading
    setTimeout(() => {
        typeSentence("Well, Do Ya, Punk?", typedHeadingEl);
    }, 2000);
    
    //3 second delay to reactivate submit
    setTimeout(() => {
        submitBtn.removeAttribute('disabled');
    }, 3000);
};

function typeSentence (heading, element, delay=100) {
    //split the letter into array
    //cannot iterate over a string
    //for each letter add an delay before appending to the DOM
    heading.split("").forEach((letter, i) => {
        setTimeout(() => {
            element.append(letter);
        }, i * delay);
    })
};

//Function to delete heading
function deleteSentence (element, delay=100) {
    //split the string into an array
    const letters = element.textContent.split("");
    console.log(letters);
    console.log(element);
    //Use set interval to remove one letter at a time
    //Assign set interval to variable to allow for clearing
    const interval = setInterval(() => {
        if(letters.length > 0) {
            letters.pop();
            element.textContent = letters.join("");
        } else {
            clearInterval(interval);
        }
    }, delay);
}

//Function to grab a random saying for the button
function randomButtonText(arr) {
    console.log("Getting random text")
    //grab a random item from the array
    const randomText = arr[Math.floor(Math.random()*buttonText.length)];
    console.log(randomText);
    //update the button with the random item
    submitBtn.value = randomText;
}
   
typeSentence("Do You Feel Lucky?", typedHeadingEl);




