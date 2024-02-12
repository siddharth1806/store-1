
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const passportGoogleOAuth2 = require('passport-google-oauth20');
const bodyParser = require('body-parser');

const User = require('./model/users');

// const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '200mb'}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/store', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(express.json());

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());


// // Routes
// app.use('/products', productRoutes);
// app.use('/orders', orderRoutes);
// Passport.js setup

passport.use(new passportGoogleOAuth2.Strategy({
  clientID: 'your_client_id',
  clientSecret: 'your_client_secret',
  callbackURL: '/auth/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
      // Check if the user exists in your database
      let user = await User.findOne({ googleId: profile.id });

      // If user does not exist, create a new user
      if (!user) {
          user = await User.create({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              // You can store additional user information here
          });
      }

      // Pass the user to the done callback to signal successful authentication
      done(null, user);
  } catch (error) {
      done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
