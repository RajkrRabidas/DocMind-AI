const app = require("./src/app");
const dbConnect = require("./db/db")
const {connectRedis} = require("./services/redis")

const PORT = process.env.PORT || 3000;

// Connect to Redis and MongoDB, then start the server
connectRedis();

// Connect to MongoDB and start the server
dbConnect();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});