const express = require('express')
const morgan = require(`morgan`)
const app = express()
const port = 3000

let mockCoworkings = require('./mockCoworkings')
const coworkings = require('./mockCoworkings')

//middleware qui permet d'interpreter le corp de ma requête (req.body) en format json
app.use(express.json())
app.use(morgan(`dev`))

app.get('/', (req, res) => {
    res.json('Hello World !')
})

app.get('/api/coworkings', (req, res) => {
    // Afficher la phrase : Il y a ... coworkings dans la liste. 
    res.json(mockCoworkings)
})

app.get('/api/coworkings/:id', (req, res) => {
    let result = mockCoworkings.find(el => el.id === parseInt(req.params.id))

    if (!result) {
        result = `Aucun élément ne correspond à l'id n°${req.params.id}`
    }
    res.json(result)
})
//-------------------------Postman--------------------------------------------


//implémenter le endpoint post qui renvoie une réponse "post fonctionne"

app.post('/api/coworkings/', (req, res) => {
    // Ajouter le coworking dans le tableau, en automatisant la génération d'un id. On récupère le dernier élément du tableau et on ajoute +1 à son id.
    // let coworking = req.body

    const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
    // let coworking = {id: newId, superficy : req.body.superficy, capacity : req.body.capacity, name: req.body.name}
    // (...) les trois points sont un SPREAD OPERATOR
    let coworking = { id: newId, ...req.body }

    mockCoworkings.push(coworking)

    // on renvoie un objet qui contiens les propriétés message et data
    //message : `le coworking a bien été ajouté
    //data : le coworking 


    let nameCoworking = {message:`le coworking a bien été ajouté`, data: coworking}

    res.json(nameCoworking)
  });


//--------------------------PUT--------------------------------------------------------


app.put("/api/coworkings/:id", (req,res)=> {


    const coworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))
    
    
    let result;
    
    if (coworking) {
        coworking.superficy = req.body.superficy
         result = {message:`le endpoint put coworking fonctionne bien`, data : coworking }
    } else {

         result = {message:`le endpoint put coworking ne fonctionne pas`, data: {} }
    }

    res.json(result)
});

//--------------------------------DELETE--------------------------------------------


app.delete("/api/coworkings/:id", (req,res)=>{

    const coworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))

    let result;

    if (coworking) {
        mockCoworkings = mockCoworkings.filter(el => el.id !== coworking.id)

        result = {message:`coworking supprimé`, data : coworking }
        
    } else {
        result = {message:`le coworking n'existe pas`, data: {} }

    
    }

    res.json(result)   

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})