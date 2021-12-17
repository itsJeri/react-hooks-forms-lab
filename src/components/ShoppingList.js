import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onItemFormSubmit }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState('');

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setSearchInput(event.target.value)
  }

  const itemsToDisplay = items.filter((item) => {
    const lowerCase = searchInput.toLowerCase()
    const selectedAll = selectedCategory === 'All'
    const searched = searchInput.length > 0

    if (!searched && selectedAll) {
      return true;
    } else if (searched && selectedAll) {
      return item.name.toLowerCase().includes(lowerCase)
    } else if (searched && !selectedAll) {
      return item.name.toLowerCase().includes(lowerCase) && item.category === selectedCategory
    }
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter search={searchInput} onSearchChange={handleSearchChange} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
