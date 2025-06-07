import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeList() {
    const { category } = useParams();
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    const [forceRender, setForceRender] = useState(false);

    const toggleFavorite = (id) => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.includes(id)) {
            favorites = favorites.filter(favId => favId !== id);
        } else {
            favorites.push(id);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setForceRender(!forceRender);
    };

    const isFavorite = (id) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(id);
    };

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

    const addToShoppingList = (ingredients) => {
        let list = JSON.parse(localStorage.getItem('shoppingList')) || [];
        const newItems = ingredients.map(item => ({ name: item, checked: false }));
        list = list.concat(newItems);
        localStorage.setItem('shoppingList', JSON.stringify(list));
        alert('Dodano do listy zakupów!');
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
                        <button onClick={() => toggleFavorite(recipe._id)}>
                            {isFavorite(recipe._id) ? '💚' : '🤍'}
                        </button>
                        <button onClick={() => addToShoppingList(recipe.ingredients)}>🛒 Dodaj do zakupów</button>
                        <button onClick={() => editRecipe(recipe._id)}>✏️ Edytuj</button>
                        <button onClick={() => deleteRecipe(recipe._id)}>🗑️ Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeList;
