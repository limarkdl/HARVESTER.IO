const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

const TrueLogin = '2a97516c354b68848cdbd8f54a226a0a55b21ed138e207ad6c5cbb9c00aa5aea';
const TruePassword = '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5';

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Отменяем стандартное поведение формы
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (await compareLoginData(username, password)) {
        window.location.href = `app.html?username=${encodeURIComponent(username)}`;
    } else {
        console.log(compareLoginData(username, password));
        errorMessage.innerText = 'Wrong username or password';
    }


});


function sha256(str) {
    const buffer = new TextEncoder().encode(str);
    return crypto.subtle.digest("SHA-256", buffer)
        .then(hash => {
            return Array.from(new Uint8Array(hash))
                .map(b => b.toString(16).padStart(2, "0"))
                .join("");
        });
}

/*function compareLoginData(login, password) {
        sha256(login).then(newHash => {
        if (newHash === TrueLogin) {
            sha256(password).then(newHash => {
                /!*console.log(newHash === TruePassword);*!/
                return newHash === TruePassword;
            });
        } else {
            /!*console.log('FALSE');*!/
            return 0;
        }
    });
}*/

async function compareLoginData(login, password) {
    const loginHash = await sha256(login);
    if (loginHash === TrueLogin) {
        const passwordHash = await sha256(password);
        return passwordHash === TruePassword;
    } else {
        return false;
    }
}


