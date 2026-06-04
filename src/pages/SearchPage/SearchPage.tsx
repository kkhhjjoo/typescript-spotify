import { useState, type FormEvent } from "react";
import { styled, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchItemsByKeyword } from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import SearchResultList from "./components/SearchResultList";

const PageWrapper = styled("div")(({ theme }) => ({
  padding: "24px",
  color: theme.palette.common.white,
}));

const SearchForm = styled("form")({
  marginBottom: "24px",
});

const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSearchItemsByKeyword({
      q: keyword,
      type: [SEARCH_TYPE.Track],
    });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setKeyword(inputValue.trim());
  };

  return (
    <PageWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <TextField
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="검색어를 입력하세요"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </SearchForm>
      {keyword && (
        <SearchResultList
          list={tracks}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </PageWrapper>
  );
};

export default SearchPage;
