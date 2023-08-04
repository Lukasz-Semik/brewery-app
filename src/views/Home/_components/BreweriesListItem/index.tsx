import { Beer } from "../../../../types";
import { Link as RouterLink } from "react-router-dom";
import { Checkbox, Link } from "@mui/material";
import { useCallback, useMemo } from "react";
import IconFavorite from "@mui/icons-material/Favorite";

type BreweryleListItemProps = {
  beer: Beer;
  onToggle: (beer: Beer) => void;
  getIsBeerDisabled?: (beer: Beer) => boolean;
};

export function BreweriesListItem({
  beer,
  onToggle,
  getIsBeerDisabled,
}: BreweryleListItemProps) {
  const onChange = useCallback(() => {
    onToggle(beer);
  }, [beer, onToggle]);

  const isDisabled = useMemo(
    () => getIsBeerDisabled?.(beer),
    [beer, getIsBeerDisabled]
  );

  return (
    <li>
      <Checkbox
        onChange={onChange}
        disabled={isDisabled}
        icon={isDisabled ? <IconFavorite /> : undefined}
      />

      <Link component={RouterLink} to={`/beer/${beer.id}`}>
        {beer.name}
      </Link>
    </li>
  );
}
