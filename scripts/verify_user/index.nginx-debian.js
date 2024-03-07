//Lógic to create Animations
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");


sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
const username_btn = document.getElementById("username_input");
const password_btn = document.getElementById("password_btn");

function VerifyLogin() {
  const correo = document.getElementById('correo_login').value;
  const password = document.getElementById('password_login').value;
  document.getElementById('loader').style.display = 'block';

  if (correo.trim() === '' || password.trim() === '') {
    return console.log("{verify_user/index_nginx-dbian.html} Verificado en los campos vacíos");
  }

  fetch('http://10.10.1.28:5000/api/login', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correo: correo, password: password })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        document.getElementById('loader').style.display = 'none';
        throw new Error('Ha ocurrido un error en las credenciales');
      }
    })
    .then(data => {
      if (data.sesion === 'Valida' && data.Token) {
        const token = data.Token;
        localStorage.setItem('token', token); 

        console.log(token)
        window.location.href = '/admin.nginx-debian.html';
        document.getElementById('loader').style.display = 'none';
      } else {
        console.error('Credenciales inválidas');
        document.getElementById('loader').style.display = 'none';
        alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
      }
    })
    .catch(error => {
      console.error('Error inesperado al iniciar sesión:', error);
      document.getElementById('loader').style.display = 'none';
      alert('Se produjo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    });
}








