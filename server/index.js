import dotenv from 'dotenv'
import { app } from './app.js'
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config({
    path : "./.env"
})

const PORT = process.env.PORT || 8000

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);


app.get('/', (req, res) => {
    res.sendFile(path.join(dirname, '../client/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})