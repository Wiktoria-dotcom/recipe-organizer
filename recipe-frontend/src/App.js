import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

import './App.css';

function App() {
  return (
    <Router>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Organizer Przepisów</h1>
        <nav>
          <Link to="/">Kategorie</Link>  | <Link to="/add">Dodaj Przepis</Link> |

        </nav>
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="/category/:category" element={<RecipeList />} />
          <Route path="/add" element={<RecipeForm />} />
          <Route path="/edit/:id" element={<RecipeForm />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
