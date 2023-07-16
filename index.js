import express  from "express";
import cors from "cors";
import morgan from "morgan"; 
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from 'path';
// import passport from 'passport';
// import session from 'express-session';
// import authRoutes from './routes/auth.js';
// import protectedRoutes from './routes/protected.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//env config
dotenv.config();

//router import
import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js";

//mongodb connection
connectDB();

//rest objecct
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// app.use(session({
//   secret: 'secret-key',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
// app.use('/auth', authRoutes);
// app.use('/protected', protectedRoutes);
//static
app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*", function (req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

// Port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
      .white
  );
});