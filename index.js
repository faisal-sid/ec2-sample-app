const express = require('express')
const mysql = require('mysql')
const app = express()

function getConnection() {
  return mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'peopledb'
  })
}

function getPeopleCount() {
  return new Promise((resolve, reject) => {
    const connection = getConnection()
    connection.connect()
    connection.query('SELECT count(*) as count FROM people', function (error, results, fields) {
      if (error) reject(error)
      connection.end()
      resolve(results[0].count)
    })
  })
}

function insertSampleData() {
  const connection = getConnection()
  connection.connect()
  connection.query(`INSERT INTO people(name, email) VALUES
    ("John", "john@example.com"),
    ("George", "george@example.com"),
    ("Jane", "jane@example.org")`, function (error, results, fields) {
    if (error) throw error
    connection.end()
  })
}

function getPeople() {
  return new Promise((resolve, reject) => {
    const connection = getConnection()
    connection.connect()
    connection.query('SELECT id, name, email FROM people', function (error, results, fields) {
      if (error) reject(error)
      connection.end()
      resolve(results)
    })
  })
}

function getPerson(id) {
  return new Promise((resolve, reject) => {
    const connection = getConnection()
    connection.connect()
    connection.query('SELECT id, name, email FROM people WHERE id = ?', [id], function (error, results, fields) {
      if (error) reject(error)
      connection.end()
      if (results.length > 0)
        resolve(results[0])
      else
        resolve(null)
    })
  })
}

async function initialize() {
  try {
    const count = await getPeopleCount()
    if (count === 0)
      insertSampleData()
  } catch (e) {
    console.log(e)
  }

}

initialize()

app.get('/people', (req, res) => {
  getPeople().then(data => res.json(data))

})

app.get('/person/:id', (req, res) => {
  getPerson(parseInt(req.params.id)).then(data => res.json(data))
})



app.listen(80, '0.0.0.0', () => console.log('App listening at http://0.0.0.0:80'))