import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { styles } from './footerTemplateCss';
import CKeditro from "../CKeditor/ckEditor";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class FooterTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            templateName: '',
            ckData: '',
        };
    }

    handleTemplateNameChange = event => {
        this.setState({ templateName: event.target.value });
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
        console.log(this.state);
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <h3 className={classes.title}>footer Template</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl} variant="outlined">
                            <InputLabel
                                ref={ref => {
                                    this.labelRef = ReactDOM.findDOMNode(ref);
                                }}
                                htmlFor="component-outlined"
                            >
                                Footer Template Name
                    </InputLabel>
                            <OutlinedInput
                                id="component-outlined"
                                value={this.state.templateName}
                                onChange={this.handleTemplateNameChange}
                                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                            />
                        </FormControl>
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

FooterTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterTemplate);
