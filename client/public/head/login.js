const apiURL="https://chandra-marbles.onrender.com";

const loginurl = `${apiURL}/api/employee/login`;
const getUserDetailsUrl = `${apiURL}/api/employee/`;

const loginBtn = document.getElementById("loginBtn");
var accessToken;

const login = (event) => {
  document.querySelector(".loader").style.display="flex";
  event.preventDefault();
  const loginEmail = document.getElementById("exampleInputEmail1").value;
  const loginPassword = document.getElementById("exampleInputPassword1").value;
  try {
    fetch(loginurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: loginEmail,
        password: loginPassword,
      }),
    })
      .then((response) => 
      {
        if(response.ok) return response.json()
      else 
        {
         document.querySelector(".loader").style.display="none";
         document.querySelector(".pop-up").style.display="flex";
         setTimeout(()=>document.querySelector(".pop-up").style.display="none",2000)
        }
    })
      .then((data) => {
        accessToken = data.accessToken;
        const isAdmin=data.employee.isAdmin;
        setAccessTokenWithExpiry(accessToken,isAdmin, 360)
        getUserDetails(accessToken);
        if(!data.employee.isAdmin)
        window.location.href="../error.html";
        else
        window.location.href="./headDash.html";
      })
      .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
  }
};

const getUserDetails = (accessToken) => {
  fetch(getUserDetailsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {  });
};

function setAccessTokenWithExpiry(accessToken,isAdmin, expiresInMinutes) {
  const now = new Date();
  const expirationTime = now.getTime() + expiresInMinutes * 60 * 1000; 
  localStorage.setItem('accessToken', JSON.stringify({
    token: accessToken,
    expiry: expirationTime,
    isAdmin: isAdmin
  }));
}

loginBtn.addEventListener("click", login);
