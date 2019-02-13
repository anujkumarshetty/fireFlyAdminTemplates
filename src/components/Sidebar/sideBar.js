import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreditCard from '@material-ui/icons/CreditCard';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Receipt from '@material-ui/icons/Receipt';
import BorderColor from '@material-ui/icons/BorderColor';
import MailIcon from '@material-ui/icons/Mail';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from "../../assets/imgs/candelalabslogo.png";
import HeaderTemplate from "../HeaderTemplate/headerTemplate";
import FooterTemplate from '../FooterTemplate/footerTemplate';
import LetterTemplate from '../LetterTemplate/letterTemplate';
import SignatureTemplate from '../SignatureTemplate/signatureTemplate';



const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class MiniDrawer extends React.Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <Router>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open,
                        })}
                    >
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, {
                                    [classes.hide]: this.state.open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                Dotsphere Correspondence Manager- Template Administration
            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={classNames(classes.drawer, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        })}
                        classes={{
                            paper: classNames({
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open,
                            }),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))} */}

                            <Link to="headerTemplate" className={classes.linkDesign}>
                                <ListItem button >
                                    <ListItemIcon><CreditCard /></ListItemIcon>
                                    <ListItemText primary="Header Template" />
                                </ListItem>
                            </Link>
                            <Link to="footerTemplate" className={classes.linkDesign}>
                                <ListItem button >
                                    <ListItemIcon><CreditCard id="footer-icon" /></ListItemIcon>
                                    <ListItemText primary="Footer Template" />
                                </ListItem>
                            </Link>
                            <Link to="letterTemplate" className={classes.linkDesign}>
                                <ListItem button >
                                    <ListItemIcon><Receipt /></ListItemIcon>
                                    <ListItemText primary="Letter Template" />
                                </ListItem>
                            </Link>
                            <Link to="signatureTemplate" className={classes.linkDesign}>
                                <ListItem button >
                                    <ListItemIcon><BorderColor /></ListItemIcon>
                                    <ListItemText primary="Signature Template" />
                                </ListItem>
                            </Link>

                        </List>
                        <Divider />

                    </Drawer>
                    {/* <main className={classes.content}>
                        <div className={classes.toolbar} />

                    </main> */}
                    <div className="container">
                        <Route exact path="/" component={HeaderTemplate} />
                        <Route path="/headerTemplate" component={HeaderTemplate} />
                        <Route path="/footerTemplate" component={FooterTemplate} />
                        <Route path="/letterTemplate" component={LetterTemplate} />
                        <Route path="/signatureTemplate" component={SignatureTemplate} />
                    </div>
                </div>
            </Router>
        );
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);