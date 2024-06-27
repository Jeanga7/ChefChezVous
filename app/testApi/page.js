"use client";
import { useState, useEffect } from "react";

const API_KEY = 'af03a9377f904303a2bd1961d58534ec';
const BASE_URL = 'https://api.spoonacular.com/recipes';
const PAGE_SIZE = 100; // Nombre de résultats par page (maximum autorisé par l'API)

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        let allRecipes = [];
        let offset = 0;
        let totalResults = null;

        while (totalResults === null || offset < totalResults) {
          const response = await fetch(`${BASE_URL}/complexSearch?apiKey=${API_KEY}&number=${PAGE_SIZE}&offset=${offset}`);
          const result = await response.json();
          console.log(result);
          
          allRecipes = [...allRecipes, ...result.results];
          totalResults = result.totalResults; 
          offset += PAGE_SIZE;
        }

        setData(allRecipes);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchAllRecipes();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Page;
