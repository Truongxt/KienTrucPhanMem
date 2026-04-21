const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8082;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://172.16.56.67:27017/movie_movie_db';

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Movie Service: Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  showtimes: [{ type: String }],
  price: { type: Number, default: 100000 }
});
const Movie = mongoose.model('Movie', movieSchema);

// Initial Seed
const seedMovies = async () => {
  const count = await Movie.countDocuments();
  if (count === 0) {
    await Movie.create([
      { title: 'Avengers: Endgame', description: 'Marvel Cinematic Universe', showtimes: ['10:00', '14:00', '19:00'] },
      { title: 'Spider-Man: No Way Home', description: 'Multiverse saga', showtimes: ['11:00', '15:00', '20:00'] }
    ]);
    console.log('Movies seeded');
  }
};
seedMovies();

// GET /movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
});

// POST /movies
app.post('/movies', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Error adding movie' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Movie Service running on port ${PORT}`);
});
