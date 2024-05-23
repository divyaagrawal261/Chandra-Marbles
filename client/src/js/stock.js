const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"
const token=JSON.parse(storedToken).token;
const isAdmin=JSON.parse(storedToken).isAdmin;
if(!isAdmin)
window.location.href="../public/error.html"

const apiURL = "https://chandra-marbles.onrender.com";
const StockUrl = `${apiURL}/api/stock/create`;

function add(event)
{
    event.preventDefault();
    const barcode=document.querySelector(".barcode").value;
    const company=document.querySelector(".company").value;
    const size=document.querySelector(".size").value;
    const quantity=document.querySelector(".quantity").value;
    const quality=document.querySelector(".quality").value;

    const requestBody=JSON.stringify({barcode, company, size, quantity, quality});

    fetch(StockUrl, {
        method:"POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body:requestBody
     }).then((res)=>{
        if(res.ok)
        {document.querySelector(".pop-up").style.display="flex";
        setTimeout(()=>{document.querySelector(".pop-up").style.display="none";},3000)
        setTimeout(()=>{window.location.reload()},3000)}
        return res.json();}).then();
}

const createBtn=document.querySelector(".Btn");

createBtn.addEventListener("click",add);

const logOutBtn=document.querySelector(".btn-outline-success");

logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("accessToken");
    window.location.href="../index.html";
})