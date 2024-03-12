const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"
const isAdmin=JSON.parse(storedToken).isAdmin;
if(!isAdmin)
window.location.href="../public/error.html"
const apiURL="https://chandra-marbles.onrender.com";
const customerUrl=`${apiURL}/api/employee/all`;

document.querySelector(".loader").style.display="flex";
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
    document.querySelector(".loader").style.display="none";
})

const logOutBtn=document.querySelector(".btn-outline-success");

logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("accessToken");
    window.location.href="../index.html";
})