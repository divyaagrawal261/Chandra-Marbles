const apiURL="http://localhost:5001";
const inventoryUrl=`${apiURL}/api/stock/all`;

fetch(inventoryUrl).then(res=>res.json()).then((data)=>{
    console.log(data)
    const container=document.querySelector(".productsContainer");
    data.map((element)=>{
        console.log(element)
        const parent=document.createElement("div");
        parent.className="row productRow";
        parent.innerHTML=`<div class="col-3">${element.barcode}</div>
        <div class="col-lg-6 col-md-4 col-sm-4 col-4"><strong>${element.company}</strong><br>${element.quality} ${element.designName} (${element.size})</div>
        <div class="col-3 col-lg-2">${element.quantity}</div>
        <div class="col-lg-1 col-2">${element.rate}</div>`

        container.append(parent);
    });
})