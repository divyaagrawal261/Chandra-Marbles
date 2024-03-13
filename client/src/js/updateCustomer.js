const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"
const isAdmin=JSON.parse(storedToken).isAdmin;
if(!isAdmin)
window.location.href="../public/error.html"
const apiURL = "http://localhost:5001";
const employeeURL= `${apiURL}/api/customer/`;
const token=JSON.parse(storedToken).token;

function findCustomer(event)
{
    event.preventDefault();
    const phone=document.querySelector(".phone").value;
    
    fetch(employeeURL+phone,
        {method:"GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res=>
        {
            if(!res.ok)
            alert("Incorrect Phone Number");

            return res.json();
        }).then(data=>
        {
         const name=document.querySelector(".name");
         name.value=data.customerName;
         const saleTillDate=document.querySelector(".saleTillDate");
         saleTillDate.value=data.balanceAmount;
        })

}
function create(event)
{
    event.preventDefault();
 const phone=document.querySelector(".phone").value;
 const Amount=document.querySelector(".amount").value;

 const requestBody=JSON.stringify({phone,Amount})

 try{
 fetch(employeeURL+"update", {
    method:"PATCH",
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    body:requestBody
 }).then((res)=>
 {
    if(res.ok)
    {document.querySelector(".pop-up").style.display="flex";
    setTimeout(()=>{document.querySelector(".pop-up").style.display="none";},3000)
    setTimeout(()=>{window.location.reload()},3000)
    }
    return res.json();
 }).then();
}
catch(err)
{
    console.log(err.message);
}
}

const Btn=document.querySelectorAll(".Btn");
Btn[1].addEventListener("click",create);
Btn[0].addEventListener("click",findCustomer);

const logOutBtn=document.querySelector(".btn-outline-success");

logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("accessToken");
    window.location.href="../index.html";
})