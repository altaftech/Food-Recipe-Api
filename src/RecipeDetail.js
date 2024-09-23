import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { label } = useParams(); // Get the recipe label from the URL
  const [recipe, setRecipe] = useState(null);

  const APP_ID = 'fe29d5c5';
  const APP_KEY = 'fe7130e3b424fd89b502d30c403518bf';

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://api.edamam.com/search?q=${label}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        setRecipe(response.data.hits[0].recipe); // Assuming the first hit is the recipe
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [label]); // Fetch recipe data when label changes

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <>
    <div className="recipe-detail-container">
      <h1 className="text-center my-4" style={{fontWeight:500,fontSize:'30px'}}>{recipe.label}</h1>

      <div className="recipe-detail-card" style={{background:'white'}}>
        <img src={recipe.image} alt={recipe.label} className="recipe-image" />
        <div className="recipe-info">
          <p>
            <strong>Diet Labels: </strong> {recipe.dietLabels.join(', ')}
          </p>
          <p>
            <strong>Health Labels: </strong> {recipe.healthLabels.join(', ')}
          </p>

          <div className="nutrient-info">
            <p><strong>Calories: </strong>{Math.round(recipe.calories)} kcal</p>
            <p><strong>Protein: </strong>{Math.round(recipe.totalNutrients.PROCNT.quantity)} g</p>
            <p><strong>Fat: </strong>{Math.round(recipe.totalNutrients.FAT.quantity)} g</p>
            <p><strong>Carbs: </strong>{Math.round(recipe.totalNutrients.CHOCDF.quantity)} g</p>
          </div>

          <div className="serving-info">
            <p><strong>Servings: </strong>{recipe.yield}</p>
            <p><strong>Cholesterol: </strong>{Math.round(recipe.totalNutrients.CHOLE.quantity)} mg</p>
            <p><strong>Sodium: </strong>{Math.round(recipe.totalNutrients.NA.quantity)} mg</p>
            <p><strong>Calcium: </strong>{Math.round(recipe.totalNutrients.CA.quantity)} mg</p>
            <p><strong>Magnesium: </strong>{Math.round(recipe.totalNutrients.MG.quantity)} mg</p>
            <p><strong>Iron: </strong>{Math.round(recipe.totalNutrients.FE.quantity)} mg</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RecipeDetail;
