const db = require('../models')
const Student = db.students

exports.create = (req, res) => {
    if(!req.body.code) {
        res.status(400).json({ message: "Content can not be empty!" })
        return;
    }

    // Create a student
    const student = new Student(
        {
            code: req.body.code,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        }
    );

    student
        .save(student)
        .then(data => {
            res.json(data)
        })
        .catch(err =>{
            res.status(500)
                .json({ message: err.message || "Some error occurred while creating the student." })
        })
}

exports.findAll = (req, res) => {
    Student.find()
    .then(data => {
        res.json(data) // response to frontend
    })
    .catch(err =>{
        res.status(500)
            .json({ message: err.message || "Some error occurred while creating the student." })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Student.findById(id)
    .then(data => {
        if(!data){
            res.status(404).json({message:"Not found!"})
        }
        else{
            res.json(data)
        }
    })
    .catch(err => {
        res.status(500).json({message: "Error retrieving data!"})
    })
}

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).json({
            message:"Data to update cannot be empty!"
        })
    }

    const id = req.params.id

    Student.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).json({
                message: `Cannot update data with id=${id}`
            })
        }
        else{
            res.json({message: "Data was updated successfully."})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Error updating data!"})
    })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Student.findByIdAndRemove(id, {useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).json({
                message: `Cannot delete data with id=${id}`
            })
        }
        else{
            res.json({message: "Data was deletted successfully."})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Cannot delete data!"})
    })
}