import express from "express"
import routes from "./routes/index.js" // Import routes

const app = express();

const PORT = process.env.PORT || 5000;

app.use(routes); // Use the imported routes




app.use((err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).send("Something broke!");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
