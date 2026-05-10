import express from "express";

// Create an express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import route
import userRouter from "./routes/user.route.js";
//import postRouter from "./routes/post.route.js";

// Declare the routes
// Example route: http://localhost:4000/api/v1/users/register
app.use("/api/v1/users", userRouter);

//app.use("/api/v1/posts", postRouter);

export default app;