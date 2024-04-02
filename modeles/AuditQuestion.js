const mongoose = require('mongoose')
const {Schema} = mongoose
//const  SSousQuestion = require('./SSousQuestion')


const auditQuestionSchema = new Schema({
    reference: {
        type: String,
        //unique: true
    },
    description: {
        type: String,
    }
})
const AuditQuestion = mongoose.model('AuditQuestion', auditQuestionSchema)
// creation d'un nouveau audit question
// var auditQuestion = new AuditQuestion({
//     id: 1,
//     description: 'Existe-t-il des politiques de sécurité ?',
//     ssousQuestion: '65f4384933fdf9f4769263b7'

// })
// // ajout dans la bd
// auditQuestion
//     .save()
//     .then(console.log('AuditQuestion enregistre avec succes'))
//     .catch(err => {
//         console.error(err);
//     })

module.exports = mongoose.model('AuditQuestion', auditQuestionSchema)
 

//deuxieme methode
// const mongoose = require('mongoose');
// const SSousQuestion = require('./SSousQuestion')
// const {Schema} = mongoose
// // const  SSousQuestion = require('./SSousQuestion')
// const autoIncrement = require('mongoose-auto-increment');

// // Connexion à MongoDB
// const uri = 'mongodb+srv://marememboup93:Mareme123@cluster0.qkloi9m.mongodb.net/';

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// // Initialisation de mongoose-auto-increment
// autoIncrement.initialize(db);

// // Définition du schéma Mongoose avec _id comme un entier auto-incrémenté
// const auditQuestionSchema = new Schema({
//     reference:[
//         {type: Schema.Types.ObjectId, ref: 'SSousQuestion'}
//       ],
//     description: String
//     // Autres champs si nécessaire
// });

// // Création du modèle Mongoose à partir du schéma
// const AuditQuestion = mongoose.model('AuditQuestion', auditQuestionSchema);
// module.exports = mongoose.model('AuditQuestion', auditQuestionSchema)

// Appliquer le plugin autoIncrement au schéma
//auditQuestionSchema.plugin(autoIncrement.plugin, { model: 'AuditQuestion', field: '_id', startAt: 1 });

// Exemple d'utilisation pour créer un nouveau document
// const nouvelleQuestion = new AuditQuestion({
//     reference: '65fc3f4fd2ac8be5c77d8b9d',
//     description: 'Politiques de sécurité de l\'information'
// });

// // Enregistrement du nouveau document dans la base de données
// nouvelleQuestion.save((err, question) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('Nouvelle question enregistrée avec _id:', question._id);
//     }
// });

