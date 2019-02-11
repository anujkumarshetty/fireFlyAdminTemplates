import React, { Component, Fragment } from 'react';
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
// import Table from '../Reusables/Table/table';
import preview from '../../assets/imgs/preview.png'

import $ from "jquery";
import DataTable from 'datatables';
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css'
import DialogComponent from '../Reusables/Dialog/dialog';

class LetterTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            templateName: '',
            category: '',
            subCategory: '',
            templateType: '',
            imageData: '',
            index: null,
            open: false,
            message: '',
            inputVal: "",
            openDialog: false,
            viewImageData: "",
            columnNames: ["Letter Type", "Category", "Sub Category", "Template Type", "Actions"],
            apiData: [
                // {
                //     letterType: "auj",
                //     category: 'dataentry',
                //     subCategory: 'concent',
                //     templateType: "LETTER",
                //     letterTemplate: ""
                // },
                // {
                //     letterType: "backdating1234",
                //     category: '234dataentry',
                //     subCategory: 'concent234',
                //     templateType: "EMAIL",
                //     letterTemplate: ""
                // },
                // {
                //     letterType: "skye",
                //     category: '234dataentry',
                //     subCategory: 'concent234',
                //     templateType: "EMAIL",
                //     letterTemplate: ""
                // }
            ]
        };

    }
    componentDidMount() {
        console.log("did mount");
        $(document).ready(function () {
            $('#dtDynamicVerticalScrollExample').DataTable({
                "scrollY": "300px",
                "scrollCollapse": true,
                "paging": false,
                "searching": false
            });
            $('.dataTables_length').addClass('bs-select');


        });

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

    handelViewImage = (e, index) => {
        console.log(index);
        let apiImage = this.state.apiData[index].letterTemplate;
        this.setState({ viewImageData: apiImage, openDialog: true })
    }

    handlePreviewButton = (e) => {

        this.setState({ imageData: this.state.viewImageData, openDialog: true });
    }

    handleDialogBoxClose = () => {
        this.setState({ openDialog: false });
    };

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
            this.setState({ apiData: newState });
            this.requestSnackBar("New template added successfully");
            this.handleClearData(false);

        }

    }

    handInputSearchField = (e) => {
        console.log(e.target.value);
        this.setState({ inputVal: e.target.value });
        $("#myInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
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

                        {/* {this.state.imageData ? <img src={preview} height="30px" width="30px" onClick={(e) => { this.handlePreviewButton(e) }} /> : null}

                        {this.state.imageData ? <iframe src={this.state.imageData}>
                            <p>Your browser does not support iframes.</p>
                        </iframe> : null} */}
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
                        {this.state.apiData.length > 0 ? <hr /> : null}
                    </Grid>
                    <Grid item xs={12}>

                        {
                            this.state.apiData.length > 0 ?
                                <div>
                                    <label style={{ float: "right" }}>Search :  &nbsp; <input type="text" id="myInput" value={this.state.inputVal} onChange={this.handInputSearchField} /></label>

                                    <table id="dtDynamicVerticalScrollExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                {
                                                    this.state.columnNames.map(columnName => {
                                                        return (
                                                            <Fragment key={columnName}>
                                                                < th className="th-sm">{columnName}
                                                                </th>
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody id="myTable">
                                            {
                                                this.state.apiData ? this.state.apiData.map((item, index) => {
                                                    return (
                                                        <tr key={item.letterType}>
                                                            <td>{item.letterType}</td>
                                                            <td>{item.category}</td>
                                                            <td>{item.subCategory}</td>
                                                            <td>{item.templateType}</td>
                                                            <td >
                                                                <Icon className='action' onClick={(e) => { this.handelViewImage(e, index) }}>crop_original</Icon>
                                                                <Icon className='action' onClick={(e) => { this.handleEdit(e, index) }}>edit</Icon>
                                                                <Icon className='action' onClick={(e) => { this.handleDelete(e, index) }}>delete</Icon>
                                                            </td>
                                                        </tr>
                                                    );
                                                }) : null
                                            }
                                        </tbody>
                                    </table>
                                </div> : null
                        }
                    </Grid>
                </Grid>
                <DialogComponent
                    viewImageData={this.state.viewImageData}
                    openDialog={this.state.openDialog}
                    handleDialogBoxClose={this.handleDialogBoxClose}
                />
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
