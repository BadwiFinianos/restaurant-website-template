import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { getAll as getAllCategories } from '../API/categories';
import { getAll as getAllMeals } from '../API/meals';

import { setDataWithName } from '../utils/helpers';

export default function useMenu({ selectedCtegoryID }) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [allMeals, setAllMeals] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    setMeals(allMeals?.filter((ml) => ml.category?._id === selectedCtegoryID));
    setCategory(categories.find((cat) => cat._id === selectedCtegoryID));
  }, [allMeals, categories, selectedCtegoryID]);

  const { isLoading: isLoadingCategories, isError: isErrorCategories } = useQuery(
    'getAllCategories',
    getAllCategories,
    {
      enabled: true,
      onSuccess(response) {
        setDataWithName(response, setCategories);
      },
    }
  );

  const { isLoading: isLoadingMeals, isError: isErrorMeals } = useQuery('getAllMeals', getAllMeals, {
    enabled: true,
    onSuccess(response) {
      const allAvailableMeals = response
        ?.filter(({ isAvailable }) => isAvailable)
        .map(({ addons, sizes, ...mealProps }) => ({
          ...mealProps,
          sizes: sizes?.filter(({ isAvailable }) => isAvailable) || [],
          addons: addons?.filter(({ isAvailable }) => isAvailable) || [],
        }));
      setDataWithName(allAvailableMeals, setAllMeals);
    },
  });

  const isError = isErrorCategories || isErrorMeals;

  return { isLoadingCategories, isLoadingMeals, categories, meals, category, isError };
}
