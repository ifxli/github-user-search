import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import { UserList } from './UserList';
import { NoData } from './NoData';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  pagination: {
    marginTop: theme.spacing(1),
    width: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));

export const GithubContent = ({ query, sort }) => {
  const classes = useStyles();
  const [ users, setUsers ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ totalCount, setTotalCount ] = useState(0);
  const [ paginationCount, setPaginationCount ] = useState(0);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      let fetchUsersUrl = `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`
      if (sort != null) {
        const { o, s } = sort;
        fetchUsersUrl += `&order=${o}&sort=${s}`;
      }
      const result = await axios(fetchUsersUrl);
      if (result.data) {
        setTotalCount(result.data.total_count);

        // get user detail
        let users = result.data.items;
        let promiseCalls = users.map((user) => axios(`https://api.github.com/users/${user.login}`, {
          headers: {
            Authorization: 'Basic ' + process.env.REACT_APP_GIT_AUTH_TOKEN
          }
        }));
        Promise.all(promiseCalls)
          .then(function (responses) {
            return Promise.all(responses.map(function (response) {
              return response.data;
            }));
          })
          .then(function (data) {
            console.log('result = ', data);
            setUsers(data);
          })
          .finally(function () {
            setLoading(false);
          });
      }
    }
    if (query !== '') {
      fetchUsers();
    }
  }, [query, sort, page])

  useEffect(() => {
    let tempCount = Math.round(totalCount / 10);
    if (tempCount > 100) {
      tempCount = 100;
    }
    setPaginationCount(tempCount);
  }, [totalCount, paginationCount])

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (totalCount > 0) {
    return (
      <Container maxWidth="sm">
        { loading && <LinearProgress /> }
        <Typography className={classes.text} variant="h6" gutterBottom>
          {totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} users
        </Typography>
        <UserList users={users}/>
        { loading && <LinearProgress /> }
        <Pagination
          className={classes.pagination}
          count={paginationCount}
          page={page}
          shape="rounded"
          onChange={handlePageChange}
        />
      </Container>
    )
  }
  return (
    <Container maxWidth="sm">
      <Box my={2}>
        { loading && <LinearProgress /> }
        <NoData />
      </Box>
    </Container>
  )
}
