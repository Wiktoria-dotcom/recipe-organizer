import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function RecipeForm() {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [category, setCategory] = useState('śniadanie');

    const { id } = useParams(); // pobierz id z URL
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/recipes`)
                .then((res) => {
                    const recipe = res.data.find(r => r._id === id);
                    if (recipe) {
                        setName(recipe.name);
                        setIngredients(recipe.ingredients.join(', '));
                        setInstructions(recipe.instructions);
                        setCategory(recipe.category);
                    }
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipeData = {
            name,
            ingredients: ingredients.split(',').map(item => item.trim()),
            instructions,
            category,
        };

        if (id) {
            // Edycja przepisu
            axios.put(`http://localhost:5000/recipes/${id}`, recipeData)
                .then(() => {
                    alert('Przepis zaktualizowany!');
                    navigate(`/category/${category}`);
                });
        } else {
            // Nowy przepis
            axios.post('http://localhost:5000/recipes', recipeData)
                .then(() => {
                    alert('Przepis dodany!');
                    navigate(`/category/${category}`);
                });
        }
    };

    return (
        <div>
            <h2>{id ? 'Edytuj Przepis' : 'Dodaj Przepis'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nazwa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br />
                <textarea
                    placeholder="Składniki (oddzielone przecinkami)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                /><br />
                <textarea
                    placeholder="Instrukcja"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                /><br />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="śniadanie">śniadanie</option>
                    <option value="obiad">obiad</option>
                    <option value="kolacja">kolacja</option>
                </select><br />
                <button type="submit">{id ? 'Zapisz Zmiany' : 'Dodaj'}</button>
            </form>
        </div>
    );
}

export default RecipeForm;
