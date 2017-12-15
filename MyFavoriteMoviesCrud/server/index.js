const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const dataaccess = require("./dataaccess");
let accessObject = new dataaccess.JournalDataAccess();
const app = express();

var corsOptions = {
	origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 

};

app.use(cors());
app.use(bodyParser.json());

app.get('/categories', cors(corsOptions), (req, res) => {
    accessObject.getCategories({})
    	.then((response) => {
        	res.json(response);
    	})
    	.catch((err) => {
        	res.status(404);
    	});
});

app.get('/movies', cors(corsOptions), (req, res) => {
    accessObject.getMovies({})
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(404);
        });
});

app.post('/postMovies', cors(corsOptions), (req, res) => {
    let obj = req.body;
    accessObject.insertEntry(obj)
    	.then((response) => {
        	res.send("done!");
    	})
    	.catch((err) => {
        	res.status(404);
    	});    
});

app.delete('/deleteAMovie/:id', cors(corsOptions), (req, res) => {
	let obj = req.params.id;
	console.log('obj---------',obj)
    accessObject.deleteAMovie(obj)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(404);
        });
});

accessObject.connectDb()
	.then(() => {
    	app.listen(3000, () => {
        	console.log('Listening to port 3000');
    	});
	})
	.catch(() => { 
		console.log("DB Connection Fail"); 
	});

