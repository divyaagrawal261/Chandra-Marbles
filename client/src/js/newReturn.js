const apiURL = "http://localhost:5001";
const inventoryUrl = `${apiURL}/api/stock/`;
const saleUrl=`${apiURL}/api/return/create`;
const customerUrl=`${apiURL}/api/customer/`;
const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"
const isAdmin=JSON.parse(storedToken).isAdmin;
if(!isAdmin)
window.location.href="../public/error.html"


function getProduct(){
  const quantity=document.querySelector(".quantity").value;
  const barcode=document.querySelector(".barcode").value;
  const totalAmount=document.querySelector(".totalAmount");

  if(totalAmount.innerHTML === "Amount")
  totalAmount.innerHTML="0";

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

  const requestBody=JSON.stringify({
    customerName, phone, Products
  })

  fetch(saleUrl,{
    method:"POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  },
  body:requestBody
  }).then(res=>res.json()).then(data=>{
    console.log(data)
  });
}