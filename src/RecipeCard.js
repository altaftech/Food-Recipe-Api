import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="card">
      <img src={recipe.image} className="card-img-top" alt={recipe.label} />
      <div className="card-body">
        <h5 className="card-title">{recipe.label}</h5>
        <p className="card-text">
          <strong>{Math.round(recipe.calories)} Calories</strong><br />
          <strong>{recipe.ingredients.length} Ingredients</strong>
        </p>
      </div>
      <div className="card-footer">
        <Link
          to={`/recipe/${recipe.label}`} // Navigate based on recipe label
          className="btn btn-primary"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
