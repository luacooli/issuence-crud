const express = require('express')
const cors = require('cors')
const admin = require('firebase-admin')
const app = express()
const port = process.env.PORT || 3000

const serviceAccount = require('./firebase-adminsdk.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

// Enable CORS for all routes
app.use(cors()) // Use CORS middleware
app.use(express.json())

// Middleware to parse JSON bodies
app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const clientsRef = db.collection('users')
    const snapshot = await clientsRef.get()

    if (snapshot.empty) {
      return res.status(404).send('No clients found.')
    }

    const clients = []
    snapshot.forEach((doc) => {
      clients.push({ id: doc.id, ...doc.data() })
    })

    res.status(200).json(clients)
  } catch (error) {
    console.error('Error getting clients:', error)
    res.status(500).send('Error fetching clients.')
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
