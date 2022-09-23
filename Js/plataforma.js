
/**
 * Crea una fila para cada elemento de las matrices del objeto usuarioActual, y luego anexa la
 * fila a la tabla. --Para cargar la tabla al iniciar la sesion
 * </code>
 */
function cargarTabla(){
    for (let i = 0; i < usuarioActual.fecha.length; i++) {
        let fila = document.createElement("tr");
        let fecha = usuarioActual.fecha[i];
        let tipoOperacion = usuarioActual.tipoOperacion[i];
        let monto = usuarioActual.monto[i];
        let fila_historial = `<td>${fecha}</td><td>${tipoOperacion}</td><td>S/.${monto}.00</td><td>Ver mas...</td>`;
        fila.innerHTML = fila_historial;
        tabla_historial.appendChild(fila);
    }
}

function limpiarCampos(){
    document.getElementById("monto_deposito").value = "";
    document.getElementById("monto_retiro").value = "";
    document.getElementById("monto_transferencia").value = "";
    document.getElementById("email_transferencia").value = "";
}


/**
 * Cuando la función es llamada, añade la clase 'aux' a los elementos con los id's
 * 'container_perfil', 'container_deposito', 'container_retiro', y 'container_transferir'.
 */
function ocultar(){
    container_perfil.classList.add("aux");
    container_deposito.classList.add("aux");
    container_retiro.classList.add("aux");
    container_transferir.classList.add("aux");
}

function depositos(){
    let deposito = document.getElementById("monto_deposito").value;
    usuarioActual.saldo = parseInt(usuarioActual.saldo) + parseInt(deposito);
    mostrar_saldo.innerHTML = usuarioActual.saldo;
    // localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    let fila = document.createElement("tr");
    let fecha = new Date();
    let fecha_hora = fecha.toLocaleString();
    let tipo = "Depósito";
    let monto = deposito;
    let saldo = usuarioActual.saldo;
    let fila_historial = `<td>${fecha_hora}</td><td>${tipo}</td><td>S/.${monto}.00</td><td>Ver mas...</td>`;
    fila.innerHTML = fila_historial;
    addDatos(fecha_hora, tipo, monto, saldo);
    tabla_historial.appendChild(fila);
    limpiarCampos();
}

/**
 * Toma el valor del campo de entrada, lo resta del saldo actual, y luego añade una fila a
 * la tabla con la fecha, el tipo de transacción, el importe y el saldo.
 */
function retiros(){
    let retiro = document.getElementById("monto_retiro").value;
    usuarioActual.saldo = parseInt(usuarioActual.saldo) - parseInt(retiro);
    mostrar_saldo.innerHTML = usuarioActual.saldo;
    let fila = document.createElement("tr");
    let fecha = new Date();
    let fecha_hora = fecha.toLocaleString();
    let tipo = "Retiro";
    let monto = retiro;
    let saldo = usuarioActual.saldo;
    let fila_historial = `<td>${fecha_hora}</td><td>${tipo}</td><td>S/.${monto}.00</td><td>Ver mas...</td>`;
    fila.innerHTML = fila_historial;
    addDatos(fecha_hora, tipo, monto, saldo);
    tabla_historial.appendChild(fila);
    limpiarCampos();
}

/**
  * Toma cuatro parámetros, y los añade a las matrices del objeto usuarioActual.
 * @param fecha_hora - "2018-11-20T18:00:00.000Z"
 * @param tipo - "deposito" or "retiro"
 * @param monto - amount
 * @param saldo - the balance of the account
 */
function addDatos(fecha_hora, tipo, monto, saldo){
    usuarioActual.fecha.push(fecha_hora);
    usuarioActual.tipoOperacion.push(tipo);
    usuarioActual.monto.push(monto);
    usuarioActual.saldo=saldo;
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
}

/**
 * Toma el valor del input con el id "monto_transferencia" y el valor del input con
 * el id "email_transferencia" y luego busca al usuario con el email que se introdujo en el
 * entrada con el id "email_transferencia" y si lo encuentra, resta el valor de la entrada con
 * el id "monto_transferencia" del saldo del usuario actual y añade el valor de la entrada con
 * el id "monto_transferencia" al saldo del usuario que se encontró y luego añade una fila a la
 * tabla con el id "tabla_historial" con la fecha, el tipo de operación, el importe y el
 * saldo.
 */
function transferencias(){
    let transferencia = document.getElementById("monto_transferencia").value;
    let email = document.getElementById("email_transferencia").value;
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))|| [];
    let usuarioEncontrado = usuarios.find(usuario => usuario.email === email);
    if (usuarioEncontrado) {
        usuarioActual.saldo = parseInt(usuarioActual.saldo) - parseInt(transferencia);
        usuarioEncontrado.saldo = parseInt(usuarioEncontrado.saldo) + parseInt(transferencia);
        mostrar_saldo.innerHTML = usuarioActual.saldo;
        let fila = document.createElement("tr");
        let fecha = new Date();
        let fecha_hora = fecha.toLocaleString();
        let tipo = "Transferencia";
        let monto = transferencia;
        let saldo = usuarioActual.saldo;
        let fila_historial = `<td>${fecha_hora}</td><td>-${tipo}</td><td>S/.${monto}.00</td><td>Ver mas...</td>`;
        fila.innerHTML = fila_historial;
        addDatos(fecha_hora, tipo, monto, saldo)
        tabla_historial.appendChild(fila);
        usuarioEncontrado.fecha.push(fecha_hora);
        usuarioEncontrado.tipoOperacion.push("+"+tipo);
        usuarioEncontrado.monto.push(monto);
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email === usuarioEncontrado.email) {
                usuarios[i] = usuarioEncontrado;
            }
        }
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    } else {
        alert("El email ingresado no existe");
    }
    limpiarCampos();
}

/**
 * Toma el correo electrónico del usuario actual y encuentra el usuario en el array de usuarios, luego reemplaza el usuario
 * en el array con el usuario actual.
 */
function modificarUsuarios(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === usuarioActual.email) {
            usuarios[i] = usuarioActual;
        }
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

/**
 * Modifica los datos del usuario en el localStorage, luego elimina los datos del usuario del
 * localStorage y luego redirige al usuario a la página index.html.
 */
function cerrarSesion(){
    modificarUsuarios();
    localStorage.removeItem("usuarioActual");
    window.location.href = "../index.html";
}


/* Obtener los datos del usuario desde localStorage y mostrarlos en la página. */
let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
let mostrar_nombre = document.getElementById("mostrar_nombre");
let mostrar_saldo = document.getElementById("mostrar_saldo");
mostrar_nombre.innerHTML = usuarioActual.nombre;
mostrar_saldo.innerHTML = usuarioActual.saldo;

/* Seleccionando los elementos con las clases 'contenedor_perfil', 'contenedor_deposito',
'contenedor_retiro', y 'contenedor_transferir'. */
let container_perfil = document.querySelector(".container_perfil");
let container_deposito = document.querySelector(".container_deposito");
let container_retiro = document.querySelector(".container_retiro");
let container_transferir = document.querySelector(".container_transferir");

/* Seleccionando los elementos con los id's 'perfil', 'btn_deposito', 'btn_retiro', y
'btn_transferencia'. */
let btn_perfil = document.getElementById("perfil");
let btn_deposito = document.getElementById("btn_deposito");
let btn_retiro = document.getElementById("btn_retiro");
let btn_transferencia = document.getElementById("btn_transferencia");


ocultar();
/* Una función que se llama cuando el usuario hace clic en el botón. */
btn_deposito.addEventListener("click", () => {
    ocultar();
    container_deposito.classList.remove('aux');
    
});

btn_retiro.addEventListener("click", () => {
    ocultar();
    container_retiro.classList.remove('aux');
    
});

btn_transferencia.addEventListener("click", () => {
    ocultar();
    container_transferir.classList.remove('aux');
    
});

btn_perfil.addEventListener("click", () => {
    ocultar();
    container_perfil.classList.remove('aux');
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let pais = document.getElementById("pais");
    let dni = document.getElementById("dni");
    let correo = document.getElementById("correo");
    let celular = document.getElementById("celular");

    nombre.innerHTML = usuarioActual.nombre;
    apellido.innerHTML = usuarioActual.apellido;
    pais.innerHTML = usuarioActual.pais;
    dni.innerHTML = usuarioActual.dni;
    correo.innerHTML = usuarioActual.email;
    celular.innerHTML = usuarioActual.celular;
});




/* Seleccionar los elementos con los id's 'tabla_historial', 'btn_depositar', 'btn_retirar',
'btn_transferir', y 'cerrar_sesion'. */
let tabla_historial = document.getElementById("tabla_historial");
cargarTabla();
let btn_depositar = document.getElementById("btn_depositar");
let btn_retirar = document.getElementById("btn_retirar");
let btn_transferir = document.getElementById("btn_transferir");
let cerrar_sesion = document.getElementById("cerrar_sesion");

/* Añadir un listener de eventos a los botones. */
btn_depositar.addEventListener("click", () => {
    depositos();
});

btn_retirar.addEventListener("click", () => {
    retiros();
});

btn_transferir.addEventListener("click", () => {
    transferencias();
});

cerrar_sesion.addEventListener("click", () => {
    cerrarSesion();
});




