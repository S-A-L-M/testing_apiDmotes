"use strict";

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
  const labelCodigo = document.getElementById('label-content');
  ShowLoaderButtom()
  document.getElementById('loader').disabled = true;
  if (correo.trim() === '' || password.trim() === '') {
    labelCodigo.textContent = `Error: ¡Whoops! El usuario o la contraseña que has ingreso parece estar incorrecta.`;
    HideLoaderButtom()
    return console.log("{verify_user/index_nginx-debian.html} Verificado en los campos vacíos");
    
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
        HideLoaderButtom()
        throw new Error('Ha ocurrido un error en las credenciales');
      }
    })
    .then(data => {
      if (data.sesion === 'Valida' && data.Token) {
        const token = data.Token;
        localStorage.setItem('token', token);

        console.log(token);
        return fetch('http://10.10.1.28:5000/api/TenantEvents', {
          method: 'GET',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
      } else {
        console.error('Credenciales inválidas');
        HideLoaderButtom()
        alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener datos de la API');
      }
    })
    .then(data => {
      console.log(data);
      window.location.href = "/admin.nginx-debian.html";
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Se produjo un error. Por favor, inténtalo de nuevo más tarde.');
    })
    .finally(() => {
      HideLoaderButtom()
    });
}

function HideLoaderButtom(){

  const btnhideloader = document.getElementById('loader')
  btnhideloader.style.display = 'none';

}

function ShowLoaderButtom(){
  const btnshowloader = document.getElementById('loader')
  btnshowloader.style.display = 'block';
}



