
function addAuthorizationToken(requestOptions) {
    const token = localStorage.getItem('token');
  
    if (token) {
      requestOptions.headers = {
        ...requestOptions.headers,
        'Authorization': `Bearer ${token}`
      };
    }
  
    return requestOptions;
  }

  export { addAuthorizationToken };