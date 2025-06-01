const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const DataBase_Connection = require("./Database_Config/DataBase.js");
const port = process.env.PORT || 8001; 

const AuthRoutes = require("./Routes/AuthRoutes.js");
const BaseRoutes = require("./Routes/BaseRoutes.js");
const EquipmentTypeRoutes = require("./Routes/EquipmentTypeRoutes.js");
const PurchaseRoutes = require("./Routes/PurchaseRoutes.js");
const {ErrorHandler, NotFound} = require("./Middleware/ErrorMiddleWare.js");

DataBase_Connection();
dotenv.config();
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRoutes);
app.use("/base", BaseRoutes);
app.use("/equipmenttype", EquipmentTypeRoutes);
app.use("/purchase", PurchaseRoutes);

app.use(NotFound);
app.use(ErrorHandler);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, World!" });
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})