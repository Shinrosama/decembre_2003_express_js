const express = require('express')

// on construit une instance d'express
const app = express()
// on définit un port 
const port = 3000


const arrNames = [
  `Shinro`, `shinn`, `Den`, `Zhedd`
]


// .get est une methode de requète http on veu récupérer des données sur un end point 
app.get('/', (req, res) => {
  res.send('Home')
})
app.get('/names', (req, res) => {
let sentence = ` `

  arrNames.forEach((names) => {

  sentence += names + ` et `

  })
  sentence += `!`
    res.send(sentence)

})

//le serveur va écouter en continu sur le port 3000 et attendre une requête et une fois la requète reçue elle renvoie une réponse.
app.listen(port, () => {
  console.log(`le port sur lequel l'app est en train d'écouter est le port: ${port}`)
})