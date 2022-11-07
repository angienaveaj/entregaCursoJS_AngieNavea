let mostrarResumen = JSON.parse(localStorage.getItem('carrito'));
    console.log(mostrarResumen);

    mostrarResumen.forEach( (curso) => {
        const row = document.createElement('tbody');///
        row.innerHTML = `
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
        `;

        tablas.appendChild(row);

    });
    

document.addEventListener('DOMContentLoaded', function(){
    const email = {
        email: '',
        nombre: '',
        apellido: '',
        credito: '',
        ccv: '',
        mes: '',
        year:'',
    }
    console.log(email)

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputCredito = document.querySelector('#credito');
    const inputCCV = document.querySelector('#ccv')
    const inputMes = document.querySelector('#mes');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');

    const elemento = document.querySelector('#tablas');///

    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner')

    //Select mes
    for(let i = 1; i <= 12; i++){
        let opcion = document.createElement('option');
        opcion.value = i;
        opcion.innerText = i;
        inputMes.appendChild(opcion);
    }

    const inputYear = document.querySelector('#year');
    //Select year
    const yearActual = new Date().getFullYear();
    for(let i = yearActual; i <= yearActual + 8; i++){
        let opcion = document.createElement('option');
        opcion.value = i;
        opcion.innerText = i;
        inputYear.appendChild(opcion);
    }

    const formulario = document.querySelector('#formulario');

    // Asignar eventos
    inputEmail.addEventListener('input', validar);

    inputNombre.addEventListener('input', validar);

    inputApellido.addEventListener('input', validar);

    inputCredito.addEventListener('input', validar);

    inputCCV.addEventListener('input', validar);

    inputMes.addEventListener('input', validar);

    inputYear.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        //reiniciar objeto
        email.email = '';
        email.nombre= '';
        email.apellido= '';
        email.credito= '';
        email.ccv= '';
        email.mes= '';
        email.year='';

        formulario.reset();
        comprobarEmail();
    })

    
    function enviarEmail(e){
        e.preventDefault();
        // spinner.classList.remove('hidden');
        elemento.classList.add('hidden');
        localStorage.clear('articulosCarrito');

        setTimeout(() => {
            // spinner.classList.add('hidden');
            //reiniciar objeto
            email.email = '';
            email.nombre= '';
            email.apellido= '';
            email.credito= '';
            email.ccv= '';
            email.mes= '';
            email.year='';

        formulario.reset();
        comprobarEmail();

        }, 3000);
        //Alerta exitoso
        Swal.fire({
            title: 'Gracias por tu compra, tu pago será procesado',
            icon:'success',
            confirmButtonText:'<i class="fa fa-thumbs-up"></i> Aceptar',
            footer: '<a href="index.html">< Volver a cursos</a>'
        });
    } 

////
    function validar(e){
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.name} es obligatorio `, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        //valida email
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };
        //////valida numeros tarjeta
        if(e.target.id === 'credito' && !validarCredito(e.target.value)){
            mostrarAlerta('La tarjeta no es válida', e.target.parentElement);
            return;
        };
        //// valida ccv
        if(e.target.id === 'ccv' && !validarCCV(e.target.value)){
            mostrarAlerta('CCV no es válido', e.target.parentElement);
            return;
        };

        limpiarAlerta(e.target.parentElement); 

        // Asignar valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(email)
        //comprueba email
        comprobarEmail();
    }
    function mostrarAlerta(mensaje, referencia){

        limpiarAlerta(referencia);

        //Generar alerta HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red')
        
        //inyectar error al formulario
        referencia.appendChild(error)
    }
    function limpiarAlerta(referencia){
        // comprueba si ya existe una alerta y evita que genere multiples alertas
        const alerta = referencia.querySelector('.bg-red');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }
  
    inputCredito.addEventListener('keyup', (e) =>{
        let valorCredito = e.target.value;
        inputCredito.value = valorCredito.replace(/\s/g, '')
        // eliminar letras
        .replace(/\D/g, '')
        // agrega espacio a numeros
        .replace(/([0-9]{4})/g, '$1 ').trim();
    });
    //validar numeros tarjeta
    function validarCredito(credito){
        const regexCredito = /^(?:(\d{4}\s?){4}|(\d{4,6}\s?){3})$/;
        const resultadoCredito = regexCredito.test(credito);
        return resultadoCredito;
    }
    inputCCV.addEventListener('keyup', () =>{
        inputCCV.value = inputCCV.value.replace(/\s/g, '')
    // eliminar letras
    .replace(/\D/g, '')
    });
    function validarCCV(ccv){
        const regexCCV = /^[0-9]{3}$/;
        const resultadoCCV = regexCCV.test(ccv);
        return resultadoCCV;
    }
    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        }
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
    }
});
