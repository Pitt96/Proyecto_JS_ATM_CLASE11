
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




function exportarUsuario() {
    let usuario = crearUsuario();
    usuarios=JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


function limpiarCampos() {
    document.getElementById("nombre_r").value = "";
    document.getElementById("email_r").value = "";
    document.getElementById("contra_r").value = "";
}

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

function campoVacio() {
    let nombre = document.getElementById("nombre_r").value;
    let email = document.getElementById("email_r").value;
    let password = document.getElementById("contra_r").value;
    if (nombre === "" || email === "" || password === "") {
        alerta1('center','warning','Todos los campos son obligatorios');
    } else {
        validarRegistro();
    }
}

function campoVacioInit() {
    let email = document.getElementById("email_init").value;
    let password = document.getElementById("contra_init").value;
    if (email === "" || password === "") {
        alerta1('center','warning','Todos los campos son obligatorios');
    } else {
        validarUsuario();
    }
}



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

