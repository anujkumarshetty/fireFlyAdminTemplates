import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownCircle from '@material-ui/icons/ArrowDropDownCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import logo from "../../assets/imgs/candelalabslogo.png";
import { styles } from './appbarCss';
import HeaderTemplate from "../HeaderTemplate/headerTemplate";
import FooterTemplate from '../FooterTemplate/footerTemplate';
import LetterTemplate from '../LetterTemplate/letterTemplate'

class MenuAppBar extends React.Component {


    state = {
        auth: true,
        anchorEl: null,
    };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        console.log(this.props.classes);
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <Router>
                <div className={classes.root}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Menu">
                                <img src={logo} className={classes.logo} alt="Candelalabs" set="" />
                            </IconButton>
                            <Typography variant="h5" color="inherit" className={classes.grow}>
                            Dotsphere Correspondence Manager- Template Administration
                        </Typography>

                            <div className={classes.dropdown}>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <ArrowDropDownCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >

                                    <Link to="headerTemplate" className={classes.linkDesign}>  <MenuItem onClick={this.handleClose}>Header Template</MenuItem></Link>
                                    <Link to="footerTemplate" className={classes.linkDesign}>   <MenuItem onClick={this.handleClose}>Footer  Template   </MenuItem></Link>
                                    <Link to="letterTemplate" className={classes.linkDesign}>   <MenuItem onClick={this.handleClose}>Letter Template    </MenuItem></Link>
                                    <Link to="signatureTemplate" className={classes.linkDesign}><MenuItem onClick={this.handleClose}>Signature Template </MenuItem></Link>

                                </Menu>

                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className="container">
                        <Route exact path="/" component={HeaderTemplate} />
                        <Route path="/headerTemplate" component={HeaderTemplate} />
                        <Route path="/footerTemplate" component={FooterTemplate} />
                        <Route path="/letterTemplate" component={LetterTemplate} />
                    </div>
                </div>
            </Router>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);