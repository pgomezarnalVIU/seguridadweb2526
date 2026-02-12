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
    return 
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