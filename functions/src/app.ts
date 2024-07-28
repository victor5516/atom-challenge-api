import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import taskRoutes from "./routes/tasks.routes";
import userRoutes from "./routes/users.routes";
import {handleError} from "./handlers/error.handler";
import {handleResponse} from "./handlers/response.handler";
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.use(handleResponse);
app.use(handleError);

export default app;
