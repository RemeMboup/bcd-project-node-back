const mongoose = require('mongoose');
const { Schema } = mongoose;


const questionSchema = new Schema({
    id: {
        type: Number,
        unique: true // Assurez-vous que chaque ID est unique
      },
    numeroQuestion: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    }
})

// Définir un middleware pour le post-save
// questionSchema.post('save', function(doc) {
//     // Mise à jour du statut pour le document nouvellement enregistré
//     if (doc.isNew) {
//         //doc.numeroQuestion = 'A.'+doc.id.toString();
//         doc.numeroQuestion = 'A.6';
//         doc.save(); // Enregistrer à nouveau le document avec le statut mis à jour
//     }
// });

//creation du model Question
// var question = new Question({
//     numeroQuestion: 'A.5',     
//     description: 'Politiques de sécurité de l’information',
    
//  });

//  //enregistrement de la personne dans la BD
//  question
//      .save()
//      .then(console.log('Question enregistrée avec succès.'))
//      .catch(err => {
//          console.error(err)
//      })
//recherche toutes les personnes
// question
//         .find()
//         .then(docs => {
//             console.log('Question trouvées.',docs)
//         })
//         .catch(err => {
//             console.error(err)
//         })

//Methode pour supprimer un objet par son id
//  var id_question = "65e9f1d2353c6f1fc4177925"
//  Question.deleteOne({ _id: id_question }).then(function(){
//      console.log("Data deleted"); // Success
//  }).catch(function(error){
//      console.log(error); // Failure
//  });
//création d'une question
module.exports = mongoose.model('Question', questionSchema)