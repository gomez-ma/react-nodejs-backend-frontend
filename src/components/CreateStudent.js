import React, { Component } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from './common/with-router'

class CreateStudent extends Component {
  constructor(props) {
    super(props)

    //this.onChangeStudentCode = this.onChangeStudentCode.bind(this)
    //this.onChangeStudentFirstname = this.onChangeStudentFirstname.bind(this)
    //this.onChangeStudentLastname = this.onChangeStudentLastname.bind(this)
    //this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this)
    //this.onSubmit = this.onSubmit.bind(this)

    this.state = {
        code: '',
        firstname: '',
        lastname: '',
        email: ''
    }

  }

  onChangeStudentCode = (e) => {
    this.setState({ code: e.target.value })
  }

  onChangeStudentFirstname = (e) => {
    this.setState({ firstname: e.target.value })
  }

  onChangeStudentLastname = (e) => {
    this.setState({ lastname: e.target.value })
  }

  onChangeStudentEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const studentObject = {
        code: this.state.code,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email
    }
    axios.post('http://localhost:5000/students/create-student', studentObject)
    .then(res => {
        console.log(res.data)
    })
    .catch(error => {
        console.log(error)
    })

    this.setState({code:'', firstname:'', lastname:'', email:''})

    //window.location.replace('./student-list')
    this.props.router.navigate('/student-list')
  }
  
   render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
            <Form.Group>
                <Form.Label>Code</Form.Label>
                <Form.Control type='text' value={this.state.code} onChange={this.onChangeStudentCode} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Firstname</Form.Label>
                <Form.Control type='text' value={this.state.firstname} onChange={this.onChangeStudentFirstname} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Lastname</Form.Label>
                <Form.Control type='text' value={this.state.lastname} onChange={this.onChangeStudentLastname} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' value={this.state.email} onChange={this.onChangeStudentEmail} />
            </Form.Group>
            <Form.Group className="text-center mt-3">
                <Button variant='primary' type='submit'>
                    Create
                </Button>
            </Form.Group>
        </Form>
      </div>
    )
  }
}

export default withRouter(CreateStudent)