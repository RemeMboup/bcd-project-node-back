require('dotenv').config({path:'./config/.env'})
require('./config/db')
const express = require('express')
const app = express()
app.use(express.json())
//Importation du bibliotheque jwt(obtention du token)
const jwt = require('jsonwebtoken');
//Biblotheque pour crypter des donnees comme le mot de passe par exemple
const bcrypt = require('bcrypt');
//importation des models
const User = require('./modeles/User')
const Question = require('./modeles/Question')
const SousQuestion = require('./modeles/SousQuestion')
const SSousQuestion = require('./modeles/SSousQuestion')
const AuditQuestion = require('./modeles/AuditQuestion')
const TypeUser = require('./modeles/TypeUser')
const Profile = require('./modeles/Profile')
const Projet = require('./modeles/Projet')
const DetailProjetAudit = require('./modeles/DetailProjetAudit')

const mongoose = require('mongoose')
// CORS headerS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Charger les question global
// const fs = require('fs');
// const csv = require('csv-parser');

// // const { MongoClient } = require('mongodb');

// const MongoClient = require('mongodb').MongoClient;

// // Connexion à MongoDB
// const uri = 'mongodb+srv://marememboup93:Mareme123@cluster0.qkloi9m.mongodb.net/';

// async function main() {
//     try {
//         // Connexion à la base de données
//         //await client.connect();
//         const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// //         const db = client.db(dbName);
//         const database = client.db('test');
//         const collection = database.collection('questions');

//         // Spécifiez le chemin vers le fichier Excel ou CSV
//         const filePath = './question.csv'; // ou 'chemin_vers_votre_fichier.xlsx'

//         // Charger le fichier et insérer les données dans MongoDB
//         fs.createReadStream(filePath)
//             .pipe(csv()) // Utiliser csv-parser pour les fichiers CSV
//             .on('data', async (data) => {
//                 // Insérer chaque ligne du CSV dans la collection MongoDB
//                 const document = {
//                     reference: "Politiques de sécurité de l’information",
//                     description: data.description
//                 };
//                 console.log();
//                 await collection.insertOne(document);
//             })
//             .on('end', () => {
//                 console.log('Les données ont été chargées avec succès dans la collection MongoDB.');
//             });
//     } catch (error) {
//         console.error('Une erreur s\'est produite :', error);
//     }
// }

// // Fonction d'initialisation
// async function initialize() {
//   //const uri = 'mongodb+srv://marememboup93:Mareme123@cluster0.qkloi9m.mongodb.net/';

//   const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // Connexion à MongoDB
//   try {
   
//       await main(); // Charger les données après la connexion réussie
//   } finally {
//       // Assurez-vous de fermer la connexion à MongoDB lorsque vous avez fini
//       await client.close();
//   }
// }

// initialize(); // Appel de la fonction d'initialisation
//Methodes pour enregistrer les questions global
const fs = require('fs');
const csv = require('fast-csv');
const { MongoClient } = require('mongodb');

// Connexion à MongoDB
const uri = process.env.MONGO_URI
//const uri = 'mongodb+srv://marememboup93:Mareme123@cluster0.qkloi9m.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Fonction pour insérer les questions dans la collection MongoDB
// async function insertQuestions(docs) {
//     try {
//         await client.connect();
//         const database = client.db('test');
//         const collection = database.collection('questions');
//         await collection.insertMany(docs);
//         console.log('Les documents ont été insérés avec succès dans la collection MongoDB.');
//     } catch (error) {
//         console.error('Une erreur s\'est produite :', error);
//     } finally {
//         await client.close();
//     }
// }

// // Lire le fichier CSV et insérer les documents dans MongoDB
// const csvQuestionPath = './mesReferences/question.csv';
// const questionLists= [];

// fs.createReadStream(csvQuestionPath)
//     .pipe(csv.parse({ delimiter: ';' })) // Spécifier le délimiteur comme point-virgule
//     .on('error', error => console.error(error))
//     .on('data', row => {
//         // Créer un document à partir des données de chaque ligne
//         const document = {
//             reference: row[0], // Supposant que le premier champ est 'numeroQuestion'
//             description: row[1]    // Supposant que le deuxième champ est 'description'
//             // Ajoutez d'autres champs si nécessaire
//         };
//         questionLists.push(document);
//     })
//     .on('end', () => {
//         // Une fois que toutes les lignes ont été lues, insérez les documents dans MongoDB
//         insertQuestions(questionLists);
//     });

// Fonction pour insérer les sousquestions dans la collection MongoDB
// async function insertSousQuestions(docs) {
//     try {
//         await client.connect();
//         const database = client.db('test');
//         const collection = database.collection('sousquestions');
//         await collection.insertMany(docs);
//         console.log('Les documents ont été insérés avec succès dans la collection MongoDB.');
//     } catch (error) {
//         console.error('Une erreur s\'est produite :', error);
//     } finally {
//         await client.close();
//     }
// }

// // Lire le fichier CSV et insérer les documents dans MongoDB
// const csvSousQuestionPath = './mesReferences/sousQuestion.csv';
// const sousQuestionLists = [];

// fs.createReadStream(csvSousQuestionPath)
//     .pipe(csv.parse({ delimiter: ';' })) // Spécifier le délimiteur comme point-virgule
//     .on('error', error => console.error(error))
//     .on('data', row => {
//         // Créer un document à partir des données de chaque ligne
//         const document = {
//             reference: row[0], // Supposant que le premier champ est 'numeroQuestion'
//             description: row[1]    // Supposant que le deuxième champ est 'description'
//             // Ajoutez d'autres champs si nécessaire
//         };
//         sousQuestionLists.push(document);
//     })
//     .on('end', () => {
//         // Une fois que toutes les lignes ont été lues, insérez les documents dans MongoDB
//         insertSousQuestions(sousQuestionLists);
//     });
// Fonction pour insérer les ssousquestions dans la collection MongoDB
// async function insertSSousQuestions(docs) {
//     try {
//         await client.connect();
//         const database = client.db('test');
//         const collection = database.collection('ssousquestions');
//         await collection.insertMany(docs);
//         console.log('Les documents ont été insérés avec succès dans la collection MongoDB.');
//     } catch (error) {
//         console.error('Une erreur s\'est produite :', error);
//     } finally {
//         await client.close();
//     }
// }

// // Lire le fichier CSV et insérer les documents dans MongoDB
// const csvSSousQuestionPath = './mesReferences/ssousQuestion.csv';
// const ssousQuestionLists = [];

// fs.createReadStream(csvSSousQuestionPath)
//     .pipe(csv.parse({ delimiter: ';' })) // Spécifier le délimiteur comme point-virgule
//     .on('error', error => console.error(error))
//     .on('data', row => {
//         // Créer un document à partir des données de chaque ligne
//         const document = {
//             reference: row[0], // Supposant que le premier champ est 'numeroQuestion'
//             description: row[1]    // Supposant que le deuxième champ est 'description'
//             // Ajoutez d'autres champs si nécessaire
//         };
//         ssousQuestionLists.push(document);
//     })
//     .on('end', () => {
//         // Une fois que toutes les lignes ont été lues, insérez les documents dans MongoDB
//         insertSSousQuestions(ssousQuestionLists);
//     });
//Fonction pour insérer les ssousquestions dans la collection MongoDB
async function insertAditQuestions(docs) {
    try {
        await client.connect();
        const database = client.db('test');
        const collection = database.collection('auditquestions');
        await collection.insertMany(docs);
        console.log('Les documents ont été insérés avec succès dans la collection MongoDB.');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    } finally {
        await client.close();
    }
}

// Lire le fichier CSV et insérer les documents dans MongoDB
const csvAuditQuestionPath = './mesReferences/auditQuestionV2.csv';
const auditQuestionLists = [];

fs.createReadStream(csvAuditQuestionPath)
    .pipe(csv.parse({ delimiter: ';' })) // Spécifier le délimiteur comme point-virgule
    .on('error', error => console.error(error))
    .on('data', row => {
        // Créer un document à partir des données de chaque ligne
        const document = {
            reference: row[0], // Supposant que le premier champ est 'reference'
            description: row[1]    // Supposant que le deuxième champ est 'description'
            // Ajoutez d'autres champs si nécessaire
        };
        auditQuestionLists.push(document);
    })
    .on('end', () => {
        // Une fois que toutes les lignes ont été lues, insérez les documents dans MongoDB
        insertAditQuestions(auditQuestionLists);
    });

//3 eme methode
// const fs = require("fs");
// const mongodb = require("mongodb").MongoClient;
// const fastcsv = require("fast-csv");

// // let url = "mongodb://username:password@localhost:27017/";
// let url = "mongodb+srv://marememboup93:Mareme123@cluster0.qkloi9m.mongodb.net/";
// let stream = fs.createReadStream("./question.csv");
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on("data", function(data) {
//     csvData.push({
//       reference: data[0],
//       description: data[1]
//     });
//   })
//   .on("end", function() {
//     // remove the first line: header
//     csvData.shift();

//     console.log(csvData);

//     mongodb.connect(
//       url,
//       { useNewUrlParser: true, useUnifiedTopology: true },
//       (err, client) => {
//         if (err) throw err;

//         client
//           .db("test")
//           .collection("questions")
//           .insertMany(csvData, (err, res) => {
//             if (err) throw err;

//             console.log(`Inserted: ${res.insertedCount} rows`);
//             client.close();
//           });
//       }
//     );
//   });

// stream.pipe(csvStream);

// const fs = require("fs");
// const mongodb = require("mongodb").MongoClient;
// const fastcsv = require("fast-csv");

// // let url = "mongodb://username:password@localhost:27017/";
// let url = "mongodb+srv://marememboup93:Mareme123@cluster0.qkloi9m.mongodb.net/";
// let stream = fs.createReadStream("./question.csv");
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on("data", function(data) {
//     csvData.push({
//       reference: data[0],
//       description: data[1],
//     });
//   })
//   .on("end", function() {
//     // remove the first line: header
//     csvData.shift();

//     console.log(csvData);

//     mongodb.connect(
//       url,
//       { useNewUrlParser: true, useUnifiedTopology: true },
//       (err, client) => {
//         if (err) throw err;

//         client
//           .db("test")
//           .collection("questions")
//           .insertMany(csvData, (err, res) => {
//             if (err) throw err;

//             console.log(`Inserted: ${res.insertedCount} rows`);
//             client.close();
//           });
//       }
//     );
//   });

// stream.pipe(csvStream);

const port = process.env.Port
app.listen(port, () => console.log(`Serveur is running at http://localhost:${port}`)
)




// Replace this with your actual secret key
const secretKey = 'your_secret_key';

// Function to verify user credentials
/*const authenticateUser = async (email, password) => {
  const user = User.findOne(u => u.email === email);
  if (!user) return false;

  const match = await bcrypt.compare(password, user.passwordHash);
  return match ? user : false;
};*/

// La liste des users
app.get('/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des utilisateurs :', err);
            res.status(500).send('Erreur lors de la récupération des utilisateurs');

        })
  });
// Route to handle user login
/*app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});*/

// Middleware pour vérifier l'unicité de l'adresse e-mail
const checkEmailUnique = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Vérifiez si l'adresse e-mail existe déjà dans la base de données
    const existingUser = await User.findOne({ email });

    // Si un utilisateur avec cet e-mail existe déjà, renvoyez une erreur
    if (existingUser) {
      return res.status(400).json({ error: 'Adresse e-mail déjà utilisée' });
    }

    // Si l'adresse e-mail est unique, passez au prochain middleware
    next();
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'unicité de l\'adresse e-mail:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créez un endpoint pour l'inscription d'un utilisateur.
app.post('/users', checkEmailUnique, async (req, res) => {
    //try {
    const body = req.body;
    const password = body.password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: body.username,
        password: hashedPassword,
        email: body.email 
    });
    await user.save()
        .then((user) => {
            res.status(201).json(user);

        })
            
   /* } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
    }*/
  })

app.post('/login', async (req, res) => {
    try {
      const email  = req.body.email;
      const password  = req.body.password;
      console.log(email)
      const user = await User.findOne({email});
      if (!user) {
          const err = new Error('User Not Found!')
          res.status(400).json({
            status: 'fail',
            message: err.message,
          })

      } else if (await bcrypt.compare(password, user.password)) {
          const tokenPayload = {
              email: user.email,
          };
          const accessToken = jwt.sign(tokenPayload, 'SECRET');
          res.status(201).json({
              status: 'success',
              message: 'User Logged In!',
              data: {
                  accessToken,
              },
              });
      } else {
          const err = new Error('Wrong Password!');
          res.status(400).json({
            status: 'fail',
            message: err.message,
          })
          }
        } catch (err) {
        res.status(err.status).json({
            status: 'fail',
            message: err.message,
          });
      }
});

app.get('/questions', (req, res) => {
  Question.find()
      .then(questions => {
          res.json(questions)
      })
      .catch((err) => {
          console.error('Erreur lors de la récupération des questions :', err);
          res.status(500).send('Erreur lors de la récupération des questions');

      })
});
//
app.get('/audit', (req, res) => {
  AuditQuestion.find()
      .then(auditQuestions => {
          res.json(auditQuestions)
      })
      .catch((err) => {
          console.error('Erreur lors de la récupération des questions  d\'audit:', err);
          res.status(500).send('Erreur lors de la récupération des questions d\'audit');

      })
});

// Créez un endpoint pour l'ajout d'un d'une question principale.
app.post('/questions',  async (req, res) => {
    try {
        const body = req.body;
        const question = new Question({
            id: body.id,
            numeroQuestion:"A."+(body.id).toString(),
            description: body.description,
            
        });
        await question.save()
            .then((question) => {
                res.status(201).json(question);

            })
              
      } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la question.' });
      }
    })
//charger la question principale ou global
// const fs = require('fs');
// const csv = require('csv-parser');
// const MongoClient = require('mongodb').MongoClient;

// // URL de connexion à la base de données MongoDB
// const url = 'mongodb+srv://marememboup93:Mareme123@cluster0.qkloi9m.mongodb.net/';
// // Nom de la base de données
// const dbName = 'audit-cybersecurity-db';
// // Nom de la collection
// const collectionName = "questions";

// // Chemin vers le fichier CSV
// const csvFilePath = './question.csv';

// // Fonction pour charger les données CSV dans MongoDB
// async function loadCSVDataToMongoDB() {
//     try {
//         // Connexion à MongoDB
//         const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         // Effacer la collection existante (optionnel)
//         await collection.deleteMany({});

//         // Lire le fichier CSV et insérer les données dans MongoDB
//         fs.createReadStream(csvFilePath)
//             .pipe(csv())
//             .on('data', (data) => {
//                 // Insérer chaque ligne du CSV dans la collection MongoDB
//                 collection.insertOne(data);
//             })
//             .on('end', () => {
//                 console.log('Les données ont été chargées avec succès dans la collection MongoDB.');
//                 client.close();
//             });
//     } catch (error) {
//         console.error('Une erreur s\'est produite :', error);
//     }
// }
// Appeler la fonction pour charger les données CSV dans MongoDB
// app.post('/questions',  async (req, res) => {
//     try {
//         const body = req.body;
//         const question = new Question({
//             id: body.id,
//             numeroQuestion:"A."+(body.id).toString(),
//             description: body.description,
            
//         });
//         await question.save()
//             .then((question) => {
//                 res.status(201).json(question);

//             })
              
//       } catch (error) {
//         res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la question.' });
//       }
//     })

//   async function retrouverObjetParID(id) {
//     try {
//         // Utilisez la méthode findById() pour trouver l'objet par son ID
//         const objet = await SousQuestion.findById(id);
//         console.log(objet)

//         // Vérifiez si l'objet existe
//         if (!objet) {
//             throw new Error('Aucun objet trouvé avec cet ID');
//         }

//         // Retournez l'objet récupéré
//         return objet;
//     } catch (error) {
//         // Gérez les erreurs
//         console.error('Erreur lors de la récupération de l\'objet:', error.message);
//         throw error;
//     }
// }

// Créez un endpoint pour l'ajout  d'une sousquestion.
app.post('/sousquestions',  async (req, res) => {
     try {
      const body = req.body;
      const laQuestionCorrespondantOject =  await Question.findOne({_id: body.question})
      const numeroLie = laQuestionCorrespondantOject.numeroQuestion
      console.log(numeroLie)
      //console.log(laQuestionCorrespondantOject)
      const sousQuestion = new SousQuestion({
          id: body.id,
          description: body.description,
          question: body.question,
          numeroSousQ: numeroLie+"."+(body.id).toString(),
      });
      await sousQuestion.save()
          .then((question) => {
              res.status(201).json(question);

          })    
     } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la question.' });
    }
  })
// Créez un endpoint pour l'ajout  d'une ssousquestion.
app.post('/ssousquestions',  async (req, res) => {
     try {
      const body = req.body;
      const sousquestionOject =  await SousQuestion.findOne({_id: body.sousQuestion})
      const numeroLie = sousquestionOject.numeroSousQ
      console.log(numeroLie)
      //console.log(laQuestionCorrespondantOject)
      const ssousQuestion = new SSousQuestion({
          id: body.id,
          description: body.description,
          sousQuestion: body.sousQuestion,
          numeroSSousQuestion: numeroLie+"."+(body.id).toString(),
      });
      await ssousQuestion.save()
          .then((question) => {
              res.status(201).json(question);

          })    
     } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la question.' });
    }
  })

// Créez un endpoint pour l'ajout  d'une ssousquestion.
app.post('/auditquestions',  async (req, res) => {
     //try {
      const body = req.body;
      const auditQuestion = new AuditQuestion({
        reference: body.reference,
        description: body.description,
          
      });
      await auditQuestion.save()
          .then((question) => {
              res.status(201).json(question);

          })    
    // } catch (error) {
    //   res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la question.' });
    // }
  })

