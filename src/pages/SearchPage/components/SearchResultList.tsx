import { useInView } from "react-intersection-observer";
import type { Track } from "../../../models/track";
import {
  Button,
  CircularProgress,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: "100%",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
});

const TrackInfo = styled("div")({
  display: "flex",
  alignItems: "center",
});

const TrackName = styled("p")({
  margin: 0,
  fontWeight: 700,
});

const ArtistName = styled("p")(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.secondary,
}));

interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <StyledTableContainer>
      <TableBody sx={{ width: "100%" }}>
        {list.map((track) => (
          <StyledTableRow key={track.id}>
            <TableCell>
              <TrackInfo>
                <div>
                  <AlbumImage src={track.album?.images[0].url} width="40px" />
                </div>
                <div>
                  <TrackName>{track.name}</TrackName>
                  <ArtistName>
                    {track.artists ? track.artists[0].name : "Unknown Artist"}
                  </ArtistName>
                </div>
              </TrackInfo>
            </TableCell>
            <TableCell>{track.album?.name}</TableCell>
            <TableCell>
              <Button>Add</Button>
            </TableCell>
          </StyledTableRow>
        ))}
        <div ref={ref} style={{ height: 1 }}>
          {isFetchingNextPage && <CircularProgress size={24} />}
        </div>
      </TableBody>
    </StyledTableContainer>
  );
};

export default SearchResultList;
