const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"
const isAdmin=JSON.parse(storedToken).isAdmin;
if(!isAdmin)
window.location.href="../public/error.html"
const apiURL="http://localhost:5001";
const customerUrl=`${apiURL}/api/employee/all`;

fetch(customerUrl).then(res=>res.json()).then((data)=>{
    const container=document.querySelector(".container-fluid");
    data.map((element)=>{
        const parent=document.createElement("div");
        parent.className="row productRow";
        parent.innerHTML=`<div class="col-4">${element.employeeName}</div>
        <div class="col-4">${element.phone}</div>
        <div class="col-4 col-lg-2">${element.saleTillDate}</div>`

        container.append(parent);
    });
})
