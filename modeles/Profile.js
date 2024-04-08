const mongoose = require('mongoose');
const { Schema } = mongoose;
const   User = require('./User')


const profileSchema = new Schema({
    descriptionProfile: {
        type: String,
        //required: true

    },
    user:[
        {type: Schema.Types.ObjectId, ref: 'User'}
    ],
})
//creation du model Person
const Profile = mongoose.model('Profile', profileSchema);
//création d'une personne
// var profile = new Profile({
//     descriptionProfile: 'Admin',     
//     user: ['660d4902394c6d5c06225f36']
//  });

//  //enregistrement de la personne dans la BD
//  profile
//      .save()
//      .then(console.log('Profile enregistrée avec succès.'))
//      .catch(err => {
//          console.error(err)
//      })
//recherche toutes les personnes
// Profile
//     .find()
//     .then(docs => {
//         console.log('Profiles trouvées.',docs)
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

module.exports = mongoose.model('Profile', profileSchema)