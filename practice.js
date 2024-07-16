const express = require('express');
const app = express();
app.use(express.json());
const port = 5000;

let book = [{id:1, title:"Harrypotter", author:"Rowling", year:2000},
  {id:2, title:"House of dragon", author:"Akash", year:1900}];


app.get("/book", (req, res) => {
  res.status(200).json(book);
});

app.get("/book/:id", (req, res) => {
  const {id} = req.params;
  const books = book.find((book) => book.id == id);
  if(!books){
    return res.status(404).json({Message: "BOOK ID NOT FOUND!"});
  }
  res.status(200).json(books);

})

app.post("/book", (req,res) => {
  const {title, author, year} = req.body;
  const newbook = { id: Date.now(), title:title, author:author, year:year};
  book.push(newbook);
  res.status(201).json(newbook);
});

app.put("/book/:id", (req,res) => {
  const {id} = req.params;
  const {year} = req.body;
  const books = book.find((book) => book.id == id);
  if(!books){
    return res.status(404).json({Message: "BOOK ID NOT FOUND!"});
  }
  books.year = year;
  res.json("Successsully updated");
});

app.delete("/book/:id", (req,res) => {
  const bookindex = book.findIndex((book) => book.id == req.params.id);
  if(bookindex == -1){
    return res.status(404).json({Message: "BOOK ID NOT FOUND!"});
  }
  book.splice(bookindex, 1);
  res.status(200).json("Successfully deleted");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// const express = require('express')
// const app = express()
// const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })