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
  const containererror = document.getElementById('container-error_sign-in');
  ShowLoaderButtom()
  document.getElementById('loader').disabled = true;
  if (correo.trim() === '' || password.trim() === '') {
    labelCodigo.innerHTML = `Error: ¡¿?! El usuario o la contraseña no pueden estar vacíos.`.replace('Error', '<strong>Error</strong>');
    containererror.style.display = 'block';
    HideLoaderButtom();
    return console.log("{verify_user/index_nginx-debian.html} Verificado en los campos vacíos");
    
  }
  if(navigator.onLine){

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
        labelCodigo.innerHTML = `Error: ¡¿?! El usuario o la contraseña incorrectos(s).`.replace('Error', '<strong>Error</strong>');
        containererror.style.display = 'block';
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
        // alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        containererror.style.display = 'block';
        labelCodigo.innerHTML = `Error: ¡Whoops! El usuario o la contraseña incorrectos(s).`.replace('Error','<strong>Error</strong>');
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        containererror.style.display = 'block';
        labelCodigo.innerHTML = `Error500: ¡! Ha ocurrido un error en el servidor. Intente mas Tarde.`.replace('Error','<strong>Error</strong>');
        throw new Error('Error al obtener datos de la API');
      }
    })
    .then(data => {
      console.log(data);
      window.location.href = "/admin.nginx-debian.html";
    })
    .catch(error => {
      console.error('Error:', error);
      // alert('Se produjo un error. Por favor, inténtalo de nuevo más tarde.');
      containererror.style.display = 'block';
      labelCodigo.innerHTML = `Error: ¡Whoops! El usuario o la contraseña incorrectos(s).`.replace('Error','<strong>Error</strong>');
    })
    .finally(() => {
      HideLoaderButtom()
    });
}
}

function HideLoaderButtom(){

  const btnhideloader = document.getElementById('loader')
  btnhideloader.style.display = 'none';

}

function ShowLoaderButtom(){
  const btnshowloader = document.getElementById('loader')
  btnshowloader.style.display = 'block';
}



