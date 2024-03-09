const apiURL="https://shortly-backend-8v8s.onrender.com";

const loginurl = `${apiURL}/api/users/login`;
const getUserDetailsUrl = `${apiURL}/api/users/current`;

const loginBtn = document.getElementById("loginBtn");
var accessToken;

const login = (event) => {
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
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then((response) => 
      {
        if(response.ok) return response.json()
      else 
        {
         document.querySelector(".pop-up").style.display="flex";
         setTimeout(()=>document.querySelector(".pop-up").style.display="none",2000)
        }
    })
      .then((data) => {
        console.log(data);
        accessToken = data.accessToken;
        setAccessTokenWithExpiry(accessToken, 15)
        getUserDetails(accessToken);
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
    .then((data) => {
      console.log(data);
      window.location.href = "./public/dashBoard.html";
    });
};

function setAccessTokenWithExpiry(accessToken, expiresInMinutes) {
  const now = new Date();
  const expirationTime = now.getTime() + expiresInMinutes * 60 * 1000; 
  localStorage.setItem('accessToken', JSON.stringify({
    token: accessToken,
    expiry: expirationTime
  }));
}

loginBtn.addEventListener("click", login);
