// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import axios from "axios";
import cheerio  from "cheerio";
import cors from "cors";




const app = express();

const PORT = 4000;


// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = "mongodb+srv://boss:baskar9798@cluster0.mcz101i.mongodb.net"


const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");
 const products = [];
 const raw=[];

app.use(cors());
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
      console.log(products)
    })
  
}
   
app.get("/web",async function (request, response) {
    cl();
    response.send(products)
 
});

app.post("/web",express.json(),async function (request, response) {
    cl();
    response.send(products)
 
});




app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));




