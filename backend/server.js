
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const session = require("express-session");
// const passport = require("passport");
// const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
// const connectDB = require("./config/db");
// const User = require("./models/User");
// const authRoutes = require("./routes/auth");
// const portfolioRoutes = require("./routes/portfolio");
// const mongoose = require("mongoose");
// const serviceRoutes = require("./routes/service");
// app.use("/api/service", serviceRoutes);


// const app = express(); // ✅ must come before app.use()

// // ✅ Middlewares
// app.use(
//   cors({
//     origin: "http://localhost:5173", // your frontend
//     credentials: true,
//   })
// );
// app.use(express.json({ limit: "10mb" }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ✅ Session middleware (required for passport)
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your_secret_key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // ✅ Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // ✅ Serialize / Deserialize user for sessions
// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// // ✅ Google OAuth Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value;
//         const googleId = profile.id;
//         const firstName = profile.name?.givenName;
//         const lastName = profile.name?.familyName;
//         const avatarUrl = profile.photos?.[0]?.value;

//         // 1️⃣ Try find by Google ID
//         let user = await User.findOne({ googleId });
//         if (user) return done(null, user);

//         // 2️⃣ Try find by email
//         user = await User.findOne({ email });
//         if (user) {
//           if (!user.googleId) {
//             user.googleId = googleId;
//             user.avatarUrl = user.avatarUrl || avatarUrl;
//             await user.save();
//           }
//           return done(null, user);
//         }

//         // 3️⃣ Create new user if none found
//         user = await User.create({
//           firstName,
//           lastName,
//           email,
//           avatarUrl,
//           googleId,
//           role: "freelancer",
//         });

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// // ✅ Google Login Start
// app.get(
//   "/api/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // ✅ Google Callback Route
// app.get(
//   "/api/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "http://localhost:5173/login",
//   }),
//   async (req, res) => {
//     try {
//       const user = await User.findOne({ email: req.user.email });
//       const encodedEmail = encodeURIComponent(user.email);

//       if (!user.details1 || !user.details1.expertise?.length) {
//         return res.redirect(
//           `http://localhost:5173/details1?email=${encodedEmail}`
//         );
//       }

//       if (!user.details2 || !user.details2.professionalTitle) {
//         return res.redirect(
//           `http://localhost:5173/buildprofile?email=${encodedEmail}`
//         );
//       }

//       return res.redirect(
//         `http://localhost:5173/dashboard?email=${encodedEmail}`
//       );
//     } catch (err) {
//       console.error("Google callback redirect error:", err);
//       res.redirect("http://localhost:5173/login");
//     }
//   }
// );

// // ✅ Normal Auth & Portfolio Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/portfolio", portfolioRoutes);
// // ✅ Connect MongoDB and start server
// const PORT = process.env.PORT || 5000;
// connectDB(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("❌ DB connection error:", err));



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const connectDB = require("./config/db");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const portfolioRoutes = require("./routes/portfolio");
const serviceRoutes = require("./routes/service"); // ✅ service route correctly placed
const mongoose = require("mongoose");

// ✅ Initialize Express app FIRST
const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Serialize / Deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// ✅ Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const googleId = profile.id;
        const firstName = profile.name?.givenName;
        const lastName = profile.name?.familyName;
        const avatarUrl = profile.photos?.[0]?.value;

        let user = await User.findOne({ googleId });
        if (user) return done(null, user);

        user = await User.findOne({ email });
        if (user) {
          if (!user.googleId) {
            user.googleId = googleId;
            user.avatarUrl = user.avatarUrl || avatarUrl;
            await user.save();
          }
          return done(null, user);
        }

        user = await User.create({
          firstName,
          lastName,
          email,
          avatarUrl,
          googleId,
          role: "freelancer",
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// ✅ Google Login Start
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Google Callback Route
app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email });
      const encodedEmail = encodeURIComponent(user.email);

      if (!user.details1 || !user.details1.expertise?.length) {
        return res.redirect(
          `http://localhost:5173/details1?email=${encodedEmail}`
        );
      }

      if (!user.details2 || !user.details2.professionalTitle) {
        return res.redirect(
          `http://localhost:5173/buildprofile?email=${encodedEmail}`
        );
      }

      return res.redirect(
        `http://localhost:5173/dashboard?email=${encodedEmail}`
      );
    } catch (err) {
      console.error("Google callback redirect error:", err);
      res.redirect("http://localhost:5173/login");
    }
  }
);

// ✅ Normal Routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/service", serviceRoutes); // ✅ moved here after app defined

// ✅ Connect MongoDB and start server
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB connection error:", err));
