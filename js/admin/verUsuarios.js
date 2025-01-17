// Usuarios Tabla
function verUsuarios() {
    const usuariosList = document.getElementById('usuariosList');
    usuariosList.innerHTML = ''; // Limpiar contenido anterior

    // Crear el encabezado de la tabla
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    // Crear la fila de encabezados
    const headerRow = document.createElement('tr');
    const headerName = document.createElement('th');
    headerName.textContent = 'Nombre';
    const headerEmail = document.createElement('th');
    headerEmail.textContent = 'Correo electrónico';
    const headerActions = document.createElement('th');
    headerActions.textContent = 'Acciones';

    headerRow.appendChild(headerName);
    headerRow.appendChild(headerEmail);
    headerRow.appendChild(headerActions);
    table.appendChild(headerRow);

    // Consultar los usuarios en Firestore
    db.collection("users").get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            usuariosList.innerHTML = '<p>No hay usuarios registrados.</p>';
            return;
        }

        // Recorrer los documentos y agregar cada usuario a una fila de la tabla
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            
            const row = document.createElement('tr');
            row.id = `row-${doc.id}`;
            
            const nameCell = document.createElement('td');
            nameCell.textContent = userData.display_Name;
            
            const emailCell = document.createElement('td');
            emailCell.textContent = userData.email;
            
            const actionsCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-primary', 'btn-action');
            editButton.textContent = 'Editar';
            editButton.onclick = () => editarFilaUsuario(doc.id);
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-action');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => eliminarUsuario(doc.id);
            actionsCell.appendChild(editButton);
            actionsCell.appendChild(document.createTextNode(' '));
            actionsCell.appendChild(deleteButton);
            
            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(actionsCell);
            table.appendChild(row);
        });

        // Agregar la tabla al contenedor
        usuariosList.appendChild(table);

    }).catch((error) => {
        console.error("Error al obtener los usuarios:", error);
        usuariosList.innerHTML = '<p>Error al cargar los usuarios. Verifica la consola.</p>';
    });
}

function editarFilaUsuario(userId) {
    const row = document.getElementById(`row-${userId}`);
    const cells = row.getElementsByTagName('td');
    for (let i = 0; i < cells.length - 1; i++) {
        cells[i].setAttribute('contenteditable', 'true');
        cells[i].classList.add('editable');
    }
    row.classList.add('editing');
    const editButton = row.querySelector('.btn-primary');
    editButton.innerText = 'Confirmar';
    editButton.setAttribute('onclick', `confirmarEdicionUsuario('${userId}')`);
}

function confirmarEdicionUsuario(userId) {
    if (confirm("¿Deseas guardar los cambios?")) {
        const row = document.getElementById(`row-${userId}`);
        const cells = row.getElementsByTagName('td');
        const updateData = {
            display_Name: cells[0].innerText,
            email: cells[1].innerText
        };
        db.collection("users").doc(userId).update(updateData).then(() => {
            console.log("Usuario actualizado correctamente");
            for (let i = 0; i < cells.length - 1; i++) {
                cells[i].removeAttribute('contenteditable');
                cells[i].classList.remove('editable');
            }
            row.classList.remove('editing');
            const editButton = row.querySelector('.btn-primary');
            editButton.innerText = 'Editar';
            editButton.setAttribute('onclick', `editarFilaUsuario('${userId}')`);
        }).catch((error) => {
            console.error("Error actualizando el usuario: ", error);
        });
    } else {
        verUsuarios();
    }
}

let valorOriginalUsuario;

function guardarValorOriginalUsuario(element) {
    valorOriginalUsuario = element.innerText;
}

function confirmarCambioUsuario(userId, campo, element) {
    const nuevoValor = element.innerText;
    if (nuevoValor !== valorOriginalUsuario) {
        if (confirm("¿Deseas guardar los cambios?")) {
            actualizarCampoUsuario(userId, campo, nuevoValor);
        } else {
            element.innerText = valorOriginalUsuario;
        }
    }
}

function actualizarCampoUsuario(userId, campo, valor) {
    let updateData = {};
    updateData[campo] = valor;
    db.collection("users").doc(userId).update(updateData).then(() => {
        console.log("Campo actualizado correctamente");
    }).catch((error) => {
        console.error("Error actualizando el campo: ", error);
    });
}

function eliminarUsuario(userId) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        db.collection("users").doc(userId).delete().then(() => {
            alert("Usuario eliminado correctamente");
            verUsuarios();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}

function mostrarFormularioUsuario() {
    document.getElementById('usuarioForm');
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
