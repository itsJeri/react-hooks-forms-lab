import { waitForDomChange } from "@testing-library/react";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function ItemForm({ onItemFormSubmit }) {
  const [itemName, setitemName] = useState('')
  const [itemCategory, setitemCategory] = useState('Produce')

  function handleSearch(event) {
    setitemName(event.target.value)
  }

  function handleTag(event) {
    setitemCategory(event.target.value)
  }

  function createNewItem(event) {
    event.preventDefault()
    function capitalize() {
      const split = itemName.split(' ');
      for (let i=0; i<split.length; i++) {
        split[i] = split[i][0].toUpperCase() + split[i].slice(1);
      }
      return split.join(' ');
    }
    
    const newItem = {
      id: uuid(),
      name: capitalize(),
      category: itemCategory
    }
    onItemFormSubmit(newItem)
  }

  return (
    <form className="NewItem" onSubmit={createNewItem}>
      <label>
        Name:
        <input type="text" name="name" onChange={handleSearch} value={itemName} />
      </label>

      <label>
        Category:
        <select name="category" onChange={handleTag} value={itemCategory}>
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
