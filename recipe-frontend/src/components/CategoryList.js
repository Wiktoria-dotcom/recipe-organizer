import React from 'react';
import { Link } from 'react-router-dom';

const categories = ['śniadanie', 'obiad', 'kolacja'];

function CategoryList() {
    return (
        <div>
            <h2>Kategorie</h2>
            <ul>
                {categories.map((cat) => (
                    <li key={cat}>
                        <Link to={`/category/${cat}`}>{cat}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;
