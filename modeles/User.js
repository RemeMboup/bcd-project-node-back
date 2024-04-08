const mongoose = require('mongoose');
const { Schema } = mongoose;
const   TypeUser = require('./TypeUser')


const userSchema = new Schema({
    username: {
        type: String,
        //required: true
    },
    password: {
        type: String,
        //required: true

    },
    email: {
        type : String,
        //required: true,
        unique: true

    },
    typeUser:[
        {type: Schema.Types.ObjectId, ref: 'TypeUser'}
    ],
})
//creation du model Person
const User = mongoose.model('User', userSchema);
//création d'une personne
// var user = new User({
//     username: 'Mareme Mboup',     
//     password: 'Mareme123',
//     email: 'marememboup93@gmail.com',
//     typeUser: ['660d4598eff8f9caf6892782']
//  });

//  //enregistrement de la personne dans la BD
//  user
//      .save()
//      .then(console.log('Utilisateur enregistrée avec succès.'))
//      .catch(err => {
//          console.error(err)
//      })
//recherche toutes les personnes
User
    .find()
    .then(docs => {
        console.log('Utilisateurs trouvées.',docs)
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

module.exports = mongoose.model('User', userSchema)