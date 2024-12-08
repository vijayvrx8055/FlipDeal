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

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
