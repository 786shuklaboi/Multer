const express = require("express");
const multer = require('multer');
const bcrypt = require('bcrypt')
const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage: fileStorageEngine });

// app.post("/single", upload.single('image'),(req, res) => {

//     console.log(req.file);
//     res.send("Single File Uploaded");    
// })

app.post('/multiple', upload.array('images', 2), (req, res) => {
    console.log(req.files);
    res.send("Multiple file upload");
})



app.use(express.json())

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {

    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }
})
app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot Find User')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Logged In')
        }
        else {
            res.send('Incorrect')
        }
    } catch {
        res.status(500).send()
    }

})

app.get('/', function (req, res) {
    return res.send('Hello world');
});
app.listen(5000, () => {
    console.log(`Server started...`);
});
