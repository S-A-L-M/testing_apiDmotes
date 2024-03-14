function SaveUsers(){
  const nombre = document.getElementById("username_register").value;
  const correo = document.getElementById("email_register").value;
  const contrasena = document.getElementById("password_register").value;
  const containererror = document.getElementById('container-error_sign-up');
  const labelCodigo = document.getElementById('container-error_sign-up');
  ShowLoaderButtom();

  const fechaActual = new Date();
  const formattedDate = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}-${fechaActual.getDate().toString().padStart(2, '0')}T${fechaActual.getHours().toString().padStart(2, '0')}:${fechaActual.getMinutes().toString().padStart(2, '0')}:${fechaActual.getSeconds().toString().padStart(2, '0')}`;

  if (nombre.trim() === '' || correo.trim() === '' || contrasena.trim()==='') {
    HideLoaderButtom();
    labelCodigo.innerHTML = `Error: ¡¿?! El usuario, la contraseña y/o no pueden estar vacío(s).`.replace('Error', '<strong>Error</strong>');
    containererror.style.display = 'block';
    return console.log("{SaveUsers/index_nginx-dbian.html} Verificado en los campos vacíos en Guardar Users");
  } 
  if(navigator.onLine){
  fetch('http://10.10.1.28:5000/api/users')
    .then(response => response.json())
    .then(data => {
      const correoExiste = data.some(usuario => usuario.email === correo);

      if (correoExiste) {
        labelCodigo.innerHTML = `Error: ¡¿?! El usuario y/o la contraseña ya se encuentran registrado(s).`.replace('Error', '<strong>Error</strong>');
        containererror.style.display = 'block';
        alert('Estas credenciales ya están en uso. ¿Deseas iniciar sesión?');
        HideLoaderButtom();
      } else {
        
        const data = {
          companie_id:1,
          created_at: formattedDate,
          is_email_verified: 1,
          name: nombre,
          email: correo,
          password: contrasena,
          updated_at: formattedDate,
          remember_me_token: '1',
          status: 1,
        };
        
        fetch('http://10.10.1.28:5000/api/save_users', {
          method: 'POST',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          if (data.mensaje === 'usuario guardado exitosamente') {
            console.log('Guardado exitosamente', data, JSON);
            // alert('Usuario guardado exitosamente');
            
          } else {
            console.error('Error al guardar usuario:', data.mensaje);
            // alert('Error al guardar usuario. Por favor, inténtalo de nuevo.');
            HideLoaderButtom();
          }
        })
        .catch(error => {
          console.error('Error inesperado al intentar guardar usuario:', error);
          HideLoaderButtom();
          // alert('Se produjo un error al intentar guardar usuario. Por favor, inténtalo de nuevo más tarde.');
        });
      }
    })
    .catch(error => {
      console.error('Error al obtener usuarios:', error);
      HideLoaderButtom();
      alert('Se produjo un error al obtener usuarios. Por favor, inténtalo de nuevo.');
    });
}
}

function HideLoaderButtom(){
  const btnhideloader = document.getElementById('loader_sign-in')
  btnhideloader.style.display = 'none';
}

function ShowLoaderButtom(){
  const btnshowloader = document.getElementById('loader_sign-in')
  btnshowloader.style.display = 'block';
}