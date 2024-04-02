const mongoose = require('mongoose')
const {Schema} = mongoose

const sSousQuestionSchema = new Schema({
    reference: {
        type: String,
        unique: true
    },
    description: {
        type: String
    }
    
    
})
//const SSousQuestion = mongoose.model('SSousQuestion', sSousQuestionSchema)
// ajout d'un nouveau ssouquestion
// var ssousQuestion = new SSousQuestion({
//     numeroSSousQuestion: 'A.5.1.1',
//     description: 'Politiques de sécurité de l\'information',
//     sousQuestion: '65f42935dd6833cabca7c9d6'

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