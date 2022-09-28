
/*Alertas personalizadas*/
function alerta1(posicion,icono,titulo) {
    Swal.fire({
        position: posicion,
        icon: icono,
        title: titulo,
        showConfirmButton: false,
        timer: 1500,
    })
}





/* Crea una clase llamada Usuario. */
class Usuario {
    constructor(nombre,apellido,pais,dni,email,celular,password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.pais = pais;
        this.dni = dni;
        this.email = email;
        this.celular = celular;
        this.password = password;
        this.saldo = 0;
        this.tipoOperacion=[];
        this.monto=[];
        this.fecha=[];
    }
}

/**
 * Crea un nuevo objeto usuario con los valores de las entradas del formulario.
 * @returns the object usuario.
 */
function crearUsuario() {
    let nombre = document.getElementById("nombre_r").value;
    let apellido = document.getElementById("apellido_r").value;
    let pais = document.getElementById("pais_r").value;
    let dni = document.getElementById("dni_r").value;
    let email = document.getElementById("email_r").value;
    let celular = document.getElementById("celular_r").value;
    let password = document.getElementById("contra_r").value;
    let usuario = new Usuario(nombre,apellido,pais,dni,email,celular,password);
    return usuario;
}




/**
 * Toma la entrada del usuario, crea un nuevo objeto usuario, y luego empuja ese objeto en un array de
 * usuarios.
 */
function exportarUsuario() {
    let usuario = crearUsuario();
    usuarios=JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


function limpiarCampos() {
    document.getElementById("nombre_r").value = "";
    document.getElementById("apellido_r").value = "";
    document.getElementById("pais_r").value = "";
    document.getElementById("dni_r").value = "";
    document.getElementById("email_r").value = "";
    document.getElementById("celular_r").value = "";
    document.getElementById("contra_r").value = "";
}

/**
 * Si hay usuarios en localStorage, entonces comprueba si el usuario existe en localStorage, si lo hace, entonces
 * establecer el usuario como el usuario actual y redirigir a la página de la plataforma, de lo contrario, mostrar una alerta.
 */
function validarUsuario() {
    let email = document.getElementById("email_init").value;
    let password = document.getElementById("contra_init").value;
    let cant = localStorage.length;
    if(cant > 0){
        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        let usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.password === password);
        if (usuarioEncontrado) {
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));
            
            window.location.href = "../Page/plataforma.html";
        } else {
            alerta1('center','warning','Usuario no registrado');
        }
    } else {
        alerta1('center','warning','Usuario no registrado');
    }
}

/**
 * Si hay usuarios en localStorage, comprueba si el correo electrónico ya está registrado. Si lo está, muestra una
 * alerta. Si no lo está, añade el usuario a localStorage y muestra una alerta. Si no hay usuarios en
 * localStorage, añadir el usuario a localStorage y mostrar una alerta.
 */
function validarRegistro() {
    let email = document.getElementById("email_r").value;
    let cant = localStorage.length;
    if(cant > 0){
        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        let usuarioEncontrado = usuarios.find(usuario => usuario.email === email);
        if (usuarioEncontrado) {
            alerta1('center','warning','El usuario ya existe');
        } else {
            exportarUsuario();
            alerta1('center','success','Usuario registrado');
            limpiarCampos();
        }
    } else {
        exportarUsuario();
        alerta1('center','success','Usuario registrado');
        limpiarCampos();
    }
}

/**
 * Si el valor de la entrada con el id de nombre_r está vacío, o el valor de la entrada con el id de
 * email_r está vacío, o el valor de la entrada con el id de contra_r está vacío, entonces alerta al usuario
 * que todos los campos son obligatorios. En caso contrario, llama a la función validarRegistro().
 */
function campoVacio() {
    let nombre = document.getElementById("nombre_r").value;
    let email = document.getElementById("email_r").value;
    let password = document.getElementById("contra_r").value;
    (nombre === "") || (email === "") || (password === "")? alerta1('center','warning','Todos los campos son obligatorios') : validarRegistro();
    // if (nombre === "" || email === "" || password === "") {
    //     alerta1('center','warning','Todos los campos son obligatorios');
    // } else {
    //     validarRegistro();
    // }
}

/**
 * Si los campos de correo electrónico y contraseña están vacíos, entonces muestra una alerta. En caso contrario, llame a la función validarUsuario()
 *.
 */
function campoVacioInit() {
    let email = document.getElementById("email_init").value;
    let password = document.getElementById("contra_init").value;
    (email === "") || (password === "")? alerta1('center','warning','Todos los campos son obligatorios') : validarUsuario();
    // if (email === "" || password === "") {
    //     alerta1('center','warning','Todos los campos son obligatorios');
    // } else {
    //     validarUsuario();
    // }
}



/* Una función que permite cambiar entre los formularios de inicio de sesión y de registro. */
const $btnSignIn= document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),  
      $signUp = document.querySelector('.sign-up'),
      $signIn  = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active')
    }
});


let usuarios = [];

let registrar_r = document.getElementById("registrar_r");
let iniciar= document.getElementById("iniciar");

registrar_r.addEventListener("click", campoVacio);
iniciar.addEventListener("click", campoVacioInit);

