// Funcion que genera una cookie con un nombre y una vloar
// que tiene una duración de 7 días
function setCookie(name, value) {
    const d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 días en milisegundos
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Funcion que usa Web Crypto API para generar un hash con SHA-256 a partir de un string
async function hashString(str) {

    // La función TextEncoder se utiliza para convertir el string en un Uint8Array, que es el formato requerido por la función digest
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    // La función digest devuelve una promesa que se resuelve con un ArrayBuffer que contiene el hash
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    // Convertimos el ArrayBuffer a un string hexadecimal para que sea más legible
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // La función toString(16) convierte cada byte a su representación hexadecimal, 
    // y padStart(2, '0') asegura que cada byte tenga dos dígitos
    const hashString = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashString
}

//Funcion que decodifica el valor de una cookie que ha usado Web Cryto API para generar un hash
async function compareHashedCookie(name, value) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            const hashedValue = cookie.substring(name.length + 1);
            //Convertir el hash hexadecimal de vuelta a un array de bytes
            // La funcion match(/.{1,2}/g) divide la cadena hexadecimal en grupos de dos caracteres (un byte)
            // Luego, map convierte cada grupo de dos caracteres en un número entero usando parseInt con base 16
            const hashArray = hashedValue.match(/.{1,2}/g).map(byte => parseInt(byte, 16));
            //Calcular el hash del valor original y compararlo con el hash almacenado en la cookie
            const encoder = new TextEncoder();
            const data = encoder.encode(value);

            const hashBuffer = await crypto.subtle.digest("SHA-256", data);
            const computedHashBytes = new Uint8Array(hashBuffer);
            // Comparar los arrays de bytes
            if (computedHashBytes.length === hashArray.length) {
                let match = true;
                for (let j = 0; j < computedHashBytes.length; j++) {
                    if (computedHashBytes[j] !== hashArray[j]) {
                        match = false;
                        break;
                    }
                }
                return match;
            }
        }
    }
    return null;
}

// Utilizamos la función para crear una cookie de ejemplo
setCookie("usuario", "Paco Gomez");

// Una funcion de ejemplo para generar un hash de una contraseña y generar una cookie con el hash
async function setPasswordCookie(password) {
    const hashedPassword = await hashString(password);
    setCookie("password", hashedPassword);
}

// Llamamos a la función de ejemplo con una contraseña
setPasswordCookie("paco1234");

// Comparamos el valor de la cookie con el valor original para verificar que el hash coincide
// y mostramos el resultado en la consola
compareHashedCookie("password", "paco1234").then(result => {
    if (result) {
        console.log("La contraseña coincide con el hash almacenado en la cookie.");
    } else {
        console.log("La contraseña no coincide con el hash almacenado en la cookie.");
    }
});