import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { common } from '@material-ui/core/colors';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GithubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Sorts } from '../models';

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: common.black,
    },
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export const GithubAppBar = ({ query, sort, onQueryChanged, onSortSelected }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <GithubIcon />
          <Typography className={classes.title} variant="h6" noWrap>
            Github User Search
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              defaultValue={query}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onQueryChanged(e.target.value)}
                }
              }
            />
          </div>
          <div className={classes.grow}></div>
          <FormControl className={classes.formControl} disabled={false}>
            <InputLabel htmlFor="grouped-native-select">Sort</InputLabel>
            <Select
              native
              defaultValue={sort ? sort.id : null}
              id="grouped-native-select"
              onChange={(e) => onSortSelected(Sorts[e.target.value])}
            >
              <optgroup label="Sort options">
                {
                  Sorts.map((item) => <option value={item.id} key={item.id}>{item.key}</option>)
                }
              </optgroup>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
