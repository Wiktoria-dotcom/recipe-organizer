import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FavoriteRecipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        axios.get(`http://localhost:5000/recipes`)
            .then((res) => {
                const favRecipes = res.data.filter(r => favorites.includes(r._id));
                setRecipes(favRecipes);
            });
    }, []);

    return (
        <div>
            <h2>Ulubione Przepisy 💚</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <h3>{recipe.name}</h3>
                        <p><b>Składniki:</b> {recipe.ingredients.join(', ')}</p>
                        <p><b>Instrukcja:</b> {recipe.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FavoriteRecipes;
