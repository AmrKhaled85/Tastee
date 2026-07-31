import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tastee_favorites');
      return saved ? JSON.parse(saved) : ['rest-1', 'rest-4']; // Default favorite rest-1 and rest-4
    } catch (e) {
      return ['rest-1', 'rest-4'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tastee_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
};
