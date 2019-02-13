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
import preview from '../../assets/imgs/preview.png'

import axios from 'axios';
import $ from "jquery";
import DataTable from 'datatables'; //Do not comment this import, It is being used for table representation.
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css'
import DialogComponent from '../Reusables/Dialog/dialog';
import {
    GET_ALL_LETTER_TEMPLATES,
    CREATE_A_LETTER_TEMPLATE,
    DELETE_A_LETTER_TEMPLATE,
    UPDATE_LETTER_TEMPLATE,
    GET_SINGLE_LETTER_TEMPLATE
} from '../Config/apiConfig'
import { resolve, reject } from 'q';

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
                {
                    letterName: "template1",
                    category: 'dataentry',
                    subCategory: 'concent',
                    templateType: "LETTER",
                    letterTemplate: ""
                },
                // {
                //     letterName: "backdating1234",
                //     category: '234dataentry',
                //     subCategory: 'concent234',
                //     templateType: "EMAIL",
                //     letterTemplate: ""
                // },
                // {
                //     letterName: "skye",
                //     category: '234dataentry',
                //     subCategory: 'concent234',
                //     templateType: "EMAIL",
                //     letterTemplate: ""
                // }
            ]
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }
    componentDidMount() {
        console.log("did mount");

        axios.get(GET_ALL_LETTER_TEMPLATES)
            .then(res => {
                const persons = res.data;
                console.log(persons)
                this.setState({
                    apiData: res.data
                });
            });

        $(document).ready(function () {
            $('#dtDynamicVerticalScrollExample').DataTable({
                "scrollY": "300px",
                "scrollCollapse": true,
                "paging": false,
                "sorting": false,
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
            // reader.readAsDataURL(data.files[0]);
            reader.readAsText(data.files[0], "UTF-8");
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

    async handleDelete(e, index) {
        // let state = [...this.state.apiData];
        // state.splice(index, 1);
        // this.setState({ apiData: state });

        let deletePromise = new Promise((resolve, reject) => {
            axios.delete(DELETE_A_LETTER_TEMPLATE + this.state.apiData[index].correspondenceId)
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        apiData: res.data
                    });
                    this.requestSnackBar("Template deleted successfully");
                    resolve(res.data);
                })
        })

        // await deletePromise.then(() => {
        //     axios.get(GET_ALL_LETTER_TEMPLATES)
        //         .then(res => {
        //             const persons = res.data;
        //             console.log(persons)
        //             this.setState({
        //                 apiData: res.data
        //             });
        //         });
        //     this.handleClearData(false);
        //     this.requestSnackBar("Template updated successfully");
        // });
    }

    handleEdit = (e, index) => {
        this.setState({ index })
        let state = [...this.state.apiData];
        let newState = state.slice(index, index + 1);
        this.setState({
            templateName: newState[0].letterName,
            category: newState[0].category,
            subCategory: newState[0].subCategory,
            templateType: newState[0].templateType,
            imageData: newState[0].letterTemplate,
        });

    }

    handelViewImage = (e, index) => {
        console.log(index);
        let apiImage = this.state.apiData[index].letterTemplate;

        this.setState({ viewImageData: `data:text/html;base64,${window.btoa(unescape(encodeURIComponent(apiImage)))}`, openDialog: true })
    }

    handlePreviewButton = (e) => {

        this.setState({ imageData: this.state.viewImageData, openDialog: true });
    }

    handleDialogBoxClose = () => {
        this.setState({ openDialog: false });
    };


    async handleSave() {

        // let editedOrCreateData = {
        //     letterName: this.state.templateName,
        //     category: this.state.category,
        //     subCategory: this.state.subCategory,
        //     templateType: this.state.templateType,
        //     letterTemplate: this.state.imageData
        // }
        // let newState = [...this.state.apiData];

        // if (this.state.index !== null) {
        //     newState.splice(this.state.index, 1);
        //     newState.splice(this.state.index, 0, editedOrCreateData)
        //     this.setState({ apiData: newState })
        //     this.requestSnackBar("Template saved successfully");
        //     this.handleClearData(false);
        // } else {
        //     newState.push(editedOrCreateData);
        //     this.setState({ apiData: newState });
        //     this.requestSnackBar("New template added successfully");
        //     this.handleClearData(false);
        // }


        if (this.state.index !== null) {

            const updateData = {
                category: this.state.category,
                // correspondence: null,
                correspondenceId: 700,
                indexClass: "NOT USED",
                isActive: 1,
                letterName: this.state.templateName,
                letterTemplate: this.state.imageData,
                subCategory: this.state.subCategory,
                templateType: this.state.templateType
            }
            let updatePromise = new Promise((resolve, reject) => {
                axios.put(UPDATE_LETTER_TEMPLATE + this.state.apiData[this.state.index].correspondenceId, updateData)
                    // axios.get(GET_SINGLE_LETTER_TEMPLATE)
                    .then(res => {
                        console.log("inside promise");
                        console.log(res.data);
                        this.setState({
                            apiData: res.data
                        });
                        this.requestSnackBar("Template updated successfully");
                        resolve(res.data);
                    })
            })

            // await updatePromise.then(() => {
            //     axios.get(GET_ALL_LETTER_TEMPLATES)
            //         .then(res => {
            //             const persons = res.data;
            //             console.log(persons)
            //             this.setState({
            //                 apiData: res.data
            //             });
            //         });
            //     this.handleClearData(false);
            //     this.requestSnackBar("Template updated successfully");
            // });


        } else {

            const createData = {
                category: this.state.category,
                indexClass: "NOT USED",
                isActive: 1,
                letterName: this.state.templateName,
                letterTemplate: this.state.imageData,
                subCategory: this.state.subCategory,
                templateType: this.state.templateType
            }
            let promise = new Promise((resolve, reject) => {
                axios.post(CREATE_A_LETTER_TEMPLATE, createData)
                    // axios.get(GET_SINGLE_LETTER_TEMPLATE)
                    .then(res => {
                        console.log("inside promise");
                        console.log(res.data);
                        this.setState({
                            apiData: res.data
                        });
                        this.requestSnackBar("Template saved successfully");
                        resolve(res.data);
                    })
            })

            // await promise.then(() => {
            //     axios.get(GET_ALL_LETTER_TEMPLATES)
            //         .then(res => {
            //             const persons = res.data;
            //             console.log(persons)
            //             this.setState({
            //                 apiData: res.data
            //             });
            //         });
            //     this.handleClearData(false);
            //     this.requestSnackBar("Template saved successfully");
            // });

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
                        <br /><br /><br />
                    </Grid>
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
                                labelWidth={160}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            id="category"
                            placeholder="Category"
                            handleTextChange={this.handleTemplateNameChange}
                            inputValue={this.state.category}
                            labelWidth={65}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            id="subCategory"
                            placeholder="Sub Category"
                            handleTextChange={this.handleTemplateNameChange}
                            inputValue={this.state.subCategory}
                            labelWidth={95}
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
                                                        <tr key={item.letterName}>
                                                            <td>{item.letterName}</td>
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

LetterTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterTemplate);
