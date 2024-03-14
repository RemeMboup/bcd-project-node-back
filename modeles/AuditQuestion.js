const mongoose = require('mongoose')
const {Schema} = mongoose
const  SSousQuestion = require('./SSousQuestion')


const auditQuestionSchema = new Schema({
    description: {
        type: String
    },
    ssousQuestion:[
        {type: Schema.Types.ObjectId, ref:'SSousQuestion'}
    ]
})
const AuditQuestion = mongoose.model('AuditQuestion', auditQuestionSchema)

// var auditQuestion = new AuditQuestion({
//     description: 'Existe-t-il des politiques de sécurité ?',
//     ssousQuestion: '65e9f8e8291cf1deaef112f0'

// })
// // ajout dans la bd
// auditQuestion
//     .save()
//     .then(console.log('AuditQuestion enregistre avec succes'))
//     .catch(err => {
//         console.error(err);
//     })


 
module.exports = mongoose.model('AuditQuestion', auditQuestionSchema)