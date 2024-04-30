import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Games from "../components/Games";
import Categories from "../components/Categories";
import { API_URL } from "../constants";

const Home = () => {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [filteredGames, setFilteredGames] = useState(games);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}games`)
      .then((response) => {
        if (response.status === 200) {
          setGames(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}categories`)
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const filteredGames = games.filter((game) => {
      return game.categoryIds?.includes(selectedCategory);
    });
    const filteredGamesWithSearch = filteredGames.filter((item) => {
      // Convert the property value to lowercase for case-insensitive search
      const propertyValue = item.name.toLowerCase();

      // Return true if the property value includes the search term
      return propertyValue.includes(searchTerm.toLowerCase());
    });
    setFilteredGames(filteredGamesWithSearch);
  }, [selectedCategory, games, searchTerm]);

  return (
    <div>
      <div className="casino">
        <Header setSearchTerm={setSearchTerm} />
        <div className="ui grid">
          <Games games={filteredGames} />
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
