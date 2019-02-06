import React, { Component, Fragment } from 'react';
import $ from "jquery";
import DataTable from 'datatables'
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css'
import Icon from '@material-ui/core/Icon';

class Table extends Component {

    componentDidMount() {
        $(document).ready(function () {
            $('#dtVerticalScrollExample').DataTable({
                "scrollY": "300px",
                "scrollCollapse": true,
            });
            $('.dataTables_length').addClass('bs-select');
        });
    }

    handleDelete = (e, index) => {
        this.props.handleDelete(e, index);
    }
    handleEdit = (e, index) => {
        this.props.handleEdit(e, index);
    }

    render() {
        return (
            <div>
                <table id="dtVerticalScrollExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
                    <thead>
                        <tr>
                            {
                                this.props.columnNames.map(columnName => {
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
                    <tbody>
                        {
                            this.props.tableData ? this.props.tableData.map((item, index) => {
                                return (
                                    <tr key={item.letterType + item.category + item.subCategory}>
                                        <td>{item.letterType}</td>
                                        <td>{item.category}</td>
                                        <td>{item.subCategory}</td>
                                        <td>{item.templateType}</td>
                                        <td >
                                            <Icon className='action'>crop_original</Icon>
                                            <Icon className='action' onClick={(e) => { this.props.handleEdit(e, index) }}>edit</Icon>
                                            <Icon className='action' onClick={(e) => { this.props.handleDelete(e, index) }}>delete</Icon>
                                        </td>
                                    </tr>
                                );
                            }) : null
                        }
                    </tbody>
                </table>

            </div >
        );
    }
}

export default Table;