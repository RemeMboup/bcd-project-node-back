const mongoose = require('mongoose')
const  { Schema }= mongoose



const  sousQuestionSchema = new Schema({
    description: {
        type: String
    },
    reference: {
        type: String,
        unique: true
        
    },

})


//const SousQuestion =  mongoose.model('SousQuestion', sousQuestionSchema)

// creation d'une sousQuestion
// var sousQuestion = new SousQuestion({
//     id:1,
//     description: 'Orientations de la direction en matière de sécurité de l’information',
//     question: '65efa6316e667cc10532d4fe',
//     numeroSousQ: "A.6.1"
    

// })
// // ajout dans la bd
// sousQuestion
//     .save()
//     .then(console.log('SousQuestion enregistre avec succes'))
//     .catch(err => {
//         console.error(err);
//     })

// Trouver la liste de tous sousQuestion

// sousQuestion
//             .find()
//             .then(docs => {
//                 console.log('La liste des sousQuestion trouvées est:', docs);
//             })
//             .catch(err => {
//                 console.error(err);
//             })

//Methode pour supprimer un objet par son id
//  var id_sous_question = "65e9e37647b54314a21a1664"
//  SousQuestion.deleteOne({ _id: id_sous_question }).then(function(){
//      console.log("Data deleted"); // Success
//  }).catch(function(error){
//      console.log(error); // Failure
//  });

module.exports = mongoose.model('SousQuestion', sousQuestionSchema)