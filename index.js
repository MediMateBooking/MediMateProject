import express from 'express';
import bodyParser from 'body-parser'; // for parsing incoming request bodies
import usersRoutes from './routes/users.js'; // Import the users route

const app = express(); 
const PORT = 5000; 

app.use(bodyParser.json()); // for parsing application/json

app.use('/users', usersRoutes); // use the users route

app.get('/', (req, res) => {
  res.send('Hello from Homepage');
}); // GET request

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)); 