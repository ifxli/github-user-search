import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
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
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user.avatar_url} />
              </ListItemAvatar>
              <ListItemText
                primary={user.login}
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {user.login}
                    </Typography>
                    {"Test for now"}
                  </Fragment>
                }
              />
            </ListItem>
            {index < users.length - 1 && <Divider variant="inset" component="li" />}
          </>   
        ))
      }
    </List>
  )
}