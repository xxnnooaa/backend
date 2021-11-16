const mongoose = require('mongoose')
const employee = new mongoose.Schema({
    empID: { type: String },
    name: { type: String },
    position: { type: String },
    department: { type: String },
    company: { type: String },
    start_date: { type: String }
})

module.exports = mongoose.model('employee', employee)