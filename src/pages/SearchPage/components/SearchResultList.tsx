import { useInView } from "react-intersection-observer";
import type { Track } from "../../../models/track";
import {
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import useAddTrackToPlaylist from "../../../hooks/useAddTrackToPlaylist";

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
  onAdd?: (track: Track) => void;
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onAdd,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedTrackUri, setSelectedTrackUri] = useState<string | null>(null);

  const { data: playlistData } = useGetCurrentUserPlaylists({ limit: 50, offset: 0 });
  const { mutate: addTrack, isPending } = useAddTrackToPlaylist();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>, track: Track) => {
    if (onAdd) {
      onAdd(track);
      return;
    }
    setSelectedTrackUri(track.uri ?? null);
    setMenuAnchor(e.currentTarget);
  };

  const handleSelectPlaylist = (playlistId: string) => {
    if (!selectedTrackUri) return;
    addTrack({ playlistId, trackUri: selectedTrackUri });
    setMenuAnchor(null);
    setSelectedTrackUri(null);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedTrackUri(null);
  };

  return (
    <>
      <StyledTableContainer>
        <Table>
          <TableBody>
            {list.map((track, i) => (
              <StyledTableRow key={track.id ? `${track.id}-${i}` : i}>
                <TableCell>
                  <TrackInfo>
                    <div>
                      <AlbumImage src={track.album?.images?.[0]?.url} width="40px" />
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
                  <Button
                    disabled={isPending}
                    onClick={(e) => handleAddClick(e, track)}
                  >
                    Add
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
            <TableRow ref={ref}>
              <TableCell colSpan={3} sx={{ height: 1, padding: 0, border: 0 }}>
                {isFetchingNextPage && <CircularProgress size={24} />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledTableContainer>

      {!onAdd && (
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleCloseMenu}>
          {playlistData?.items.length === 0 && (
            <MenuItem disabled>플레이리스트가 없어요</MenuItem>
          )}
          {playlistData?.items.map((playlist) => (
            <MenuItem
              key={playlist.id}
              onClick={() => playlist.id && handleSelectPlaylist(playlist.id)}
            >
              {playlist.name}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default SearchResultList;
