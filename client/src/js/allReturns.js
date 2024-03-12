const apiURL="http://localhost:5001";
const billsUrl=`${apiURL}/api/return/`;
const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"
const isAdmin=JSON.parse(storedToken).isAdmin;
if(!isAdmin)
window.location.href="../public/error.html"
const token=JSON.parse(storedToken).token;

document.querySelector(".loader").style.display="flex";
fetch(billsUrl+"all",{
    method:"GET",
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}).then((res)=>res.json()).then((data)=>{
    data.forEach(bill=>{
        const billContainer=document.createElement("div");
        billContainer.className="row billWrapper";

        const block1=document.createElement("div");
        block1.className="col-12";
        block1.innerHTML=`<div class="container employeeContainer">
        <div class="row">
            <div class="col-4">Date: ${new Date(bill.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}</div>
        </div>
        </div>
        <hr>`

        const productsContainer=document.createElement("div");
        productsContainer.className="container productsContainer"
        productsContainer.innerHTML=`<div class="row rowHead">
        <div class="col-4">Design</div>
        <div class="col-3">Quantity</div>
        <div class="col-2">Rate</div>
        <div class="col-3">Amount</div>
        </div>`

        const products=bill.products;
        products.forEach(product=>{
            const amount=Number(product.rate)*Number(product.returnedQuantity);
            const billedProduct=`<div class="row productRow">
            <div class="col-4">${product.barcode}</div>
            <div class="col-3">${product.returnedQuantity}</div>
            <div class="col-2">${product.rate}</div>
            <div class="col-3">${amount}</div>
            </div>`

            productsContainer.innerHTML=productsContainer.innerHTML+billedProduct;
        })

        block1.append(productsContainer)

        const block2=document.createElement("div");
        block2.className="col-12";
        block2.innerHTML=`<div class="container amountContainer">
        <div class="row">Total Amount: ${bill.totalAmount}</div>
        <div class="row"><button id=${bill._id} onclick="deleteMe(this.id)" class="deleteBtn">Delete Record</button></div>
    </div>`
       
       billContainer.append(block1);
       billContainer.append(block2);
       
       document.querySelector(".billsContainer").append(billContainer);
    })
    document.querySelector(".loader").style.display="none";
})

function deleteMe(id)
{
    fetch(`${billsUrl}/delete/${id}`,{
        method:"DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json());

    window.location.reload();
}

const logOutBtn=document.querySelector(".btn-outline-success");

logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("accessToken");
    window.location.href="../index.html";
})