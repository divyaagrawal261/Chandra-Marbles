const apiURL = "https://chandra-marbles.onrender.com";
const inventoryUrl = `${apiURL}/api/stock/`;
const saleUrl=`${apiURL}/api/return/create`;
const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"
const isAdmin=JSON.parse(storedToken).isAdmin;
if(!isAdmin)
window.location.href="../public/error.html"

const token=JSON.parse(storedToken).token;

function getProduct(){
  const quantity=document.querySelector(".quantity").value;
  const barcode=document.querySelector(".barcode").value;
  const totalAmount=document.querySelector(".totalAmount");
  const rate=document.querySelector(".rate").value;
  if(totalAmount.innerHTML === "Amount")
  totalAmount.innerHTML="0";

  if(!quantity || !barcode || !rate)
  alert("All fields are neccessary")
else{
  fetch(inventoryUrl+`${barcode}`)
  .then((res) => res.json())
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
      document.querySelector(".quantity").value="";
      document.querySelector(".barcode").value="";
      document.querySelector(".rate").value="";
  });
}}

function deleteMe(element)
{
  const grandparent=((element.parentElement).parentElement).parentElement;
  grandparent.removeChild((element.parentElement).parentElement)
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

  const requestBody=JSON.stringify({Products})

  fetch(saleUrl,{
    method:"POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  },
  body:requestBody
  }).then(res=>res.json()).then(data=>{
    document.querySelector(".pop-up").style.display="flex";
    setTimeout(()=>
    {document.querySelector(".pop-up").style.display="none"
    window.location.reload()},3000);
})}

const logOutBtn=document.querySelector(".btn-outline-success");

logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("accessToken");
    window.location.href="../index.html";
})