import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Avatar
} from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Menu as MenuIcon} from '@material-ui/icons';
import defaultProfilePicture from '../../assets/images/defaultProfilePicture.png'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../actions/auth';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#001d2f"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  letterAvatar: {
    backgroundColor: theme.palette.secondary.main
  }
}));

function Header({handleDrawer}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const user = useSelector(state => state.auth.user)

  const handleLogout = () => dispatch(logoutRequest())

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Abrir/Fechar Barra Lateral"
          onClick={handleDrawer}
          edge="start"
          className={classes.menuButton}>
          <MenuIcon />
        </IconButton>

        <Typography
          className={classes.title}
          variant="h6"
          color="inherit"
          noWrap>
          AncapHub
        </Typography>

        <IconButton
          edge="end"
          aria-owns={isMenuOpen ? 'material-appbar' : undefined}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit">
          {user !== null && user.avatar && user.avatar !== '' ? (
            <Avatar
              src={user.avatar}
              alt={user.name}
              style={{ width: '40px', height: '40px' }}
            />
          ) : (
              <Avatar
                src={defaultProfilePicture}
                alt="Foto de perfil genérica"
                style={{ width: '40px', height: '40px' }}
              />
            )}
        </IconButton>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        getContentAnchorEl={null}>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Header;
