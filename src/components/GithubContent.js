import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import { UserList } from './UserList';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
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
      let fetchUserUrl = `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`
      if (sort != null) {
        const { o, s } = sort;
        fetchUserUrl += `&order=${o}&sort=${s}`;
      }
      const result = await axios(fetchUserUrl);
      console.log('result = ', result.data);
      if (result.data) {
        setTotalCount(result.data.total_count);
        setUsers(result.data.items);
      }
      setLoading(false);
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
        { loading && <LinearProgress />}
        <Typography className={classes.text} variant="h6" gutterBottom>
          {totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} users
        </Typography>
        <UserList users={users}/>
        { loading && <LinearProgress />}
        <Pagination count={paginationCount} page={page} shape="rounded" onChange={handlePageChange}/>
      </Container>
    )
  }
  return (
    <Container maxWidth="sm">
      <div>No Data</div>
    </Container>
  )
}
