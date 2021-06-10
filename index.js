import express from 'express';
import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', usersRoutes)
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));






