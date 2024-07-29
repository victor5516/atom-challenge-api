import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/tasks.routes";
import userRoutes from "./routes/users.routes";
import { handleError } from "./handlers/error.handler";
import { handleResponse } from "./handlers/response.handler";

/**
 * Express application instance.
 * @constant {Object}
 */
const app = express();

/**
 * Enable CORS (Cross-Origin Resource Sharing) for the application.
 */
app.use(cors());

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Middleware to parse incoming requests with JSON payloads.
 */
app.use(bodyParser.json());

/**
 * Middleware to parse incoming requests with URL-encoded payloads.
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Routes for task-related endpoints.
 * @route /tasks
 */
app.use("/tasks", taskRoutes);

/**
 * Routes for user-related endpoints.
 * @route /users
 */
app.use("/users", userRoutes);

/**
 * Middleware to handle API responses.
 */
app.use(handleResponse);

/**
 * Middleware to handle errors.
 */
app.use(handleError);

export default app;
