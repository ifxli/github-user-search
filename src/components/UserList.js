import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export const UserList = ({ users }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {
        users.map((user, index) => (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <Link href={user.html_url} target="_blank" rel="noopener">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={user.avatar_url} />
                </ListItemAvatar>
              </Link>
              <ListItemText
                primary={
                  <Fragment>
                    <Link href={user.html_url} target="_blank" rel="noopener">
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textSecondary"
                      >
                        {user.name}
                      </Typography>
                    </Link>
                    &nbsp;
                    <Link href={user.html_url} target="_blank" rel="noopener">
                      {user.login}
                    </Link>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {user.location}
                    </Typography>
                  </Fragment>
                }
                secondary={
                  <Fragment>
                    <Typography
                    component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {user.bio}
                    </Typography>
                    <br></br>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      followers: {user.followers}, following: {user.following}, gists: {user.public_gists}, repos: {user.public_repos}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
            {index < users.length - 1 && <Divider variant="inset" component="li" />}
          </div>   
        ))
      }
    </List>
  )
}
