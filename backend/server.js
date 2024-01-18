import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import { URL } from "url";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
mongoose
  .connect("mongodb://127.0.0.1:27017/projectDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
    saveUninitialized: false,
  })
);
app.use(cors());
app.use(express.json());
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection Successfull");
});

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const isAuthorized = (req, res, next) => {
 
  if (req.session !== undefined) {
    if (req.session?.user?.role === "admin") {
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.redirect("/");
  }
};
const isAdmin = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "admin") {
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return next();
  }
};
app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use(
  "/node_modules",
  express.static(path.resolve(__dirname, "node_modules"))
);
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/adminLogin.html"));
});

app.get("/userLogin", isAdmin, (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "public/userLogin.html")));
});

app.get("/userPhotoPage", isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "public/userPhotoPage.html")));
});

app.get("/adminSideUserList", isAuthorized, (req, res) => {
  res.sendFile(
    path.resolve(path.join(__dirname, "public/adminSideUserList.html"))
  );
});
app.get("/default", (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "public/default.html")));
});
app.get("/adminCreateUser", isAuthorized, (req, res) => {
  res.sendFile(
    path.resolve(path.join(__dirname, "public/adminCreateUser.html"))
  );
});

app.get("/logout", (req, res) => {

  if (req.session.user) {
    // Clear the session cookie
    res.clearCookie("connect.sid", { path: "/" });
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
    });
   
    
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

app.listen(5050, () => {
  console.log("server started");
});

app.use("/api/user", userRouter);
app.use("/api/admin", isAdmin, adminRouter);
