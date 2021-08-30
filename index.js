
const express = require('express');

const port = 3000;
const app = express();
let dataUser = require('./db/dataUser.json');

// membaca file 'public' menggunakan middleware static
app.use(express.static('public'));

// untuk ngejalanin ejs harus pakai miidleware ini
app.set('view engine', 'ejs');

// data dalam bentuk json harus melakukan middleware ini. middleware = urutan setelah response dan sebelum routing
app.use(express.json());

// melihat dataUser pada postman
app.get('/api/v1/users', (req, res) => {
    res.status(200).json(dataUser);

});
// melihat dataUser yang sesuai dengan id-nya
app.get('/api/v1/users/:id', (req, res) => {

    const user = dataUser.find((item) => {

        return item.id == req.params.id
    });
    res.status(200).json(user);
});

// masukkan data baru dengan method post diisi bodynya
app.post('/api/v1/users', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const lastItem = dataUser[dataUser.length - 1];
    const id = lastItem.id + 1;

    const newUser = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    }
    
    // masukkan data newUser baru dengan method push pada dataUser
    dataUser.push(newUser);

    res.status(201).json({status: "berhasil"});
    res.end();
});


// delete dataUser berdasarkan "id"
//req.params.id sesuai dengan id yang kita tentukan di route
app.delete('/api/v1/users/:id', (req, res) => {
    dataUser = dataUser.filter((item) => {
        return item.id != req.params.id;
    })

    res.status(200).json({
        message: `Post dengan id ${req.params.id} sudah berhasil dihapus!`

    });
});




function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    for (let i = 0; i < 4; i++){
        if ((dataUser[i].email == email) && (dataUser[i].password == password)){
            res.render('game');
        }
        else if (dataUser[i].password != password){
            res.json({
                message: "Invalid password"
            })
        }
        else if (dataUser[i].email != email){
            res.json({
                message: "Invalid email"
            })
        }
    }

}



// routing
app.get('/', (req, res) => {
    res.render('index');
    res.status(200);
});


app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', login);



app.listen(port);