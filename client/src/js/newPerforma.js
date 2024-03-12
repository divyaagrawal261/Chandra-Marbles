const apiURL = "https://chandra-marbles.onrender.com";
const inventoryUrl = `${apiURL}/api/stock/`;
const saleUrl=`${apiURL}/api/sale/create`;
const customerUrl=`${apiURL}/api/customer/`;
const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"
const token=JSON.parse(storedToken).token;


function getProduct(){
  const quantity=document.querySelector(".quantity").value;
  const barcode=document.querySelector(".barcode").value;
  const rate=document.querySelector(".rate").value;
  const totalAmount=document.querySelector(".totalAmount");
  const balanceAmount=document.querySelector(".balanceAmount");

  if(totalAmount.innerHTML === "Amount")
  totalAmount.innerHTML="0";

  if(balanceAmount.innerHTML==="Balance Amount")
  balanceAmount.innerHTML="0";

  if(!quantity || !barcode || !rate)
  alert("All fields are neccessary")
  else{
fetch(inventoryUrl+`${barcode}`)
  .then((res)=>res.json())
  .then((element) => {
    if(!element)
    alert("Invalid Barcode")
    const container = document.querySelector(".productsContainer");
    const amount=(rate)*(quantity);
      const parent = document.createElement("div");
      parent.className = "row productRow";
      parent.innerHTML = `<div class="col-lg-3 col-3 productBarcode">${element.barcode}<button onclick="deleteMe(this)" class="deleteBtn">Delete</button></div>
                        <div class="col-lg-5 col-md-4 col-sm-4 col-3"><strong>${element.company}</strong><br>${element.quality} (${element.size})</div>
                        <div class="col-2 col-lg-2 productQuantity">${quantity}</div>
                        <div class="col-lg-1 col-2 productRate">${rate}</div>
                        <div class="col-lg-1 col-2">${amount}</div>`;

      container.append(parent);
      totalAmount.innerHTML=Number(totalAmount.innerHTML)+Number(amount);
      balanceAmount.innerHTML=Number(balanceAmount.innerHTML)+Number(amount);
      document.querySelector(".quantity").value="";
      document.querySelector(".barcode").value="";
      document.querySelector(".rate").value="";
  });
}
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

function updateAmount()
{
  const percentage=document.querySelector(".discount").value;
  const discountedAmount=document.querySelector(".discountedAmount");
  const totalAmount=document.querySelector(".totalAmount");
  const advanceAmount=document.querySelector(".advance").value;
  const balanceAmount=document.querySelector(".balanceAmount");
  const discount=Number(totalAmount.innerHTML)*Number(percentage)*0.01;
  discountedAmount.innerHTML=Number(totalAmount.innerHTML)-Number(discount)
  balanceAmount.innerHTML=Number(discountedAmount.innerHTML)-Number(advanceAmount);
}

function createPerforma()
{
  const Products=[];
  const inputProducts=document.querySelectorAll(".productRow");
  inputProducts.forEach((product)=>{
    const barcode=(product.querySelector(".productBarcode").innerHTML).split("<")[0];
    const quantity=product.querySelector(".productQuantity").innerHTML;
    const rate=product.querySelector(".productRate").innerHTML;
    const requestedProduct={"barcode":barcode, "quantity":quantity, "rate":rate}
    Products.push(requestedProduct);
  })

  const customerName=document.querySelector(".customerName").value;
  const phone=document.querySelector(".customerPhone").value;
  const paid=(document.querySelector(".advance")).value;
  const discountedAmount=(document.querySelector(".discountedAmount")).innerHTML;
  const totalAmount=(document.querySelector(".totalAmount")).innerHTML;
  const discount=Number(totalAmount)-Number(discountedAmount);
  const requestBody=JSON.stringify({
    customerName, phone, paid, Products, discount
  })

  fetch(saleUrl,{
    method:"POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  },
  body:requestBody
  }).then(res=>res.json()).then(data=>{

    document.querySelector(".pop-up").style.display="flex";
    setTimeout(()=>document.querySelector(".pop-up").style.display="none",3000)
    
const doc = new jspdf.jsPDF();

doc.setFontSize(24);
doc.text('Chandra Marble & Tile Decore', 55, 20);
doc.setFontSize(14);
doc.text('Dayanatpur, Aligarh Road, Hathras', 72,30);
doc.text('Uttar Pradesh - 204101', 85,38);

doc.setFontSize(20);
doc.text('Estimate', 100, 55);

doc.setFontSize(16);
doc.text(`Employee: ${data.employeeName}`, 20, 66);
doc.text(`Customer Phone: ${data.phone}`, 20, 74);
doc.text(`Customer Name: ${customerName}`,20, 82)
doc.text(`Date: ${new Date(data.date).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})}`, 20, 90);

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
  const amount = Number(item.orderedQuantity*item.rate);
  doc.text(" " + product.company+ " " + product.quality + " " + product.barcode, 20, startY);
  doc.text(" " + product.size, 100, startY);
  doc.text(`  ${item.orderedQuantity}`, 120, startY);
  doc.text(`  ${item.rate}`, 145, startY);
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

if(data.balance === 0) {
  doc.setFillColor(71, 71, 71); 
  doc.rect(140, startY, 60, 50, 'F');
}
doc.setTextColor(0, 0, 0);
doc.text(`Total Amount: ${data.totalAmount}`, 150, startY + 10);
doc.text(`Discount: ${data.discount}`, 150, startY + 20)
doc.text(`Advance: ${data.paid}`, 150, startY + 30);
doc.text(`Balance: ${data.balance}`, 150, startY + 40);

if(data.balance==0)
doc.addImage("https://cdn-icons-png.flaticon.com/512/3862/3862504.png", "JPEG", 160, startY + 50, 10, 10);

doc.save('order-summary.pdf');

setTimeout(()=>{window.location.reload()},3000)});
}

const logOutBtn=document.querySelector(".btn-outline-success");

logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("accessToken");
    window.location.href="../index.html";
})