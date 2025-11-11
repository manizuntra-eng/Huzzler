// require("dotenv").config();
// import express, { json, static } from "express";
// import cors from "cors";
// import { join } from "path";
// import session from "express-session";
// import { initialize, session as _session, serializeUser, deserializeUser, use, authenticate } from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import connectDB from "./config/db";
// import { findById, findOne, create } from "./models/User";
// import authRoutes from "./routes/auth";
// import portfolioRoutes from "./routes/portfolio";
// import serviceRoutes from "./routes/service"; // ✅ service route correctly placed
// import mongoose from "mongoose";

// // ✅ Initialize Express app FIRST
// const app = express();

// // ✅ Middlewares
// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend URL
//     credentials: true,
//   })
// );
// app.use(json({ limit: "10mb" }));
// app.use("/uploads", static(join(__dirname, "uploads")));

// // ✅ Session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your_secret_key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // ✅ Passport middleware
// app.use(initialize());
// app.use(_session());

// // ✅ Serialize / Deserialize user
// serializeUser((user, done) => done(null, user.id));
// deserializeUser(async (id, done) => {
//   try {
//     const user = await findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// // ✅ Google OAuth Strategy
// use(
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

//         let user = await findOne({ googleId });
//         if (user) return done(null, user);

//         user = await findOne({ email });
//         if (user) {
//           if (!user.googleId) {
//             user.googleId = googleId;
//             user.avatarUrl = user.avatarUrl || avatarUrl;
//             await user.save();
//           }
//           return done(null, user);
//         }

//         user = await create({
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
//   authenticate("google", { scope: ["profile", "email"] })
// );

// // ✅ Google Callback Route
// app.get(
//   "/api/auth/google/callback",
//   authenticate("google", {
//     failureRedirect: "http://localhost:5173/login",
//   }),
//   async (req, res) => {
//     try {
//       const user = await findOne({ email: req.user.email });
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

// // ✅ Normal Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/portfolio", portfolioRoutes);
// app.use("/api/service", serviceRoutes); // ✅ moved here after app defined

// // ✅ Connect MongoDB and start server
// const PORT = process.env.PORT || 5000;
// connectDB(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("❌ DB connection error:", err));


// server.mjs or server.js (with "type": "module" in package.json)
import "dotenv/config"; // loads .env automatically
import express, { json, static as expressStatic } from "express";
import cors from "cors";
import { join, dirname } from "path";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import User from "./models/User.js"; // assume default export is mongoose model
import authRoutes from "./routes/auth.js";
import portfolioRoutes from "./routes/portfolio.js";
import serviceRoutes from "./routes/service.js";
import { fileURLToPath } from "url";
import { connect } from 'mongoose';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize Express
const app = express();

// CORS - allow credentials for passport sessions
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body parser
app.use(json({ limit: "10mb" }));

// Serve uploads
app.use("/uploads", expressStatic(join(__dirname, "uploads")));

// Session middleware
// NOTE: for production, replace default MemoryStore and add secure cookie settings + store
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // secure: true, // enable when using HTTPS in production
      // sameSite: "none", // set carefully depending on your frontend host
      // maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Passport serialize/deserialize
passport.serializeUser((user, done) => {
  // If you store full object in session, store minimal (id)
  done(null, user._id ?? user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean().exec();
    done(null, user ?? null);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const googleId = profile.id;
        const firstName = profile.name?.givenName;
        const lastName = profile.name?.familyName;
        const avatarUrl = profile.photos?.[0]?.value;

        // Try find by googleId
        let user = await User.findOne({ googleId }).exec();
        if (user) return done(null, user);

        // Try find by email (existing account)
        user = await User.findOne({ email }).exec();
        if (user) {
          if (!user.googleId) {
            user.googleId = googleId;
            user.avatarUrl = user.avatarUrl || avatarUrl;
            await user.save();
          }
          return done(null, user);
        }

        // Create new user
        const created = await User.create({
          firstName,
          lastName,
          email,
          avatarUrl,
          googleId,
          role: "freelancer",
        });

        return done(null, created);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Auth routes for starting OAuth and callback
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: true,
  }),
  async (req, res) => {
    // Redirect client depending on completeness of profile
    try {
      const user = await User.findOne({ email: req.user.email }).exec();
      const encodedEmail = encodeURIComponent(user.email);

      if (!user.details1 || !(user.details1.expertise?.length > 0)) {
        return res.redirect(`http://localhost:5173/details1?email=${encodedEmail}`);
      }

      if (!user.details2 || !user.details2.professionalTitle) {
        return res.redirect(`http://localhost:5173/buildprofile?email=${encodedEmail}`);
      }

      return res.redirect(`http://localhost:5173/dashboard?email=${encodedEmail}`);
    } catch (err) {
      console.error("Google callback redirect error:", err);
      return res.redirect("http://localhost:5173/login");
    }
  }
);

// Normal app routes (after passport/session)
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/service", serviceRoutes);




main().catch(err => console.log(err));

async function main() {
  await connect('mongodb+srv://manikandan:Zuntra_1111@cluster0.x7incso.mongodb.net/Zuntraa?retryWrites=true&w=majority&appName=Cluster0');
  console.log("mongodb connected")
}
// DB + start
app.listen(5000,()=>{
  console.log("server connted")
})