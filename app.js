const express = require('express')
const fs = require('fs')
const app = express()
const multer = require('multer')
const path = require('path')

app.use(express.static('public'))
app.use(express.json())

app.get('/data', (req, res) => {
  const data = require('./data.json')
  res.json(data)
})

app.post('/submit', (req, res) => {
  const data = req.body.data
  const data2 = req.body.data2
  const data3 = req.body.data3
  const data4 = req.body.data4
  const data5 = req.body.data5
  fs.readFile('./public/data.json', (err, fileData) => {
    if (err) {
      console.error(err)
    } else {
      const dataArray = JSON.parse(fileData)
      const newData = {
        Price: parseInt(data3),
        Doors: parseInt(data2),
        TopSpeed: parseInt(data4),
        MPG: parseInt(data5),
        CarName: data
      }
      dataArray.push(newData)
      fs.writeFile('./public/data.json', JSON.stringify(dataArray, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          return value
        }
        return value
      }, 5), (err) => {
        if (err) {
          console.error(err)
        } else {
          // console.log('Data written to file');
          res.send({ message: 'Data written to file' })
        }
      })
    }
  })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/Images')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.carName + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

app.get('/upload', (req, res) => {
  res.render('upload')
})

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully.' })
})

module.exports = app
