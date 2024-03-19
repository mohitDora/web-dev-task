const express = require('express')
const mongoose=require('mongoose')
const app = express()
const router=require("./Router")
const paymentRoute = require('./router/payment-route')
const dotenv=require("dotenv");
const path=require("path")

dotenv.config("./config.env")



const db="mongodb+srv://Mohitdora21:Mohitdora21@cluster0.phnxvlh.mongodb.net/coursera?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(db).then(() => {
    console.log("User Database Successfully Connected")
}).catch((err) => {
    console.log("Failed to connect to the database")
})
const cors = require('cors')
const port = "https://web-dev-project-mohit.netlify.app" || 5000;


const corsOptions = {
  origin: "https://web-dev-project-mohit.netlify.app",
  methods: "POST,GET,PUT,DELETE,HEAD,PATCH",
  credentials: true,
};
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));


app.use(express.json());
app.use(router);
app.use("/pay", paymentRoute);


app.use(express.static(path.join(__dirname,"./build")))

app.get('*', function (req, res) {
	
	res.sendFile(path.join(__dirname,"./build/index.html"))
	
	
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})