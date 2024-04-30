import React from "react";

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="four wide column">
      <h3 className="ui dividing header">Categories</h3>

      <div className="ui selection animated list category items">
        {/*<--category item template -->*/}
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              className={`category item ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCategory(category.id);
              }}
            >
              <div className="content">
                <div className="header">{category.name}</div>
              </div>
            </div>
          );
        })}
        {/*<--end category item template -->*/}
      </div>
    </div>
  );
};

export default Categories;
