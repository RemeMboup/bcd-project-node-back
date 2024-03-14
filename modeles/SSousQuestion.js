const mongoose = require('mongoose')
const {Schema} = mongoose
const  SousQuestion = require('./SousQuestion')

const AuditQuestion = require('./AuditQuestion')

const sSousQuestionSchema = new Schema({
    numeroSSousQuestion: {
        type: String
    },
    description: {
        type: String
    },
    sousQuestion:[
        {type: Schema.Types.ObjectId, ref:'SousQuestion'}
    ],
    
    
})
const SSousQuestion = mongoose.model('SSousQuestion', sSousQuestionSchema)

// var ssousQuestion = new SSousQuestion({
//     numeroSSousQuestion: 'A.5.1.1',
//     description: 'Politiques de sécurité de l\'information',
//     sousQuestion: '65e9f83c6918c3340662d1c4'

// })
// // ajout dans la bd
// ssousQuestion
//     .save()
//     .then(console.log('SSousQuestion enregistre avec succes'))
//     .catch(err => {
//         console.error(err);
//     })

//Methode pour supprimer un objet par son id
// var id_ssous_question = "65e9ec7205501a0297c17291"
// SSousQuestion.deleteOne({ _id: id_ssous_question }).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });
 
module.exports = mongoose.model('SSousQuestion', sSousQuestionSchema)