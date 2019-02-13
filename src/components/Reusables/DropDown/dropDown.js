import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class DropDown extends React.Component {
    state = {
        labelWidth: 80,
    };

    componentDidMount() {
        // this.setState({
        //     labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        // });
    }

    handleChange = event => {
        console.log(event.target.value);
        this.props.handleDropDownChange(event.target.value);
    };

    render() {
        const { classes } = this.props;
        console.log(this.state);
        return (
            <div style={{width : "100%"}}>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-native-simple"
                    >
                        {this.props.placeholder}
                    </InputLabel>
                    <Select
                        native
                        value={this.props.dropDownValue}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                name="age"
                                labelWidth={this.state.labelWidth}
                                id="outlined-age-native-simple"
                            />
                        }
                    >
                        <option value="" />
                        {
                            this.props.dropDownList ? this.props.dropDownList.map((item, index) => {
                                return <option key={item + index} value={item}>{item}</option>
                            }) : null
                        }
                    </Select>
                </FormControl>
            </div>
        );
    }
}

DropDown.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DropDown);