const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"

const logOutBtn=document.querySelector(".btn-outline-success");

logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("accessToken");
    window.location.href="../index.html";
})