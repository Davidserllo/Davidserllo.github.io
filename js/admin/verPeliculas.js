// Version Tabla
function verPeliculas() {
    const peliculasList = document.getElementById('peliculasList');
    peliculasList.innerHTML = ''; // Limpiar contenido anterior
    db.collection("films").get().then((querySnapshot) => {
        // Crear la tabla
        let tableHTML = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Director</th>
                        <th>Duración</th>
                        <th>Género</th>
                        <th>Sinopsis</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Iterar a través de las películas y agregar cada una como fila de la tabla
        querySnapshot.forEach((doc) => {
            const filmData = doc.data();
            tableHTML += `
                <tr id="row-${doc.id}">
                    <td>${filmData.name}</td>
                    <td>${filmData.director}</td>
                    <td>${filmData.duration}</td>
                    <td>${filmData.genre}</td>
                    <td>${filmData.synopsis}</td>
                    <td><img src="${filmData.image}" alt="${filmData.name}" width="100"></td>
                    <td>
                        <button class="btn btn-primary btn-action" onclick="editarFila('${doc.id}')">Editar</button>
                        <button class="btn btn-danger btn-action" onclick="eliminarPelicula('${doc.id}')">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        // Cerrar las etiquetas de la tabla
        tableHTML += `
                </tbody>
            </table>
        `;

        // Insertar el HTML generado en el contenedor
        peliculasList.innerHTML = tableHTML;
    });
}

function editarFila(filmId) {
    const row = document.getElementById(`row-${filmId}`);
    const cells = row.getElementsByTagName('td');
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].setAttribute('contenteditable', 'true');
        cells[i].classList.add('editable');
    }
    row.classList.add('editing');
    const editButton = row.querySelector('.btn-primary');
    editButton.innerText = 'Confirmar';
    editButton.setAttribute('onclick', `confirmarEdicion('${filmId}')`);
}

function confirmarEdicion(filmId) {
    if (confirm("¿Deseas guardar los cambios?")) {
        const row = document.getElementById(`row-${filmId}`);
        const cells = row.getElementsByTagName('td');
        const updateData = {
            name: cells[0].innerText,
            director: cells[1].innerText,
            duration: cells[2].innerText,
            genre: cells[3].innerText,
            synopsis: cells[4].innerText,
            image: cells[5].querySelector('img').src
        };
        db.collection("films").doc(filmId).update(updateData).then(() => {
            console.log("Película actualizada correctamente");
            for (let i = 0; i < cells.length - 1; i++) {
                cells[i].removeAttribute('contenteditable');
                cells[i].classList.remove('editable');
            }
            row.classList.remove('editing');
            const editButton = row.querySelector('.btn-primary');
            editButton.innerText = 'Editar';
            editButton.setAttribute('onclick', `editarFila('${filmId}')`);
        }).catch((error) => {
            console.error("Error actualizando la película: ", error);
        });
    } else {
        verPeliculas();
    }
}

let valorOriginal;

function guardarValorOriginal(element) {
    valorOriginal = element.innerText;
}

function confirmarCambio(filmId, campo, element) {
    const nuevoValor = element.innerText;
    if (nuevoValor !== valorOriginal) {
        if (confirm("¿Deseas guardar los cambios?")) {
            actualizarCampo(filmId, campo, nuevoValor);
        } else {
            element.innerText = valorOriginal;
        }
    }
}

function actualizarCampo(filmId, campo, valor) {
    let updateData = {};
    updateData[campo] = valor;
    db.collection("films").doc(filmId).update(updateData).then(() => {
        console.log("Campo actualizado correctamente");
    }).catch((error) => {
        console.error("Error actualizando el campo: ", error);
    });
}

function eliminarPelicula(filmId) {
    if (confirm("¿Estás seguro de que deseas eliminar esta película?")) {
        db.collection("films").doc(filmId).delete().then(() => {
            alert("Película eliminada correctamente");
            verPeliculas();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}

function mostrarFormularioPelicula() {
    document.getElementById('peliculaForm');
}

// Añadir estilos CSS para los botones
const style = document.createElement('style');
style.innerHTML = `
    .btn-action {
        width: 100px;
        margin: 2px;
    }
`;
document.head.appendChild(style);
