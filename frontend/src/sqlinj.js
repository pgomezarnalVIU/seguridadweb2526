// Crea una funcion denominada getUsuario
// obtiene el usuario a partir del input con id "usuario"
// usando fetch para hacer una peticion GET a http://localhost:8000/user/id
function getUser() {
    const usuario = document.getElementById("user_id").value;
    fetch(`http://localhost:8000/users/${usuario}`)
        .then(response => response.json())
        .then(data => {
            //La respuesta tiene el formato { "users":["id":1,"name":"nombre"] }
            const resultadoDiv = document.getElementById("resultado");
            let userStr = "";
            console.log(data);
            data.users.forEach(element => {
                userStr = userStr + `ID: ${element.id} <br> Nombre: ${element.name} <br> `;
            });
            resultadoDiv.innerHTML = userStr
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Crea una funcion denominada getUsuario
// obtiene el usuario a partir del input con id "usuario"
// usando fetch para hacer una peticion GET a http://localhost:8000/user/id
function getUserSQLmodel() {
    const usuario = document.getElementById("user_id").value;
    fetch(`http://localhost:8000/user_sqlmodel/${usuario}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //La respuesta tiene el formato { "user":{"id":1,"name":"nombre"} }
            const resultadoDiv = document.getElementById("resultado");
            let userStr = "";
            data.user.forEach(element => {
                userStr = userStr + `ID: ${element.id} <br> Nombre: ${element.nombre} <br> `;
            });
            resultadoDiv.innerHTML = userStr
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

