const storedToken = localStorage.getItem('accessToken');
const token = JSON.parse(storedToken).token;
const printUrl = "http://localhost:5001/api/sale/print/";

function removeFromPrint(id) {
    fetch(printUrl + `${id}`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then(data => {
        window.location.reload();
    });
}

fetch(printUrl, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}).then((res) => res.json()).then(data => {
    const container = document.querySelector(".container");
    data.forEach((bill) => {
        const parent = document.createElement("div");
        parent.className = "row border m-1";
        parent.id = bill._id;
        parent.url = bill.blobURI;

        parent.innerHTML = `
            <div class="col-lg-3">${bill.employeeName}</div>
            <div class="col-lg-3">${bill.phone}</div>
            <div class="col-lg-3">${bill.totalAmount}</div>
            <div class="col-lg-3">
                <a target="_blank" href="data:application/pdf;base64,${parent.url}">
                    <button class="col-lg-12" onclick="removeFromPrint('${parent.id}')">
                        <span>Print</span>
                    </button>
                </a>
            </div>
        `;

        container.append(parent);
    });
}).catch(error => {
    console.error('Error fetching data:', error);
});
