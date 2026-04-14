import express from "express"

import cors from "cors"

import netRoutes from "./src/routes/net.js"

const PORT = 3010
const app = express()

app.use(cors())
app.use(express.json())

app.use(netRoutes)

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
