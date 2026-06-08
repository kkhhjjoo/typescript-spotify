import { useState, type FormEvent } from "react";
import { styled, TextField, InputAdornment, IconButton, Box, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonIcon from "@mui/icons-material/Person";
import { useSearchItemsByKeyword } from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import type { Track } from "../../models/track";
import type { Artist } from "../../models/artist";
import type { SimplifiedAlbum } from "../../models/album";

const PageWrapper = styled("div")(({ theme }) => ({
  padding: "24px",
  color: theme.palette.common.white,
}));

const SearchForm = styled("form")({
  marginBottom: "24px",
});

const SectionTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.5rem",
  marginBottom: "16px",
});

const TopCard = styled(Box)(({ theme }) => ({
  background: "#282828",
  borderRadius: "8px",
  padding: "20px",
  cursor: "pointer",
  transition: "background 0.2s",
  "&:hover": { background: "#3e3e3e" },
}));

const SongRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "8px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": { background: "rgba(255,255,255,0.1)" },
});

const ArtistCard = styled(Box)({
  minWidth: "150px",
  padding: "16px",
  borderRadius: "8px",
  background: "#282828",
  cursor: "pointer",
  transition: "background 0.2s",
  "&:hover": { background: "#3e3e3e" },
});

const AlbumCard = styled(Box)({
  minWidth: "150px",
  padding: "16px",
  borderRadius: "8px",
  background: "#282828",
  cursor: "pointer",
  transition: "background 0.2s",
  "&:hover": { background: "#3e3e3e" },
});

const CircleImage = styled("img")({
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "12px",
});

const SquareImage = styled("img")({
  width: "118px",
  height: "118px",
  borderRadius: "4px",
  objectFit: "cover",
  marginBottom: "12px",
});

const formatDuration = (ms?: number) => {
  if (!ms) return "--:--";
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  return `${min}:${sec.toString().padStart(2, "0")}`;
};

const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
  });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
  const artists = data?.pages.flatMap((page) => page.artists?.items ?? []) ?? [];
  const albums = data?.pages.flatMap((page) => page.albums?.items ?? []) ?? [];

  const topTrack = tracks[0];
  const songsList = tracks.slice(0, 4);

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

      {keyword && topTrack && (
        <Grid container spacing={3}>
          {/* Top result + Songs */}
          <Grid size={{ xs: 12, md: 5 }}>
            <SectionTitle>Top result</SectionTitle>
            <TopCard>
              {topTrack.album?.images?.[0]?.url ? (
                <img
                  src={topTrack.album.images[0].url}
                  width="96px"
                  style={{ borderRadius: "4px", display: "block", marginBottom: "16px" }}
                  alt={topTrack.name}
                />
              ) : (
                <Box sx={{ width: 96, height: 96, background: "#535353", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                  <MusicNoteIcon sx={{ fontSize: 40, color: "#b3b3b3" }} />
                </Box>
              )}
              <Typography sx={{ fontWeight: 700, fontSize: "2rem", mb: 1 }}>{topTrack.name}</Typography>
              <Typography sx={{ color: "#b3b3b3", fontSize: "0.9rem" }}>
                Song • {topTrack.artists?.[0]?.name}
              </Typography>
            </TopCard>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <SectionTitle>Songs</SectionTitle>
            {songsList.map((track: Track, i) => (
              <SongRow key={track.id ?? i}>
                {track.album?.images?.[0]?.url ? (
                  <img src={track.album.images[0].url} width="40px" height="40px" style={{ borderRadius: "4px", objectFit: "cover" }} alt={track.name} />
                ) : (
                  <Box sx={{ width: 40, height: 40, background: "#535353", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MusicNoteIcon sx={{ fontSize: 20, color: "#b3b3b3" }} />
                  </Box>
                )}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {track.name}
                  </Typography>
                  <Typography sx={{ color: "#b3b3b3", fontSize: "0.8rem" }}>
                    {track.artists?.[0]?.name}
                  </Typography>
                </Box>
                <Typography sx={{ color: "#b3b3b3", fontSize: "0.85rem", flexShrink: 0 }}>
                  {formatDuration(track.duration_ms)}
                </Typography>
              </SongRow>
            ))}
          </Grid>

          {/* Artists */}
          {artists.length > 0 && (
            <Grid size={12}>
              <SectionTitle>Artists</SectionTitle>
              <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
                {artists.map((artist: Artist) => (
                  <ArtistCard key={artist.id}>
                    {artist.images?.[0]?.url ? (
                      <CircleImage src={artist.images[0].url} alt={artist.name} />
                    ) : (
                      <Box sx={{ width: 120, height: 120, borderRadius: "50%", background: "#535353", display: "flex", alignItems: "center", justifyContent: "center", mb: 1.5 }}>
                        <PersonIcon sx={{ fontSize: 48, color: "#b3b3b3" }} />
                      </Box>
                    )}
                    <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {artist.name}
                    </Typography>
                    <Typography sx={{ color: "#b3b3b3", fontSize: "0.8rem", mt: 0.5 }}>Artist</Typography>
                  </ArtistCard>
                ))}
              </Box>
            </Grid>
          )}

          {/* Albums */}
          {albums.length > 0 && (
            <Grid size={12}>
              <SectionTitle>Albums</SectionTitle>
              <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
                {albums.map((album: SimplifiedAlbum) => (
                  <AlbumCard key={album.id}>
                    {album.images?.[0]?.url ? (
                      <SquareImage src={album.images[0].url} alt={album.name} />
                    ) : (
                      <Box sx={{ width: 118, height: 118, borderRadius: "4px", background: "#535353", display: "flex", alignItems: "center", justifyContent: "center", mb: 1.5 }}>
                        <MusicNoteIcon sx={{ fontSize: 40, color: "#b3b3b3" }} />
                      </Box>
                    )}
                    <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {album.name}
                    </Typography>
                    <Typography sx={{ color: "#b3b3b3", fontSize: "0.8rem", mt: 0.5 }}>
                      {album.release_date?.slice(0, 4)} • {album.artists?.[0]?.name}
                    </Typography>
                  </AlbumCard>
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </PageWrapper>
  );
};

export default SearchPage;
