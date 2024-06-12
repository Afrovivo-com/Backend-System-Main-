import express from "express"
import cors from "cors"

const app = express();
//Configure cors
app.use(cors());

//Parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const PORT = 8000;
app.get("/", (req, res) =>
    {
        res.send("Welcome to ");
    }
)

app.listen(PORT, ()=>
{
    console.log("Server has started");
})