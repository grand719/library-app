const path = require('path')
const express = require('express')
const hbs = require('hbs')
const Book = require('./modules/Book')
const Rents = require('./modules/Rents')
require('../src/db/mongoose')

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '/hbs')
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json())
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index')
})

app.post('/book', async (req, res) => {
    const book = new Book(req.body);
    try {
        await book.save()
        res.status(201).send(book)
    } catch (e) {
        res.status(500).send(e)
    }

})

app.get('/book', async (req, res) => {
    try {
        const books = await Book.find({});
        res.send(books)
    } catch (e) {
        res.send(e);
    }
})
app.get('/book/rented', async (req, res) => {
    try {
        const rentedBooks = await Book.find({ isRent: true });
        res.status(200).send(rentedBooks);
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/book/available', async (req, res) => {
    try {
        const availableBooks = await Book.find({ isRent: false });
        res.status(200).send(availableBooks)
    } catch (e) {
        res.status(400).send(e)
    }
})
app.get('/book/:bookId', async (req, res) => {
    const bookId = req.params.bookId
    console.log(bookId);
    try {
        const book = await Book.findOne({ Book_ID: bookId })

        if (!book) {
            return res.status(404).send("Can't find book")
        }
        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/rents', async (req, res, next) => {
    const rent = new Rents(req.body);
    try {

        const exist = await Book.find({ _id: req.body.Book_ID });
        if (exist.length === 0) {
            return res.status(404).send("Nie ma takiego wypożyczenia")
        } else {
            await Book.findOneAndUpdate({ _id: req.body.Book_ID }, { isRent: true })
            await rent.save()
            res.status(201).send(rent)
        }
        next();
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

app.get('/rents', async (req, res) => {
    try {
        const rents = await Rents.find({});

        res.send(rents);

    } catch (e) {
        res.send(e)
    }
})

app.get('/rents/:BookID', async (req, res) => {
    const BookID = req.params.BookID;

    try {
        const Rent = await Rents.findOne({ Book_ID: BookID })

        if (!Rent) {
            return res.status(404).send('Cant find rent');
        }

        res.status(200).send(Rent);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.delete('/rents', async (req, res) => {
    const BookID = req.body;

    try {
        await Book.findOneAndUpdate({ _id: BookID.Book_ID }, { isRent: false });
        await Rents.deleteOne({ Book_ID: BookID.Book_ID })
        res.send(req.body);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get('/rents/pesel/:PESEL', async (req, res) => {
    const PESEL = req.params.PESEL;

    try {
        const Rent = await Rents.find({ User_Pesel: PESEL });

        if (!Rent) {
            return res.status(404).send('Not found');
        }

        res.status(200).send(Rent)
    } catch (e) {
        res.status(400).send(e)
    }
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})