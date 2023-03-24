import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export default class Studentlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        this.getAllStudents()
    }

    getAllStudents() {
        axios.get('http://localhost:5000/students/')
        .then(res => {
            this.setState({
                students: res.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    deleteStudent = (id) => {
        axios.delete('http://localhost:5000/students/delete-student/' + id)
        .then((res) => {
            this.getAllStudents()
        })
        .catch((error) => {
            console.log(error)
        })
    }

  render() {
    return (
      <div>
        <h5>Student Management</h5>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Code</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {this.state.students.map((res, index) => (
                <tr key={res._id}>
                    <td>{index + 1}</td>
                    <td>{res.code}</td>
                    <td>{res.firstname}</td>
                    <td>{res.lastname}</td>
                    <td>{res.email}</td>
                    <td>
                        <Link className='btn btn-warning btn-sm' 
                        to={'/edit-student/' + res._id}>Edit</Link>
                        {' '}
                        <Button className='btn btn-danger btn-sm' onClick={() => { window.confirm('Are you sure you want to delete this item?') && this.deleteStudent(res._id)}}>
                            Delete
                        </Button>
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>
      </div>
    )
  }
}
