import { useState, useEffect } from "react";
import './App.css';
import SearchBar from "./components/SearchBar";
import RecipeNeeds from "./components/RecipeNeeds";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";




function App() {
const [isloading, setIsLoading] = useState(false);
const [query, setQuery] = useState("");
const [recipes, setRecipes] = useState([]);

// recipe search function

const searchRecipes = async () => {
  setIsLoading(true);
  const url = apiUrl + query;
  const res = await fetch(url);
  const data = await res.json();
console.log (data);

setRecipes(data.meals); setIsLoading(false);
};

useEffect(() => {
  searchRecipes();
}, []);


const handleSubmit = event => {
  event.preventDefault()
  searchRecipes()
};

  return (
    <div className="container">
      <h2> Your Number 1 Meal App</h2>

<SearchBar
handleSubmit={handleSubmit}
value={query}
onChange={(event) => setQuery(event.target.value)}
isLoading={isloading}

/>

      <div className="recipes">
        {recipes
        ? recipes.map((recipe) => (
   <RecipeNeeds key={recipe.idMeal} recipe={recipe} />
          
          ))
        : "No Recipes!"}
        </div> 
      
    </div>
  );
}

export default App;
