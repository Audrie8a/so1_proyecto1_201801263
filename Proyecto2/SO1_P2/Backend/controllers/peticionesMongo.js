const MongoClient = require('mongodb').MongoClient

var db;
var collection;

MongoClient.connect('mongodb://Uso1:123@35.202.107.49:27017/so1', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('so1')
    collection= db.collection('patients')
})


exports.getUsuarios = async (req,res)=>{
    
    db.collection('myCollection').find().toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
}
