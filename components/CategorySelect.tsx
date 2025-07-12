import React from 'react';

interface Props {
  selected: string[];
  onSelect: (selected: string[]) => void;
}

const categories = ['Politics', 'Technology', 'Sports', 'Health', 'Entertainment', 'Science'];

const CategorySelect: React.FC<Props> = ({ selected, onSelect }) => {
  // ✅ Allow only one category to be selected
  const toggle = (category: string) => {
    let updated: string[];

    if (selected.includes(category)) {
      updated = []; // Deselect if clicked again
    } else {
      updated = [category]; // Replace with the new selection
    }

    onSelect(updated);
  };

  return (
    <div className="category-group">
      {/* 🗂️ Category selection (single only) */}
      <label>Select your primary news category of interest:</label>
      <div className="category-list">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${selected.includes(cat) ? 'selected' : ''}`}
            type="button"
            onClick={() => toggle(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
