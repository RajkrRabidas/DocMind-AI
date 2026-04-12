const app = require("./src/app");
const dbConnect = require("./db/db")

const PORT = process.env.PORT || 3000;

dbConnect()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});