import { useCallback, useEffect, useState } from "react";
import { Beer } from "../../../types";
import {
  clearDataInIndexedDB,
  getDataFromIndexedDB,
  removeItemsDataInIndexedDB,
  storeDataInIndexedDB,
} from "../../../indexedDB/indexedDB";

const selectedBreweriesToAdd = new Set<Beer>();
const selectedBreweriesToRemove = new Set<Beer>();

export function useFavouriteBreweries() {
  const [favouriteBreweries, setFavouriteBreweries] = useState<Array<Beer>>([]);
  const [breweriesToAddSize, setBreweriesToAddSize] = useState(
    selectedBreweriesToAdd.size
  );
  const [breweriesToRemoveSize, setBreweriesToRemoveSize] = useState(
    selectedBreweriesToRemove.size
  );

  const toggleSelectedBreweryToAdd = useCallback((beer: Beer) => {
    if (!selectedBreweriesToAdd.has(beer)) {
      selectedBreweriesToAdd.add(beer);
    } else {
      selectedBreweriesToAdd.delete(beer);
    }

    setBreweriesToAddSize(selectedBreweriesToAdd.size);
  }, []);

  const toggleSelectedBreweryToRemove = useCallback((beer: Beer) => {
    if (!selectedBreweriesToRemove.has(beer)) {
      selectedBreweriesToRemove.add(beer);
    } else {
      selectedBreweriesToRemove.delete(beer);
    }

    setBreweriesToRemoveSize(selectedBreweriesToAdd.size);
  }, []);

  const saveFavouriteBreweries = useCallback(() => {
    const mergedBeers = new Set([
      ...favouriteBreweries,
      ...Array.from(selectedBreweriesToAdd),
    ]);
    const dataToStore = Array.from(mergedBeers);

    storeDataInIndexedDB<Beer>(dataToStore);
    setFavouriteBreweries(dataToStore);
  }, [favouriteBreweries]);

  const removeSelectedBreweries = useCallback(() => {
    setFavouriteBreweries((prev) =>
      prev.filter((prevBrewery) => !selectedBreweriesToRemove.has(prevBrewery))
    );
    removeItemsDataInIndexedDB(Array.from(selectedBreweriesToRemove));
    selectedBreweriesToRemove.clear();
    setBreweriesToRemoveSize(selectedBreweriesToRemove.size);
  }, []);

  const clearFavouriteBreweries = useCallback(() => {
    clearDataInIndexedDB();
    setFavouriteBreweries([]);
  }, []);

  const getIsFavouriteBeer = useCallback(
    (beer: Beer) => {
      return (
        favouriteBreweries.findIndex(
          (beerToCheck) => beerToCheck.id === beer.id
        ) > -1
      );
    },
    [favouriteBreweries]
  );

  useEffect(() => {
    const fetchFavouriteData = async () => {
      const data = await getDataFromIndexedDB<Array<Beer>>();
      setFavouriteBreweries(data);
    };

    fetchFavouriteData();
  }, []);

  return {
    favouriteBreweries,
    isAddToFavouriteDisabled: breweriesToAddSize < 1,
    toggleSelectedBreweryToAdd,
    isRemoveSelectedItemsDisabled: breweriesToRemoveSize < 1,
    toggleSelectedBreweryToRemove,
    saveFavouriteBreweries,
    clearFavouriteBreweries,
    removeSelectedBreweries,
    getIsFavouriteBeer,
  };
}
