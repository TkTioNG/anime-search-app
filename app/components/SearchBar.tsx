import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, type ChangeEventHandler } from "react";
import { useSearchParams } from "react-router";

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const onSearchTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setSearchParams(
        (prev) => {
          prev.set("q", event.target.value);
          // Reset page number back to 1 on every new search
          prev.set("page", "1");
          return prev;
        },
        { replace: true }
      );
    }, 250);
  };

  return (
    <TextField
      id="anime-search-input"
      label="Search"
      variant="outlined"
      fullWidth
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      onChange={onSearchTextChange}
    />
  );
}
