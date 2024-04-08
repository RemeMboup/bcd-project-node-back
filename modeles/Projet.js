const mongoose = require('mongoose');
const { Schema } = mongoose;
const   User = require('./User')


const projetSchema = new Schema({
    descriptionProjet: {
        type: String,
        //required: true

    },
    user:[
        {type: Schema.Types.ObjectId, ref: 'User'}
    ],
})
//creation du model Person
const Projet = mongoose.model('Projet', projetSchema);
//création d'une personne
// var projet = new Projet({
//     descriptionProjet: 'Projet 1',     
//     user: ['660d4902394c6d5c06225f36']
//  });

//  //enregistrement de la personne dans la BD
//  projet
//      .save()
//      .then(console.log('Projet enregistrée avec succès.'))
//      .catch(err => {
//          console.error(err)
//      })
//recherche toutes les personnes
Projet
    .find()
    .then(docs => {
        console.log('Projets trouvées.',docs)
    })
    .catch(err => {
        console.error(err)
    })

//Methode pour supprimer un objet par son id
//  var id_user = "65ddeab8635b6021a58f32e2"
//  User.deleteOne({ _id: id_user }).then(function(){
//      console.log("Data deleted"); // Success
//  }).catch(function(error){
//      console.log(error); // Failure
//  });

module.exports = mongoose.model('Projet', projetSchema)