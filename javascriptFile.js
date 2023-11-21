window.addEventListener("load", function () {
  let $loginEmail = document.querySelector("#usuario");
  let $loginPassword = document.querySelector("#message");
  let $button = document.querySelector("#enviar");
  let $closeModal = document.querySelector("#close");
  let $dinamicText = document.querySelector("#workWithUs");
  let $buttonSideBar = document.querySelector("#openSideBar");
  let $buttonCloseSideBar = document.querySelector("#closeSideBar");
  let comentariosContainer = document.getElementById("comentarios-container");
  let nuevoComentarioInput = document.getElementById("nuevo-comentario");
  let agregarComentarioBtn = document.getElementById("agregar-comentario");

  // Validaciones de los formularios
  let errors = []; // Array donde guardo los errores del login

  // Función para validar campos vacíos
  function validarVacio(event) {
    let name = event.target.name; //Selecciono el nombre del input que esta siendo seleccionado

    if (this.value == "") {
      errors[name] = "No puedes dejar este campo vacío";

      let $divError = document.querySelector(".error-" + name); // Selecciono el div con la clase error-nombreDelInput y le agrego la clase error
      $divError.classList.add("error");

      return ($divError.innerHTML = errors[name]); //Relleno el div con clase error con el mensaje guardado en el array
    } else {
      errors[name] = ""; //En caso de que el campo no este vacio, modifico el contenido del array de errores ('') y lo muestro
      let $divError = document.querySelector(".error-" + name);

      return ($divError.innerHTML = errors[name]);
    }
  }

  // Función para validar longitud mínima
  function islengthOK(min) {
    return function (event) {
      let name = event.target.name;
      let valueLength = this.value.length; //Selecciono el input y mido el length del valor ingresado

      if (valueLength > 0 && valueLength < min) {
        errors[name] = "El valor ingresado debe ser más largo"; //En caso de que el valor este entre cero y menos que el minimo,retorno error

        let $divError = document.querySelector(".error-" + name);
        $divError.classList.add("error");

        return ($divError.innerHTML = errors[name]);
      } else if (valueLength >= min) {
        errors[name] = "";
        let $divError = document.querySelector(".error-" + name);

        return ($divError.innerHTML = errors[name]);
      }
    };
  }

  // Función para enviar formulario
  function send() {
    document.getElementById("myModal").style.display = "block"; //Le aplico el display block al modal para renderizarlo al enviar el form
  }

  // Función para cerrar modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none"; //Le aplico el display none al modal para ocultarlo
    console.log("click");
  }

  // Función para lograr un efecto de maquina de escribir
  function typewriterEffect() {
    const originalContent = $dinamicText.textContent;
    $dinamicText.textContent = ""; //Tomo el contenido del texto del html y lo cambio por un string vacio

    for (let i = 0; i < originalContent.length; i++) {
      setTimeout(function () {
        $dinamicText.textContent += originalContent[i];
      }, i * 50); //Con un ciclo for, recorro el texto ahora vacio y le voy agregando letra por letra para generar el efecto de maquina de escribir
    }
  }

  // Llamo a la función de efecto de máquina de escribir cada cierto intervalo (para que el efecto se repita)
  setInterval(typewriterEffect, 5000);

  //Funciones para el manejo del sideBar

  function openNav() {
    document.getElementById("mySidepanel").style.width = "250px"; //Se muestra al aplicarle un width
  }

  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0"; //Se oculta al quitarle el width
  }

  //Funciones para generar y guardar comentarios
  // Array para almacenar los comentarios
  let comentarios = [];

  // Función para renderizar los comentarios
  function renderizarComentarios() {
    comentariosContainer.innerHTML = "";

    comentarios.forEach((comentario, index) => {
      const comentarioDiv = document.createElement("div");
      comentarioDiv.classList.add("comentario");
      comentarioDiv.innerHTML = `
          <p>${comentario}</p>
          <img src="/img/yellow-fivestars.webp"class="stars">
          <div class="acciones">
              <span class="btn-eliminar" data-index="${index}">Eliminar</span>
              <span class="btn-editar" data-index="${index}">Editar</span>
          </div>
        `;

      const btnEliminar = comentarioDiv.querySelector(".btn-eliminar");
      btnEliminar.addEventListener("click", function () {
        eliminarComentario(index);
      });

      const btnEditar = comentarioDiv.querySelector(".btn-editar");
      btnEditar.addEventListener("click", function () {
        editarComentario(index);
      });

      comentariosContainer.appendChild(comentarioDiv);
    });
  }

  // Función para inicializar comentarios hardcodeados (porque quedaba mas lindo)
  function inicializarComentariosHardcodeados() {
    comentarios.push(
      "Los chicos de GamigBa hacen simple lo dificil.Excelente Trabajo!"
    );
    comentarios.push("Muy Recomendable");
    comentarios.push("Nuestra experiencia fue muy positiva");

    renderizarComentarios();
  }

  // Función para agregar un nuevo comentario
  function agregarComentario() {
    const nuevoComentario = nuevoComentarioInput.value.trim();
    if (nuevoComentario !== "") {
      comentarios.push(nuevoComentario);
      renderizarComentarios();
      nuevoComentarioInput.value = "";
    }
  }

  // Función para eliminar un comentario
  function eliminarComentario(index) {
    comentarios.splice(index, 1);
    renderizarComentarios();
  }

  // Función para editar un comentario
  function editarComentario(index) {
    const editedCommentInput = document.getElementById("edited-comment");
    const saveEditBtn = document.getElementById("save-edit");
    const cancelEditBtn = document.getElementById("cancel-edit");

    editedCommentInput.value = comentarios[index];
    document.getElementById("edit-form").style.display = "flex";

    // Agrega evento al botón "Guardar"
    saveEditBtn.addEventListener("click", function () {
      comentarios[index] = editedCommentInput.value;
      renderizarComentarios();
      // Oculta el formulario después de guardar
      document.getElementById("edit-form").style.display = "none";
    });

    // Agrega evento al botón "Cancelar"
    cancelEditBtn.addEventListener("click", function () {
      // Oculta el formulario sin guardar cambios
      document.getElementById("edit-form").style.display = "none";
    });
  }

  // Agrega evento de clic al botón de agregar comentario
  agregarComentarioBtn.addEventListener("click", agregarComentario);

  // Inicializa comentarios hardcodeados al cargar la página
  inicializarComentariosHardcodeados();

  $loginEmail.addEventListener("blur", validarVacio);
  $loginEmail.addEventListener("blur", islengthOK(5));

  $loginPassword.addEventListener("blur", validarVacio);
  $loginPassword.addEventListener("blur", islengthOK(5));

  $button.addEventListener("click", send);
  $closeModal.addEventListener("click", closeModal);
  $buttonSideBar.addEventListener("click", openNav);
  $buttonCloseSideBar.addEventListener("click", closeNav);
});
