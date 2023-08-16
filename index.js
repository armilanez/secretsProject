import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

app.get("/", async (req, res) => {
    try
    {
        // Secrets API will get us a secret with embarrassment score and much more.
        // Check documentation here: https://secrets-api.appbrewery.com/
        const result = await axios.get("https://secrets-api.appbrewery.com/random");

        res.render(__dirname + "/index.ejs", {
            secret: result.data.secret,
            user: result.data.secret
        });
    }

    catch(error)
    {
        console.log(error.response.data);
        res.status(500);
    }
}
);
