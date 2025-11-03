import express from "express"
import routes from "./routes/index.js" // Import routes
import errorHandler from "./middlewares/error-handler.js";
import { sequelize } from "./config/database.js";
import User from "./models/user.js";
import cors from "cors";
const app = express();
app.use(express.json());

await sequelize.authenticate().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log("Error: ", err);
});

await sequelize.sync()
app.use(cors('localhost:5173'));
app.use(express.static("public"));

const PORT = 5000

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
