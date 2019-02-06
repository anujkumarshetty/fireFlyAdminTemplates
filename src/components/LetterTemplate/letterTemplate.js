import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { styles } from './letterTemplateCss';
import TextInput from '../Reusables/TextField/TextInput';
import Table from '../Reusables/Table/table';

class LetterTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            templateName: '',
            category: '',
            subCategory: '',
            templateType: 'EMAIL',
            imageData: '',
            index: null,
            open: false,
            message: '',
            columnNames: ["Letter Type", "Category", "Sub Category", "Template Type", "Actions"],
            apiData: [
                {
                    letterType: "backdating1",
                    category: 'dataentry',
                    subCategory: 'concent',
                    templateType: "LETTER",
                    letterTemplate: ""
                },
                {
                    letterType: "backdating1234",
                    category: '234dataentry',
                    subCategory: 'concent234',
                    templateType: "EMAIL",
                    letterTemplate: ""
                },
                {
                    letterType: "backdating12345",
                    category: '234dataentry',
                    subCategory: 'concent234',
                    templateType: "EMAIL",
                    letterTemplate: ""
                }
            ]
        };

    }

    handleTemplateNameChange = (val, id) => {
        switch (id) {
            case "templateName":
                this.setState({ templateName: val });
                break;
            case "category":
                this.setState({ category: val });
                break;
            case "subCategory":
                this.setState({ subCategory: val });
                break;
            case "templateType":
                this.setState({ templateType: val });
                break;
            default:
                break;
        }

    };

    requestSnackBar = (message) => {
        this.setState({ open: true, message })
        setTimeout(this.handleSnackBarClose, 3000);
    }

    handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false, message: '' });
    };

    handleCkdataChange = ckData => {
        this.setState({ ckData });
    }
    handleFileChange = e => {
        let data = e.target;
        const reader = new FileReader();
        if (data.files.length) {
            reader.readAsDataURL(data.files[0]);
        }

        reader.onload = function (e) {
            console.log(e.target.result);
            this.setState({ imageData: e.target.result })
        }.bind(this);
    }

    handleRadioButtonChange = event => {
        this.setState({ templateType: event.target.value });
    };

    handleClearData = (flag = true) => {
        if (flag) {
            this.requestSnackBar("Fields cleard successfully");
        }

        this.setState({
            templateName: '',
            category: '',
            subCategory: '',
            templateType: '',
            imageData: '',
            index: null
        });
        document.getElementById("uploadInputFile").value = "";
    }

    handleDelete = (e, index) => {
        let state = [...this.state.apiData];
        state.splice(index, 1);
        this.setState({ apiData: state });
        this.requestSnackBar("Template deleted successfully");
    }

    handleEdit = (e, index) => {
        this.setState({ index })
        let state = [...this.state.apiData];
        let newState = state.slice(index, index + 1);
        this.setState({
            templateName: newState[0].letterType,
            category: newState[0].category,
            subCategory: newState[0].subCategory,
            templateType: newState[0].templateType,
            imageData: newState[0].letterTemplate,
        });

    }

    handleSave = () => {

        let editedOrCreateData = {
            letterType: this.state.templateName,
            category: this.state.category,
            subCategory: this.state.subCategory,
            templateType: this.state.templateType,
            letterTemplate: this.state.imageData
        }
        let newState = [...this.state.apiData];

        if (this.state.index !== null) {
            newState.splice(this.state.index, 1);
            newState.splice(this.state.index, 0, editedOrCreateData)
            this.setState({ apiData: newState })
            this.requestSnackBar("Template saved successfully");
            this.handleClearData(false);
        } else {
            newState.push(editedOrCreateData);
            this.setState({apiData : newState});
            this.requestSnackBar("New template added successfully");
        }

    }
    render() {
        console.log(this.state)
        const { classes } = this.props;
        return (
            <div className={classes.container}>

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <h3 className={classes.title}>Create Or Edit Letter Template</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <div id="templateName">
                            <TextInput
                                id="templateName"
                                placeholder="Letter Template Name"
                                handleTextChange={this.handleTemplateNameChange}
                                inputValue={this.state.templateName}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            id="category"
                            placeholder="Category"
                            handleTextChange={this.handleTemplateNameChange}
                            inputValue={this.state.category}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            id="subCategory"
                            placeholder="Sub Category"
                            handleTextChange={this.handleTemplateNameChange}
                            inputValue={this.state.subCategory}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Template Type</FormLabel>
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                className={classes.group}
                                value={this.state.templateType}
                                onChange={this.handleRadioButtonChange}
                            >
                                <FormControlLabel value="LETTER" control={<Radio />} label="Correspondence" />
                                <FormControlLabel value="EMAIL" control={<Radio />} label="Email" />
                            </RadioGroup>
                        </FormControl>

                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel component="legend">Letter Template </FormLabel>
                        <FormControl component="fieldset" className={classes.formControl}></FormControl>
                        <input type="file" className={classes.file_input} name="myfile" id="uploadInputFile" onChange={(e) => this.handleFileChange(e)} />
                        {this.state.imageData ? <iframe src={this.state.imageData}>
                            <p>Your browser does not support iframes.</p>
                        </iframe> : null}
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClearData}>
                            Clear
                                <Icon className={classes.rightIcon}>clear</Icon>
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSave}>
                            Save
                                <Icon className={classes.rightIcon}>save</Icon>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Table
                            columnNames={this.state.columnNames}
                            tableData={this.state.apiData}
                            handleDelete={this.handleDelete}
                            handleEdit={this.handleEdit} />
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
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
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

LetterTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterTemplate);
