import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeList() {
    const { category } = useParams();
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        axios.get(`http://localhost:5000/recipes/${category}`)
            .then((res) => setRecipes(res.data));
    }, [category]);

    const deleteRecipe = (id) => {
        axios.delete(`http://localhost:5000/recipes/${id}`)
            .then(() => {
                alert('Przepis usunięty!');
                axios.get(`http://localhost:5000/recipes/${category}`)
                    .then((res) => setRecipes(res.data));
            });
    };

    const editRecipe = (id) => {
        navigate(`/edit/${id}`);
    };


    return (
        <div>
            <h2>Przepisy: {category}</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <h3>{recipe.name}</h3>
                        <p><b>Składniki:</b> {recipe.ingredients.join(', ')}</p>
                        <p><b>Instrukcja:</b> {recipe.instructions}</p>
                        <button onClick={() => editRecipe(recipe._id)}>✏️ Edytuj</button>
                        <button onClick={() => deleteRecipe(recipe._id)}>🗑️ Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeList;
