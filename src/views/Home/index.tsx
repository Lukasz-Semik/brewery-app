import { Button } from "@mui/material";
import { BreweriesList } from "./_components/BreweriesList";
import { useBreweries } from "./_hooks/useBreweries";
import { useFavouriteBreweries } from "./_hooks/useFavouriteBreweries";

const Home = () => {
  const { breweries } = useBreweries();

  const {
    isAddToFavouriteDisabled,
    toggleSelectedBreweryToAdd,
    saveFavouriteBreweries,
    favouriteBreweries,
    clearFavouriteBreweries,
    isRemoveSelectedItemsDisabled,
    toggleSelectedBreweryToRemove,
    removeSelectedBreweries,
    getIsFavouriteBeer,
  } = useFavouriteBreweries();

  return (
    <article>
      <section>
        <main>
          <BreweriesList
            name="fetched_data"
            breweries={breweries}
            title="Today's recommendations"
            onItemPress={toggleSelectedBreweryToAdd}
            getIsBeerDisabled={getIsFavouriteBeer}
            buttonsGroup={
              <Button
                onClick={saveFavouriteBreweries}
                variant="contained"
                disabled={isAddToFavouriteDisabled}
              >
                Add to favourites
              </Button>
            }
          />

          <BreweriesList
            name="favourite_data"
            breweries={favouriteBreweries}
            title="Favourite breweries"
            onItemPress={toggleSelectedBreweryToRemove}
            buttonsGroup={
              <>
                <Button
                  variant="contained"
                  size="small"
                  disabled={isRemoveSelectedItemsDisabled}
                  onClick={removeSelectedBreweries}
                >
                  Remove Selected
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  onClick={clearFavouriteBreweries}
                >
                  Remove all items
                </Button>
              </>
            }
          />
        </main>
      </section>
    </article>
  );
};

export default Home;
