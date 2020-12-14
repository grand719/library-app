const mongoose = require('mongoose')
const validator = require('validator')
const validator_polish = require('validate-polish')
mongoose.connect('mongodb://127.0.0.1:27017/library-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})




// const newbook = new Book({
//     Title: 'Przygody Kopys',
//     Author: 'Kopys',
//     Description: 'Kopys poszedl do rossmana umyl wlasy itd fhaijukdfhaskf',
//     Book_ID: 'ABC12345f',
// })

// newbook.save().then((newbook) => {
//     console.log(newbook);
// }).catch((e) => {
//     console.log(e);
// })