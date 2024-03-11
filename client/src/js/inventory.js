const apiURL="http://localhost:5001";
const inventoryUrl=`${apiURL}/api/stock/all`;
const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"

document.querySelector(".loader").style.display="flex";
fetch(inventoryUrl).then(res=>res.json()).then((data)=>{
    const container=document.querySelector(".productsContainer");
    data.map((element)=>{
        const parent=document.createElement("div");
        parent.className="row productRow";
        parent.innerHTML=`<div class="col-4">${element.barcode}</div>
        <div class="col-lg-6 col-md-4 col-sm-4 col-5"><strong>${element.company}</strong><br>${element.quality} (${element.size})</div>
        <div class="col-3 col-lg-2">${element.quantity}</div>`

        container.append(parent);
    });
    document.querySelector(".loader").style.display="none";
})

const logOutBtn=document.querySelector(".btn-outline-success");

logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("accessToken");
    console.log("Hello World")
    window.location.href="../index.html";
})