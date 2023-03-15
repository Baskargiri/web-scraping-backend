// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import axios from "axios";
import cheerio  from "cheerio";
import cors from "cors";




const app = express();

const PORT = 4000;


const MONGO_URL = "mongodb://127.0.0.1";
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.use(cors());

    // const url = "https://www.flipkart.com/search?q=mobiles&sid=tyy%2C4io&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_2_6_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_2_6_na_na_na&as-pos=2&as-type=HISTORY&suggestionId=mobiles%7CMobiles&requestId=0b463bac-b880-4904-9a43-e8bf22856336"
    // const arr =[];
    // const list = {
    //     title:""
    // }
    // const { data } = axios.get(url);
    // console.log(data)
        // const $ = cheerio.load(data);
        // const dt = $('._2kHMtA')
        // dt.each((el)=>{
        //     list.title = $('._4rR01T').text();
        //     arr.push(list)
        // })

        // console.log(arr)



    // mobileimage.each((idx, el) => {
    //   category.image = $(el).attr("src");

    //   mobileList.push(category);
    // });

    // mobileTitle.each((idx, el) => {
    //   category.title = $(el).text();
    //   mobileList.push(category);
    // });

    // // mobileRating.each((idx,el)=>{
    // //  category.rating = $(el);
    // //  mobileList.push(category);
    // // })

    // mobilePrice.each((idx, el) => {
    //   category.price = $(el).text();
    //   mobileList.push(category);
    // })

    // mobileOfferPrice.each((idx, el) => {
    //   category.offerprice = $(el).text();
    //   mobileList.push(category);
    // })

   

app.get("/",async function (request, response) {
//    try{
    // const mobileurl = "https://www.flipkart.com/apple-iphone-14-pro-deep-purple-128-gb/p/itm75f73f63239fa?pid=MOBGHWFHYGAZRWFT&lid=LSTMOBGHWFHYGAZRWFTJTZIDA&marketplace=FLIPKART&q=iphone+14+pro&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_2_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_2_na_na_na&fm=organic&iid=33fa5858-b0dc-488e-8790-d4e6e86d4f7f.MOBGHWFHYGAZRWFT.SEARCH&ppt=clp&ppn=big-savings-days-store&ssid=ui7imfbxhs0000001678795421156&qH=73a41d19c3188cc2";

    const mobileurl ="https://www.flipkart.com/search?q=mobiles&sid=tyy%2C4io&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_2_6_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_2_6_na_na_na&as-pos=2&as-type=HISTORY&suggestionId=mobiles%7CMobiles&requestId=0b463bac-b880-4904-9a43-e8bf22856336"
    const mobileList = [];

    

    const { data } = await axios.get(mobileurl);
    const $ = cheerio.load(data);

   

    const dbs = { image: "", title: "",rating:"",price:"",offer_price:""};

    const ds = $('._2kHMtA');
    ds.map((el)=>{
        dbs.title = $(el).find('._4rR01T').text();
        mobileList.push(dbs)
    })
 
    console.log(ds[0])


    const mobileimage = $('img._396cs4._2amPTt._3qGmMb');
    const mobileTitle = $(".B_NuCI");
    const mobileRating = $("._3LWZlK");
    const mobileOfferPrice = $("._30jeq3 _1_WHN1");
    const mobilePrice = $("._3I9_wc _27UcVY");
    // console.log($(mobilePrice).text())

    
   
//     dbs.image = mobileimage.eq(0).attr('src');
//     dbs.title = mobileTitle.text();
//     dbs.rating = mobileRating.text();
//     dbs.price = mobilePrice.text();
//     dbs.offer_price = mobileOfferPrice.text();

//     mobileList.push(dbs)
//     console.log(mobileList);

//     const result = await client.db("webcode").collection("data").insertOne(mobileList);
//     response.send(result)

//    }catch(err){
//     console.log(err)
//    }
 
});


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));




