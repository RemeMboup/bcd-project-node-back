const mongoose = require('mongoose');
const { Schema } = mongoose;
const   Projet = require('./Projet')
const   AuditQuestion = require('./AuditQuestion')


const detailProjetAuditSchema = new Schema({
    projet:[
        {type: Schema.Types.ObjectId, ref: 'Projet'}
    ],
    auditQuestion:[
        {type: Schema.Types.ObjectId, ref: 'AuditQuestion'}
    ],
})
//creation du model Person
const DetailProjetAudit = mongoose.model('DetailProjetAudit', detailProjetAuditSchema);
//création d'une personne
var detailProjetAudit = new DetailProjetAudit({    
    projet: ['660d62481f3fd5a5a232dff6'],
    auditQuestion: ['6602e853e4a2112e5175af02'],

 });

 //enregistrement de la personne dans la BD
 detailProjetAudit
     .save()
     .then(console.log('DetailProjetAudit enregistrée avec succès.'))
     .catch(err => {
         console.error(err)
     })
//recherche toutes les personnes
// detailProjetAudit
//     .find()
//     .then(docs => {
//         console.log('DetailProjetAudits trouvées.',docs)
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

module.exports = mongoose.model('DetailProjetAudit', detailProjetAuditSchema)