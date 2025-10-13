import express from "express"
import routes from "./routes/index.js" // Import routes
import errorHandler from "./middlewares/error-handler.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(routes); // Use the imported routes

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
