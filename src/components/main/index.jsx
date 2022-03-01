import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../store/items";
import { Box, Button, CircularProgress, Grid, Paper } from "@material-ui/core";
import axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Main() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const cartItems = useSelector((state) => state.reducer.items);
  const total = cartItems.reduce((a, b) => {debugger;return a + b.price}, 0)
  debugger;
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setItems(res.data);
      setLoading(false);
    });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Pet Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Box p={3}>
            <h4>Categories</h4>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["All Items", "Bird", "Cat", "Dog", "Fish"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Grid container spacing={6}>
          <Grid item sm={8}>
            <Box>
              <h3>List items</h3>
            </Box>
            <Box>
              {loading && <CircularProgress />}
              {items.length > 0 &&
                items.map(({ image, title, price, description }) => (
                  <Paper elevation={12} style={{ marginBottom: 16 }}>
                    <Box display={"flex"}>
                      <Box display="flex" p={3} alignItems="center">
                        <Box mr={2}>
                          <img
                            src={image}
                            style={{ width: 70, height: 70 }}
                            alt="item"
                          />
                        </Box>
                        <Box>
                          <Box display={"flex"} justifyContent="space-between">
                            <h4>{title}</h4>
                          </Box>
                          <Box my={1}>${price}</Box>
                          <Box>{description}</Box>
                        </Box>
                      </Box>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          dispatch(
                            increment({ image, title, price, description })
                          )
                        }
                      >
                        Add
                      </Button>
                    </Box>
                  </Paper>
                ))}
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box mt={6}>
              {cartItems.length > 0 && (
                <Paper>
                  <Box p={3}>
                    <h3>Cart Items</h3>
                    <Box style={{ maxHeight: 400, overflowY: "auto" }}>
                      {cartItems.map(
                        ({ image, title, price, description }, index) => (
                          <Box
                            display="flex"
                            p={3}
                            alignItems="center"
                            borderBottom={
                              index + 1 === cartItems.length
                                ? ""
                                : "1px solid lightgrey"
                            }
                            mb={2}
                          >
                            <Box mr={2}>
                              <img
                                src={image}
                                style={{ width: 70, height: 70 }}
                                alt="item"
                              />
                            </Box>
                            <Box>
                              <Box
                                display={"flex"}
                                justifyContent="space-between"
                              >
                                <h4>{title}</h4>
                              </Box>
                              <Box my={1}>${price}</Box>
                              <Box>{description}</Box>
                            </Box>
                          </Box>
                        )
                      )}
                    </Box>
                  </Box>
                  <Button color="primary" fullWidth variant="contained">
                    Checkout ${total || 0}
                  </Button>
                </Paper>
              )}
            </Box>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
