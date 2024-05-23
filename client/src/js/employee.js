const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"
const isAdmin=JSON.parse(storedToken).isAdmin;
if(!isAdmin)
window.location.href="../public/error.html"
const apiURL = "https://chandra-marbles.onrender.com";
const employeeURL= `${apiURL}/api/employee/register`;
const token=JSON.parse(storedToken).token;

function create(event)
{
    event.preventDefault();
 const employeeName=document.querySelector(".name").value;
 const phone=document.querySelector(".phone").value;
 const password=document.querySelector(".password").value;

 const requestBody=JSON.stringify({employeeName,phone,password});

 try{
 fetch(employeeURL, {
    method:"POST",
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

const Btn=document.querySelector(".Btn");
Btn.addEventListener("click",create);

const logOutBtn=document.querySelector(".btn-outline-success");

logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("accessToken");
    window.location.href="../index.html";
})