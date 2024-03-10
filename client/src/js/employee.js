const storedToken = localStorage.getItem('accessToken');
const token=JSON.parse(storedToken).token;
const apiURL = "http://localhost:5001";
const employeeURL= `${apiURL}/api/employee/register`;

function create(event)
{
    event.preventDefault();
 const employeeName=document.querySelector(".name").value;
 const phone=document.querySelector(".phone").value;
 const password=document.querySelector(".password").value;

 const requestBody=JSON.stringify({employeeName,phone,password})
 console.log(requestBody);

 try{
 fetch(employeeURL, {
    method:"POST",
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    body:requestBody
 }).then((res)=>res.json()).then(data=>console.log(data));
}
catch(err)
{
    console.log(err.message);
}
}

const Btn=document.querySelector(".Btn");
Btn.addEventListener("click",create);