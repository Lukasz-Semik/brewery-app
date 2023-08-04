import { useEffect, useState } from "react";
import { Beer } from "../../../types";
import { fetchData } from "../utils";

export function useBreweries() {
  const [breweries, setBreweries] = useState<Array<Beer>>([]);

  useEffect(() => {
    const fetchBreweries = async () => {
      const data = await fetchData();
      if (data) {
        setBreweries(data);
      }
    };

    fetchBreweries();
  }, []);

  return {
    breweries,
  };
}
