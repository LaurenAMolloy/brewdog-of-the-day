//create a variable to store the baseend point API URL
const baseEndPoint = 'https://dummyjson.com/recipes';

//Create an async function that retrieves recipe data from the api
//use try catch for error handling
//Named export
export async function fetchRecipes(query, mealType="") {

    try {
   
       let apiUrl = `${baseEndPoint}`;
   
       //Check if query and mealtype have been selected
       if(query && mealType) {
           apiUrl += `/search?q=${query}&mealType=${mealType}`;

        } else if (query) {
           apiUrl += `/search?q=${query}`;
        //else of only a meal type
        } else if (mealType) {
            mealType === "all" ? apiUrl : apiUrl += `/meal-type/${mealType}`
        }
   
       //Fetch data from API
       const response = await fetch(apiUrl);
       
       if(!response.ok) {
           throw new Error(`Resonse status: ${response.status}`)
       }
       
       //Store response as json format
       const data = await response.json();
       return data.recipes;
       } catch (error) {
       console.log(error.message);
    };
   }
   