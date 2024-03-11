const apiURL = "https://chandra-marbles.onrender.com";
const inventoryUrl = `${apiURL}/api/stock/`;
const saleUrl=`${apiURL}/api/sale/create`;
const customerUrl=`${apiURL}/api/customer/`;
const storedToken = localStorage.getItem('accessToken');
const token=JSON.parse(storedToken).token;


function getProduct(){
  const quantity=document.querySelector(".quantity").value;
  const barcode=document.querySelector(".barcode").value;
  const totalAmount=document.querySelector(".totalAmount");
  const balanceAmount=document.querySelector(".balanceAmount");

  if(totalAmount.innerHTML === "Amount")
  totalAmount.innerHTML="0";

  if(balanceAmount.innerHTML==="Balance Amount")
  balanceAmount.innerHTML="0";

fetch(inventoryUrl+`${barcode}`)
  .then((res) => res.json())
  .then((element) => {
    const container = document.querySelector(".productsContainer");
    const amount=(element.rate)*(quantity);
      const parent = document.createElement("div");
      parent.className = "row productRow";
      parent.innerHTML = `<div class="col-lg-3 col-2 productBarcode">${element.barcode}<button onclick="deleteMe(this)">Remove</button></div>
                        <div class="col-lg-5 col-md-4 col-sm-4 col-3"><strong>${element.company}</strong><br>${element.quality} ${element.designName} (${element.size})</div>
                        <div class="col-3 col-lg-2 productQuantity">${quantity}</div>
                        <div class="col-lg-1 col-2">${element.rate}</div>
                        <div class="col-lg-1 col-2">${amount}</div>`;

      container.append(parent);
      totalAmount.innerHTML=Number(totalAmount.innerHTML)+Number(amount);
      balanceAmount.innerHTML=Number(balanceAmount.innerHTML)+Number(amount);

  });
}

function deleteMe(element)
{
  const grandparent=((element.parentElement).parentElement).parentElement;
  grandparent.removeChild((element.parentElement).parentElement)
}

function getCustomer(phone)
{
  fetch(customerUrl+phone).then(res=>res.json()).then(data=>{
    document.querySelector(".customerName").value=data.customerName;
  });
}

function addAdvance(amount)
{
  const totalAmount=document.querySelector(".totalAmount");
  const balanceAmount=document.querySelector(".balanceAmount");
  balanceAmount.innerHTML=Number(totalAmount.innerHTML)-Number(amount);
}

function createPerforma()
{
  const Products=[];
  const inputProducts=document.querySelectorAll(".productRow");
  inputProducts.forEach((product)=>{
    const barcode=(product.querySelector(".productBarcode").innerHTML).split("<")[0];
    const quantity=product.querySelector(".productQuantity").innerHTML;
    const requestedProduct={"barcode":barcode, "quantity":quantity}
    Products.push(requestedProduct);
  })
  console.log(Products);

  const customerName=document.querySelector(".customerName").value;
  const phone=document.querySelector(".customerPhone").value;
  const paid=(document.querySelector(".advance")).value;

  const requestBody=JSON.stringify({
    customerName, phone, paid, Products
  })

  fetch(saleUrl,{
    method:"POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  },
  body:requestBody
  }).then(res=>res.json()).then(data=>{

const doc = new jspdf.jsPDF();

doc.setFontSize(30);
doc.text('Chandra Marbles', 70, 20);
doc.setFontSize(14);
doc.text('Dayanatpur, Aligarh Road, Hathras', 72,30);
doc.text('Uttar Pradesh - 240101', 85,38);

doc.setFontSize(20);
doc.text('Performa Invoice', 80, 55);

doc.setFontSize(16);
doc.text(`Employee: ${data.employeeName}`, 20, 70);
doc.text(`Customer Phone: ${data.phone}`, 20, 78);
doc.text(`Date: ${new Date(data.date).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})}`, 20, 86);

let startY = 105;

doc.setFontSize(14);
doc.setDrawColor(0);
doc.setLineWidth(0.1);
doc.line(20, startY-10, 200, startY-10); 
doc.text(" Particulars", 20, startY);
doc.text(" Size", 100, startY);
doc.text(" Quantity", 120, startY);
doc.text(" Rate", 145, startY);
doc.text(" Amount", 170, startY);

doc.setDrawColor(0);
doc.setLineWidth(0.1);
doc.line(20, startY + 2, 200, startY + 2); 

startY += 10;

data.products.forEach((item, index) => {
  const product = item.product;
  const amount = Number(item.orderedQuantity*product.rate);
  doc.text(" " + product.company+ " " + product.quality + " " + product.designName, 20, startY);
  doc.text(" " + product.size, 100, startY);
  doc.text(`  ${item.orderedQuantity}`, 120, startY);
  doc.text(`  ${product.rate}`, 145, startY);
  doc.text(` ${amount}`,170, startY)

  startY += 10;

  doc.line(20, startY-6, 200, startY-6); 
});

doc.line(20, 95, 20, startY-6);
doc.line(200, 95, 200, startY-6);
doc.line(100, 95, 100, startY-6); 
doc.line(120, 95, 120, startY-6); 
doc.line(145, 95, 145, startY-6); 
doc.line(160, 95, 160, startY-6); 

doc.text(`Total Amount: ${data.totalAmount}`, 150, startY + 10);
doc.text(`Advance: ${data.paid}`, 150, startY + 20);
doc.text(`Balance: ${data.balance}`, 150, startY + 30);
doc.save('order-summary.pdf');

  });
}