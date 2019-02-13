import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { styles } from './TextInputCss';


class TextInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = event => {
        this.props.handleTextChange(event.target.value, this.props.id || "none");
    };


    render() {

        const { classes } = this.props;
        return (

            <FormControl className={classes.formControl} variant="outlined">
                <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    htmlFor="component-outlined"
                >
                    {this.props.placeholder}
                </InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    value={this.props.inputValue || ""}
                    onChange={(e) => this.handleInputChange(e)}
                    labelWidth={this.props.labelWidth}
                />
            </FormControl>
        );
    }
}

TextInput.propTypes = {
    classes: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    handleTextChange: PropTypes.func,
    inputValue: PropTypes.string,
};

export default withStyles(styles)(TextInput);
