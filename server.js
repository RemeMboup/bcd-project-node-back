require('dotenv').config({path:'./config/.env'})
require('./config/db')
const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.Port
//Importation du bibliotheque jwt(obtention du token)
const jwt = require('jsonwebtoken');
//Biblotheque pour crypter des donnees comme le mot de passe par exemple
const bcrypt = require('bcrypt');

const mongoose = require('mongoose')
// CORS headerS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});




app.listen(port, () => console.log(`Serveur is running at http://localhost:${port}`)
)
//importation des models
const User = require('./modeles/User')
const Question = require('./modeles/Question')
const SousQuestion = require('./modeles/SousQuestion')
const SSousQuestion = require('./modeles/SSousQuestion')
const AuditQuestion = require('./modeles/AuditQuestion')



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
    //try {
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
            
    // } catch (error) {
    //   res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la question.' });
    // }
  })

  async function retrouverObjetParID(id) {
    try {
        // Utilisez la méthode findById() pour trouver l'objet par son ID
        const objet = await SousQuestion.findById(id);
        console.log(objet)

        // Vérifiez si l'objet existe
        if (!objet) {
            throw new Error('Aucun objet trouvé avec cet ID');
        }

        // Retournez l'objet récupéré
        return objet;
    } catch (error) {
        // Gérez les erreurs
        console.error('Erreur lors de la récupération de l\'objet:', error.message);
        throw error;
    }
}

// Créez un endpoint pour l'ajout  d'une sousquestion.
app.post('/sousquestions',  async (req, res) => {
    // try {
      const body = req.body;
      const sousQuestion = new SousQuestion({
          id: body.id,
          description: body.description,
          question: body.question,
          //numeroSousQ: body.question.findById(body.question)+(body.id).toString(),
          //numeroSousQ: retrouverObjetParID(body.question[0])
          
      });
      console.log('id de la question correspondant');
      console.log(question);
      console.log(retrouverObjetParID(body.question));
      await sousQuestion.save()
          .then((question) => {
              res.status(201).json(question);

          })
            
    // } catch (error) {
    //   res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la question.' });
    // }
  })

