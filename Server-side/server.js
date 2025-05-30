import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import { ConnectToDB } from './db/db.js';
import productRoutes from './Routes/product.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/product', productRoutes);

// app.get('/',(req,res)=>{
//   res.send('hheyy......')
  
// })
// __dirname replacement in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// // Serve frontend static files (adjust path if needed)
app.use(express.static(path.join(__dirname, '../Frontend/dist')));
const PORT = process.env.PORT || 5000;
console.log(PORT);
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../Frontend/dist/index.html'));
});
app.listen(PORT, () => {
  ConnectToDB();
  console.log(`Server running on port ${PORT}`);
});
