import "./Header.css"
import { useEffect, useState } from "react";
import axios from "axios";
import TrendingAPIContent from "../TrendingAPIContent";
import { TextField, Button, InputAdornment, Box, AppBar, Toolbar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ListView from "../RoutingPages/Trending/ListView";
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router";

const Header = () => {

    const [type, setType] = useState(0);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);


    const [searchParam] = useState(["Movies", "Tv Series"]);
    
    const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=3666a25e61485ebf50f59fec841801e2&language=en-US&query=${search}&page=${page}&include_adult=false`
          );
          setContent(data.results);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
      }, [])
    
      const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));
      
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            cursor
          >
            Flix
          </Typography>
          {/* <Search  onChange={(e) => setSearch(e.target.value)}> */}
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
          <TextField variant="outlined" name="search" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <Button variant="contained" onClick={fetchSearch}><SearchIcon/></Button>
          </Box> </Toolbar></AppBar>
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
            {/* <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onClick={fetchSearch}
            /> */}
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
        {content &&
          content.map((item) => (
            <TrendingAPIContent
              poster={item.poster_path}
              title={item.title || item.name}
              id={item.id}
              media_type={type ? "tv" : "movie"}
              >   <ListView value = {type}
              onChange={(event, newValue) => {
                setType(newValue);
                
                
              }}/></TrendingAPIContent>
          ))}
        {search &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {/* </Search> */}
       
      
    </Box>
    );
}

export default Header;