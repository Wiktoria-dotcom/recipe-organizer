import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import FavoriteRecipes from './components/FavoriteRecipes';
import ShoppingList from './components/ShoppingList';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Organizer Przepisów</h1>
        <nav>
          <Link to="/">Kategorie</Link> | <Link to="/add">Dodaj Przepis</Link> | <Link to="/favorites">Ulubione 💚</Link> | <Link to="/shopping">Zakupy 🛒</Link>


        </nav>
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="/category/:category" element={<RecipeList />} />
          <Route path="/add" element={<RecipeForm />} />
          <Route path="/edit/:id" element={<RecipeForm />} />
          <Route path="/favorites" element={<FavoriteRecipes />} />
          <Route path="/shopping" element={<ShoppingList />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
