// function guardarUsuario(){
//     db.collection("users").add({
//         email: document.getElementById("InputEmail").value,
//         display_Name: document.getElementById("InputDisplay_Name").value,
//     })
//     .then((docRef) => {
//         alert("Registro realizado correctamente")
//     })
//     .catch((error) => {
//         console.error("Error: ", error);
//     });
// }

function guardarUsuario(event) {
    event.preventDefault();
    const email = document.getElementById('InputEmail').value;
    const displayName = document.getElementById('InputDisplayName').value;

    db.collection("users").add({
        email: email,
        display_Name: displayName
    })
        .then(() => {
            alert("Usuario guardado correctamente");
            verUsuarios();
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
}