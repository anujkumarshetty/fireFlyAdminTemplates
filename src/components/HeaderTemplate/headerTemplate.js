import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import CKeditro from "../CKeditor/ckEditor";
import { styles } from './headerTemplateCss';
import TextInput from '../Reusables/TextField/TextInput'

class HeaderTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            templateName: '',
            ckData: '',
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

    }

    componentDidMount() {

    }

    render() {
        // console.log(this.state);
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <h3 className={classes.title}>Header Template</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            placeholder="Header Template Name"
                            handleTextChange={this.handleTemplateNameChange}
                            inputValue={this.state.templateName}
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
                        <Button variant="contained" color="primary" className={classes.button}>
                            Save
                                <Icon className={classes.rightIcon}>save</Icon>
                        </Button>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

HeaderTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderTemplate);
