document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token en el LocalStorage');
    } else {
      cargarGraficos(token);
    }
  });
  
  function cargarGraficos(token) {
    // Solicitar datos para el gráfico de pastel
    fetch("http://10.10.1.28:5000/api/filtrarTenantEmails_graph", {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('La solicitud no fue exitosa');
      }
    })
    .then(jsonFig => {
      // Parsear la respuesta JSON
      const data = JSON.parse(jsonFig);
      // Crear el gráfico de pastel con Plotly
      Plotly.newPlot('pie-chart', data.data, data.layout);
    })
    .catch(error => console.error('Error en gráfico de pastel:', error));
  
    // Solicitar datos para el gráfico de líneas
    fetch("http://10.10.1.28:5000/api/filtrarTenantEmails_line", {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('La solicitud no fue exitosa');
      }
    })
    .then(jsonFig => {
      // Parsear la respuesta JSON
      const data = JSON.parse(jsonFig);
      // Crear el gráfico de líneas con Plotly
      Plotly.newPlot('line-chart', data.data, data.layout);
    })
    .catch(error => console.error('Error en gráfico de líneas:', error));
  
    // Solicitar datos para el gráfico de dona
    fetch("http://10.10.1.28:5000/api/grafictype_alert", {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('La solicitud no fue exitosa');
      }
    })
    .then(jsonFig => {
      // Parsear la respuesta JSON
      const data = JSON.parse(jsonFig);
      // Crear el gráfico de dona con Plotly
      Plotly.newPlot('donut-chart', data.data, data.layout);
    })
    .catch(error => console.error('Error en gráfico:', error));
    fetch("http://10.10.1.28:5000/api/count_users", {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('La solicitud no fue exitosa');
        }
    })
    .then(data => {
        console.log("Datos recibidos countusers:", data);
        
        const numeroUsuarios = data.datos[8];
        
        const contUsersElement = document.getElementById("count-users");
        contUsersElement.textContent = `${numeroUsuarios}`;

        const numeroGrupos = data.datos[9];
        
        const contGroupsElement = document.getElementById("count-groups");
        contGroupsElement.textContent = `${numeroGrupos}`;

        
    })
    
    .catch(error => console.error('Error al obtener el número de usuarios:', error));

    fetch("http://10.10.1.28:5000/api/all_tenants", {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('La solicitud no fue exitosa');
        }
    })
    .then(data => {
      console.log("Datos recibidos", data);
   })
    .catch(error => console.error('Error al obtener el número de usuarios:', error));
    
  }
  