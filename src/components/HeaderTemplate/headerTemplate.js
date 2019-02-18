import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import CKeditro from "../CKeditor/ckEditor";
import { styles } from './headerTemplateCss';
import TextInput from '../Reusables/TextField/TextInput';
import { GET_ALL_HEADER, UPDATE_HEADER } from '../Config/apiConfig';

class HeaderTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            templateName: '',
            ckData: '',
            open: false,
            message: ''
        };
    }

    handleTemplateNameChange = val => {
        this.setState({ templateName: val });
    };


    handleCkdataChange = ckData => {
        this.setState({ ckData });
    }

    handleClearData = () => {
        this.setState({
            templateName: '',
            ckData: '',
        });
    }

    handleSaveData = () => {
        const data = {
            "headerContent": this.state.ckData,
            "headerTemplateName": this.state.templateName
        }
        axios.put(UPDATE_HEADER, data)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        this.requestSnackBar("Template saved successfully");
    }

    requestSnackBar = (message) => {
        this.setState({ open: true, message })
        setTimeout(this.handleSnackBarClose, 6000);
    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false, message: '' });
    };

    componentDidMount() {
        axios.get(GET_ALL_HEADER)
            .then(res => {
                const persons = res.data;
                console.log(persons)
                this.setState({
                    templateName: res.data.headerTemplateName,
                    ckData: res.data.headerContent,
                });
            })
            .catch(error => this.requestSnackBar("Error: Cannot establish a connection to server, Please retry again"));
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <br /><br /><br />
                    </Grid>
                    <Grid item xs={12}>
                        <h3 className={classes.title}>Header Template</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            placeholder="Header Template Name"
                            handleTextChange={this.handleTemplateNameChange}
                            inputValue={this.state.templateName}
                            labelWidth={170}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CKeditro ckContent={this.state.ckData} CKData={this.handleCkdataChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClearData}>
                            Clear
                                <Icon className={classes.rightIcon}>clear</Icon>
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSaveData}>
                            Save
                                <Icon className={classes.rightIcon}>save</Icon>
                        </Button>
                    </Grid>

                </Grid>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={8000}
                    onClose={this.handleSnackBarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={this.state.message}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleSnackBarClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

HeaderTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderTemplate);
