const mongoose = require('mongoose');
const { Schema } = mongoose;


const typeUserSchema = new Schema({
    description: {
        type: String,
        //required: true
    }
})
//creation du model Person
const TypeUser = mongoose.model('TypeUser', typeUserSchema);
//création d'une personne
// var typeUser = new TypeUser({
//     description: 'Corporate',     
//  });

//  //enregistrement de la personne dans la BD
//  typeUser
//      .save()
//      .then(console.log(' Type Utilisateur enregistrée avec succès.'))
//      .catch(err => {
//          console.error(err)
//      })
//recherche toutes les personnes
// TypeUser
//     .find()
//     .then(docs => {
//         console.log(' Type Utilisateurs trouvées.',docs)
//     })
//     .catch(err => {
//         console.error(err)
//     })

//Methode pour supprimer un objet par son id
//  var id_user = "65ddeab8635b6021a58f32e2"
//  User.deleteOne({ _id: id_user }).then(function(){
//      console.log("Data deleted"); // Success
//  }).catch(function(error){
//      console.log(error); // Failure
//  });

module.exports = mongoose.model('TypeUser', typeUserSchema)