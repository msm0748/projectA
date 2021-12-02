const loginBtn = document.querySelector(".login a");

loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.open('login.html', 'subPage', "width=570, height=350, resizable = no, scrollbars = no");
});

function userNameCheck() {
    const userName = document.getElementById("userName");
    const userUl = document.querySelector(".user");
    const loginTag = document.querySelector(".login");

    if (localStorage.getItem('userName')) {
        userUl.style.display = "flex";
        loginTag.style.display = "none";
        userName.innerText = localStorage.getItem('userName') + "님";
    } else {
        userUl.style.display = "none";
        loginTag.style.display = "block";
    }
}
userNameCheck();
const logOut = document.getElementById("logOut");
logOut.addEventListener("click", function() {
    localStorage.clear();
    userNameCheck();
})