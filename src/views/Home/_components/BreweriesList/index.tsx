import { Beer } from "../../../../types";
import { Paper } from "@mui/material";
import styles from "./BreweriesList.module.css";
import { BreweriesListItem } from "../BreweriesListItem";

type BreweriesListProps = {
  breweries: Array<Beer>;
  title: string;
  buttonsGroup: React.ReactNode;
  onItemPress: (beer: Beer) => void;
  getIsBeerDisabled?: (beer: Beer) => boolean;
  name: string;
};

export function BreweriesList({
  breweries,
  buttonsGroup,
  title,
  onItemPress,
  getIsBeerDisabled,
  name,
}: BreweriesListProps) {
  return (
    <Paper>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <h3>{title}</h3>
          <div className={styles.buttonsWrapper}>{buttonsGroup}</div>
        </div>
        <ul className={styles.list}>
          {breweries.map((beer) => (
            <BreweriesListItem
              key={`${name}-${beer.id}`}
              beer={beer}
              onToggle={onItemPress}
              getIsBeerDisabled={getIsBeerDisabled}
            />
          ))}
          {!breweries.length && <p>No saved items</p>}
        </ul>
      </div>
    </Paper>
  );
}
