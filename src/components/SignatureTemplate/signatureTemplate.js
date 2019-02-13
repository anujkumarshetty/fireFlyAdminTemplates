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
import { styles } from './signatureTemplateCss';
import TextInput from '../Reusables/TextField/TextInput';
import preview from '../../assets/imgs/preview.png';
import Checkbox from '@material-ui/core/Checkbox';

import $ from "jquery";
import DataTable from 'datatables'; //Do not comment this import, It is being used for table representation.
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css'
import DialogComponent from '../Reusables/Dialog/dialog';
import DropDown from '../Reusables/DropDown/dropDown';

class SignatureTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            templateName: '',
            userName: '',
            userNameList: [
                "admin",
                "bpmadmin",
                "icmadmin",
                "shilpasri",
                "tazeen",
                "rujuta",
                "deepak",
                "bandana",
                "SHILPAP",
                "shilpashree",
                "anuja",
                "uthra",
                "rajsekhar",
                "bpmAuthor",
                "test",
                "bpm01",
                "bpm02",
                "bpm03",
                "scott",
                "1003",
                "ganesh",
                "sudha",
                "Auser1",
                "Buser2",
                "cuser3",
                "duser4",
                "euser5",
                "fuser",
                "guser",
                "huser",
                "iuser",
                "juser",
                "kuser",
                "luser",
                "muser",
                "nuser",
                "ouser",
                "puser",
                "quser",
                "ruser",
                "suser",
                "tuser",
                "uuser",
                "vuser",
                "wuser",
                "xuser",
                "yuser",
                "zuser",
                "uthra1",
                "john",
                "yogish",
                "sanjit",
                "ranjit",
                "amitabha",
                "anitha",
                "shivraj",
                "lakshmi",
                "rumeet",
                "uthra2",
                "uthra3",
                "TestuserlongnameTestTestTest1",
                "anuja1",
                "uthra4",
                "uthra5",
                "uthra6",
                "uthra7",
                "sanjit1",
                "karthik",
                "chiranjeevi",
                "manjuk",
                "uthra8",
                "shilpa",
                "mgr",
                "deuser",
                "dvuser",
                "uwuser",
                "isuser",
                "de1",
                "dv1",
                "uw1",
                "is1",
                "manager",
                "anujaa",
                "xyz",
                "anuja123",
                "dsia123",
                "dsia1234",
                "dsia786",
                "uthrareg7041",
                "uthrareg7042",
                "uthrareg7043",
                "AutomationDE",
                "AutomationDV",
                "AutomationUW",
                "pruhkuser1",
                "rajashekhar",
                "sonali",
                "anil",
                "rajashekar",
                "dave",
                "narenderp",
                "narender1",
                "narender2",
                "narender9",
                "anuja9",
                "anuja8",
                "narender7",
                "TD1",
                "TD2",
                "TD3",
                "TD4",
                "narender8",
                "narender4",
                "pshilpa",
                "anand",
                "narender3",
                "narender5",
                "narender6",
                "anandc",
                "user1",
                "wali",
                "walimanager",
                "raju",
                "vikrant",
                "situser1",
                "Shrusti",
                "raj",
                "vimal",
                "deepika",
                "pallavi",
                "arpita",
                "situser2",
                "1069",
                "chaitra",
                "priya",
                "prasana",
                "bharath",
                "shekar",
                "shrikant",
                "superuser",
                "rick",
                "msohaib",
                "nbappusr12",
                "upendra",
                "usr",
                "krupa1",
                "krupa2",
                "krupa3",
                "krupa4",
                "usr1",
                "raj1",
                "raj2",
                "raj3",
                "raj4",
                "raj5",
                "raj6",
                "naveend",
                "krupa6",
                "rajnayak1",
                "rajnayak2",
                "rajnayak3",
                "rajnayak4",
                "rajnayak5",
                "krupa7",
                "krupa8",
                "rajnayak7",
                "krupa9",
                "Anu1",
                "anu2",
                "anu3",
                "anu4",
                "promad",
                "lizo",
                "sheena",
                "user2",
                "user3",
                "user4",
                "user5",
                "ammu1",
                "ammu2",
                "ammu3",
                "ammu4",
                "ammu5",
                "nischal1",
                "nischal2",
                "ammu6",
                "user6",
                "anika1",
                "anika2",
                "anika3",
                "newuser",
                "denis",
                "Jane",
                "nischalm1",
                "nischalm2",
                "ram1",
                "ram2",
                "ram3",
                "ram4",
                "Mohammed Moinuddin Nawazi ur rahman",
                "Mohammed Moinuddin N",
                "adam",
                "ecmadmin",
                "billy",
                "faf",
                "duminy",
                "kyle",
                "srikanth",
                "trump",
                "pramod",
                "test1",
                "tom",
                "AWPL",
                "Kelly",
                "carl",
                "hudson",
                "rusr1",
                "sshilpasri",
                "rusr2",
                "rusr3",
                "rmgr",
                "smgr",
                "susr1",
                "susr2",
                "susr3",
                "carln",
                "hudsonn",
                "kellyn",
                "ayub",
                "JamesKR",
                "WatsonJ",
                "kevin",
                "temp",
                "victor",
                "pete",
                "postgres",
                "pete2",
                "pete3",
                "pete4",
                "pete5",
                "pete6",
                "ajith",
                "smith",
                "srikanth_S_",
                "srikanth_T_",
                "RickyWJ",
                "Mervin.Jack",
                "Naga",
                "Randy",
                "raM",
                "ROCK",
                "Jolie",
                "Niro",
                "robert",
                "srikanth1",
                "AjItH1",
                "De.User7",
                "De.User10",
                "De.User13",
                "De.User3",
                "De.User16",
                "De.User6",
                "De.User19",
                "De.User9",
                "De.User20",
                "De.User12",
                "De.User2",
                "De.User15",
                "De.User5",
                "De.User18",
                "De.User8",
                "De.User11",
                "De.User1",
                "De.User14",
                "De.User4",
                "De.User17",
                "Dv.User20",
                "Dv.User10",
                "Dv.User11",
                "Dv.User12",
                "Dv.User13",
                "Dv.User1",
                "Dv.User14",
                "Dv.User15",
                "Dv.User2",
                "Dv.User16",
                "Dv.User3",
                "Dv.User4",
                "Dv.User17",
                "Dv.User5",
                "Dv.User18",
                "Dv.User19",
                "Dv.User6",
                "Dv.User7",
                "Dv.User8",
                "Dv.User9",
                "Uw.User7",
                "Uw.User8",
                "Uw.User9",
                "Uw.User20",
                "Uw.User10",
                "Uw.User11",
                "Uw.User12",
                "Uw.User13",
                "Uw.User1",
                "Uw.User14",
                "Uw.User15",
                "Uw.User2",
                "Uw.User16",
                "Uw.User3",
                "Uw.User4",
                "Uw.User17",
                "Uw.User18",
                "Uw.User5",
                "Uw.User19",
                "Uw.User6",
                "Is.User1",
                "Is.User2",
                "Is.User3",
                "Is.User4",
                "Is.User5",
                "Is.User6",
                "Is.User7",
                "Is.User8",
                "Is.User9",
                "Is.User20",
                "Is.User10",
                "Is.User11",
                "Is.User12",
                "Is.User13",
                "Is.User14",
                "Is.User15",
                "Is.User16",
                "Is.User17",
                "Is.User18",
                "Is.User19",
                "Mgr.User10",
                "Mgr.User11",
                "Mgr.User12",
                "Mgr.User13",
                "Mgr.User14",
                "Mgr.User15",
                "Mgr.User16",
                "Mgr.User17",
                "Mgr.User18",
                "Mgr.User19",
                "Mgr.User1",
                "Mgr.User2",
                "Mgr.User3",
                "Mgr.User4",
                "Mgr.User5",
                "Mgr.User6",
                "Mgr.User7",
                "Mgr.User8",
                "Mgr.User9",
                "Mgr.User20",
                "TestUser",
                "marvin.jack",
                "VIMALV",
                "ramling",
                "AutomationUser01",
                "Automationuser",
                "automationUser03",
                "automationuser04",
                "Automation_User01",
                "Automation@User02",
                "Automation&User03",
                "Automation$User04",
                "Automation\\User05",
                "AJTEST",
                "NOUGAT",
                "SONY",
                "ntuc",
                "navi",
                "obama",
                "shine",
                "amy",
                "Mary",
                "fazer",
                "moto",
                "dnavin",
                "ddnavin",
                "dvnavin",
                "dkvnavin",
                "ddunavin",
                "pacstest",
                "dummy",
                "negi",
                "subrat",
                "vinod",
                "pali",
                "nishanth",
                "sachin",
                "tim",
                "Raid.Lee.Bruce.Chang",
                "johnraju",
                "rampal",
                "jac-mery",
                "srisha",
                "amits",
                "rtest",
                "harry",
                "bpm-oly",
                "nonworkflowuser",
                ".-_!#$%^&()",
                "testnew",
                "testnew1",
                "sonali2",
                "navee3",
                "Lizo1",
                "SSrikanth",
                "edward"
            ],
            firstName: '',
            lastName: '',
            templateType: '',
            imageData: '',
            index: null,
            open: false,
            message: '',
            inputVal: "",
            openDialog: false,
            viewImageData: "",
            columnNames: ["Select", "First Name", "Last Name", "IsDefault", "Actions"],
            apiData: [
                {
                    letterType: "auj",
                    firstName: 'dataentry',
                    lastName: 'concent',
                    templateType: "LETTER",
                    letterTemplate: ""
                },
                {
                    letterType: "backdating1234",
                    firstName: '234dataentry',
                    lastName: 'concent234',
                    templateType: "EMAIL",
                    letterTemplate: ""
                },
                {
                    letterType: "skye",
                    firstName: '234dataentry',
                    lastName: 'concent234',
                    templateType: "EMAIL",
                    letterTemplate: ""
                }
            ]
        };

    }
    componentDidMount() {
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
            case "firstName":
                this.setState({ firstName: val });
                break;
            case "lastName":
                this.setState({ lastName: val });
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
            firstName: '',
            lastName: '',
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
            firstName: newState[0].firstName,
            lastName: newState[0].lastName,
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
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

    handleDropDownChange = (userName) => {
        this.setState({ userName })
    }

    handleCheckBoxChange = (e) => {
        console.log(e);
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
                        <h3 className={classes.title}>Create Signature Template</h3>
                    </Grid>
                    <Grid item xs={12} className={classes.userName}>
                        <DropDown
                            placeholder="User Name"
                            dropDownValue={this.state.userName}
                            dropDownList={this.state.userNameList}
                            handleDropDownChange={this.handleDropDownChange}
                        />

                        {/* <TextInput
                            id="templateName"
                            placeholder="Letter Template Name"
                            handleTextChange={this.handleTemplateNameChange}
                            inputValue={this.state.templateName}
                        /> */}
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            id="firstName"
                            placeholder="First Name"
                            handleTextChange={this.handleTemplateNameChange}
                            inputValue={this.state.firstName}
                            labelWidth={80}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            id="lastName"
                            placeholder="Last Name"
                            handleTextChange={this.handleTemplateNameChange}
                            inputValue={this.state.lastName}
                            labelWidth={80}

                        />
                    </Grid>
                    {/* <Grid item xs={6}>
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

                    </Grid> */}
                    <Grid item xs={6}>
                        <FormLabel component="legend">Signature </FormLabel>
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
                                                        <tr key={item.firstName} style={{ textAlign: "center" }}>
                                                            {/* <td>{item.letterType}</td> */}
                                                            <td><Checkbox
                                                                checked={true}
                                                                onChange={this.handleCheckBoxChange()}
                                                                value="checkedB"
                                                                color="primary"
                                                            /></td>
                                                            <td style={{ verticalAlign: "middle" }}>{item.firstName}</td>
                                                            <td style={{ verticalAlign: "middle" }}>{item.lastName}</td>
                                                            {/* <td>{item.templateType}</td> */}
                                                            <td><Radio
                                                                checked={this.state.selectedValue === 'a'}
                                                                onChange={this.handleChange}
                                                                value="a"
                                                                name="radio-button-demo"
                                                                aria-label="A"
                                                            /></td>
                                                            <td style={{ verticalAlign: "middle" }}>
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
                            onClick={() => { this.setState({ open: false }) }}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

SignatureTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignatureTemplate);
