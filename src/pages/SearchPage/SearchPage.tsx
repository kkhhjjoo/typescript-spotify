import { useState, type FormEvent } from "react";
import { styled, TextField, InputAdornment, IconButton, Box, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MicIcon from "@mui/icons-material/Mic";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RadarIcon from "@mui/icons-material/Radar";
import PianoIcon from "@mui/icons-material/Piano";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import type { SvgIconComponent } from "@mui/icons-material";
import { useSearchItemsByKeyword } from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import type { Track } from "../../models/track";
import type { Artist } from "../../models/artist";
import type { SimplifiedAlbum } from "../../models/album";

interface BrowseCategory {
  id: string;
  name: string;
  color: string;
  Icon: SvgIconComponent;
}

const BROWSE_CATEGORIES: BrowseCategory[] = [
  { id: "1",  name: "나만의 플레이리스트", color: "#b09a00", Icon: LibraryMusicIcon },
  { id: "2",  name: "최신 음악",           color: "#4cd94c", Icon: FiberNewIcon },
  { id: "3",  name: "차트",               color: "#8b1a2a", Icon: TrendingUpIcon },
  { id: "4",  name: "가요",               color: "#aadd00", Icon: MusicNoteIcon },
  { id: "5",  name: "팝",                 color: "#121212", Icon: MicIcon },
  { id: "6",  name: "힙합",               color: "#8db4a0", Icon: HeadphonesIcon },
  { id: "7",  name: "R&B",               color: "#6b2fa0", Icon: FavoriteIcon },
  { id: "8",  name: "RADAR",             color: "#cc22cc", Icon: RadarIcon },
  { id: "9",  name: "Fresh Finds",       color: "#8fb800", Icon: AutoAwesomeIcon },
  { id: "10", name: "발라드",             color: "#e8115b", Icon: FavoriteIcon },
  { id: "11", name: "인디",              color: "#477d95", Icon: MusicNoteIcon },
  { id: "12", name: "재즈",              color: "#1e3264", Icon: PianoIcon },
  { id: "13", name: "K-Pop",            color: "#2d46b9", Icon: MusicNoteIcon },
  { id: "14", name: "클래식",            color: "#503750", Icon: PianoIcon },
  { id: "15", name: "OST",              color: "#ba5d07", Icon: MusicNoteIcon },
  { id: "16", name: "파티",              color: "#e13300", Icon: MicIcon },
  { id: "17", name: "운동",              color: "#148a08", Icon: HeadphonesIcon },
  { id: "18", name: "EDM",              color: "#509bf5", Icon: HeadphonesIcon },
];

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

const TopCard = styled(Box)({
  background: "#282828",
  borderRadius: "8px",
  padding: "20px",
  cursor: "pointer",
  transition: "background 0.2s",
  "&:hover": { background: "#3e3e3e" },
});

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

const CategoryCard = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  position: "relative",
  backgroundColor: bgcolor,
  borderRadius: "8px",
  padding: "16px",
  height: "160px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "filter 0.2s",
  "&:hover": { filter: "brightness(1.15)" },
}));

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

      {/* Browse All — 검색어 없을 때 */}
      {!keyword && (
        <>
          <SectionTitle>Browse all</SectionTitle>
          <Grid container spacing={2}>
            {BROWSE_CATEGORIES.map(({ id, name, color, Icon }) => (
              <Grid key={id} size={{ xs: 6, sm: 4, md: 3 }}>
                <CategoryCard bgcolor={color}>
                  <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#fff", position: "relative", zIndex: 1 }}>
                    {name}
                  </Typography>
                  <Box sx={{
                    position: "absolute",
                    bottom: "-10px",
                    right: "-10px",
                    width: "80px",
                    height: "80px",
                    background: "rgba(0,0,0,0.25)",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "rotate(25deg)",
                    boxShadow: "4px 4px 12px rgba(0,0,0,0.4)",
                  }}>
                    <Icon sx={{ fontSize: 40, color: "#fff", opacity: 0.9 }} />
                  </Box>
                </CategoryCard>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* 검색 결과 */}
      {keyword && topTrack && (
        <Grid container spacing={3}>
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
