import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { MongoClient } from "mongodb";
import axios from "axios";
import cheerio  from "cheerio";
import cors from "cors";



app.use(cors());
const app = express();
//middle ware convert body to json
app.use(express.json())
// app.use(express.urlencoded())

const PORT = process.env.PORT;


// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;


const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");
 const products = [];
 


const url = 'https://www.flipkart.com/search?q=iphone&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off';
function cl(){
    axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
  
     
  
      $('._2kHMtA').each((i, element) => {
        const img = $(element).find('._396cs4').attr('src');
        const title = $(element).find('._4rR01T').text();
        const priceStr = $(element).find('._30jeq3._1_WHN1').text();
        const price = parseInt(priceStr.replace(/\D/g, ''));
        const rating = $(element).find('._3LWZlK').text();
  
        products.push({ img, title, price, rating });
      });
    //  const dt=JSON.stringify(products);
    
    //   console.log(dt);
    
    })
  
}
   
app.get("/web",async function (request, response) {
    cl();
    const result = await client.db("web").collection("datas").find({}).toArray()
    response.send(result)
 
});


app.post("/webpost",async (req, res)=> {

    try{
        const data =req.body;
        // console.log( data);
    //    const result = await client.db("web").collection("datas").insertMany({data:data[0]})
    const result = await client.db("web").collection("datas").insertMany(data)
        res.send(result)
        // res.end()

    }catch(err){
        console.log(err)
    }
    
 
});





app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));




