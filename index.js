const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

const TrueLogin = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';
const TruePassword = '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5';

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Отменяем стандартное поведение формы
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (await compareLoginData(username, password)) {
        window.location.href = `app.html?username=${encodeURIComponent(username)}`;
    } else {
        console.log(compareLoginData(username, password));
        errorMessage.innerText = 'Неверный логин или пароль';
    }


});


// Функция, которая шифрует строку в хэш с использованием алгоритма SHA-256
function sha256(str) {
    // Конвертируем строку в байтовый массив
    const buffer = new TextEncoder().encode(str);
    // Шифруем массив с использованием алгоритма SHA-256
    return crypto.subtle.digest("SHA-256", buffer)
        .then(hash => {
            // Конвертируем массив байтов в строку hex
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


