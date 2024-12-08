const express = require('express');
const { resolve } = require('path');

let cors = require('cors');

const app = express();
const port = 3000;

//server sie values
let taxRate = 5; //5%
let discountPercentage = 10; //10%
let loyaltyRate = 2; //2 points per $1

let cartTotal = 0;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = cartTotal + newItemPrice;
  res.send(cartTotal.toString());
});

app.get('/membership-discount',(req,res)=>{
  let isMember = req.query.isMember;
  cartTotal = parseFloat(req.query.cartTotal);
  if(isMember === "true"){
    cartTotal = cartTotal - (cartTotal * (discountPercentage/100));
  }
  res.send(cartTotal.toString());
});

app.get('/calculate-tax', (req,res)=>{
  cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = cartTotal * (taxRate/100);
  res.send(cartTotal.toString());
});

app.get('/estimate-delivery', (req,res)=>{
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let days = 0;
  if(shippingMethod === "Standard"){
    days = distance/50;
    res.send(days.toString());
  }else if(shippingMethod === "Express"){
    days = distance/100;
    res.send(days.toString());
  }
});

app.get('/shipping-cost',(req,res)=>{
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points',(req,res)=>{
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = loyaltyRate*purchaseAmount;
  res.send(loyaltyPoints.toString());
})

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
