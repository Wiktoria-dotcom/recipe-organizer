import React, { useState, useEffect } from 'react';

function ShoppingList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('shoppingList')) || [];
        setItems(list);
    }, []);

    const toggleItem = (index) => {
        const newItems = [...items];
        newItems[index].checked = !newItems[index].checked;
        setItems(newItems);
        localStorage.setItem('shoppingList', JSON.stringify(newItems));
    };


    const clearList = () => {
        localStorage.removeItem('shoppingList');
        setItems([]);
    };

    return (
        <div>
            <h2>Lista Zakupów 🛒</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index} style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                        <input type="checkbox" checked={item.checked} onChange={() => toggleItem(index)} />
                        {item.name}
                    </li>

                ))}
            </ul>
            <button onClick={clearList}>Wyczyść listę</button>
        </div>
    );
}

export default ShoppingList;
