module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            code: String,
            firstname: String,
            lastname: String,
            email:String
        },
        {
            timestamps: true
        }
    );

    const Student = mongoose.model("student", schema)
    return Student
}