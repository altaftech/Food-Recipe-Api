import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const APP_ID = 'fe29d5c5';
  const APP_KEY = 'fe7130e3b424fd89b502d30c403518bf';

  const defaultQuery = 'all'; // Set your default query here

  const getRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&type=public&q=${query || defaultQuery}`
      );
      // If the response has hits, set the recipes; otherwise, set default recipes.
      setRecipes(response.data.hits.length > 0 ? response.data.hits : []);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getRecipes();
  };

  useEffect(() => {
    // Load default recipes on initial render
    getRecipes();
  }, []);

  return (
    <Router>
      <nav className="navbar bg-dark" style={{backgroundColor: "#e3f2fd;"}}>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Link to="/" style={{display:'flex', color:'white'}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="60px" fill="#F28500">
              <path d="M300-96v-389q-47-12-77.5-50.1T192-624v-240h72v240h36v-240h72v240h36v-240h72v240q0 50.8-30.5 88.9Q419-497 372-485v389h-72Zm396 0v-336H576v-240q0-79.68 56.16-135.84T768-864v768h-72Z"/>
            </svg>
            <span style={{fontSize:'30px'}}>Recipe</span>
          </Link>&nbsp;&nbsp;&nbsp;
          <Link className="nav-link active" style={{display:'flex', color:'white', fontSize:'22px'}} to="/">Home</Link>
        </div>
      </nav>
      <div className="app-container">
        <form className="search-form d-flex justify-content-center mb-4" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a recipe"
            className="form-control me-2"
            style={{ width: '300px' }}
          />
          <button type="submit" className="btn btn-success">
            Search
          </button>
        </form>

        <Routes>
          <Route
            path="/"
            element={
              <div className="grid-container">
                {recipes.length > 0 ? (
                  recipes.map((recipeData, index) => (
                    <RecipeCard key={index} recipe={recipeData.recipe} />
                  ))
                ) : (
                  <p className="text-center">No recipes found. Try searching for something!</p>
                )}
              </div>
            }
          />
          <Route path="/recipe/:label" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
