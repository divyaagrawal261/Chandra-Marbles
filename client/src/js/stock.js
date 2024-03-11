const storedToken = localStorage.getItem('accessToken');
if(!storedToken)
window.location.href="../index.html"
const token=JSON.parse(storedToken).token;
const isAdmin=JSON.parse(storedToken).isAdmin;
if(!isAdmin)
window.location.href="../public/error.html"

const apiURL = "http://localhost:5001";
const StockUrl = `${apiURL}/api/stock/create`;

function add(event)
{
    event.preventDefault();
    const barcode=document.querySelector(".barcode").value;
    const company=document.querySelector(".company").value;
    const size=document.querySelector(".size").value;
    const quantity=document.querySelector(".quantity").value;
    const designName=document.querySelector(".designName").value;
    const quality=document.querySelector(".quality").value;
    const rate=document.querySelector(".rate").value;

    const requestBody=JSON.stringify({barcode, company, size, quantity, designName, quality, rate});

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
        setTimeout(()=>{
            document.querySelector(".pop-up").style.display="none";
            window.location.reload();
        },3000)}
        return res.json();}).then(data=>console.log(data));
}

const createBtn=document.querySelector(".Btn");

createBtn.addEventListener("click",add);

const logOutBtn=document.querySelector(".btn-outline-success");

logOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("accessToken");
    console.log("Hello World")
    window.location.href="../index.html";
})