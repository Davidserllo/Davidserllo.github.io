// function guardarPeliculas(){
//     db.collection("films").add({
//         first: "Ada",
//         last: "Lovelace",
//         born: 1815
//     })
//     .then((docRef) => {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch((error) => {
//         console.error("Error adding document: ", error);
//     });
// }

function guardarPelicula(event) {
    event.preventDefault();
    const name = document.getElementById('InputFilmName').value;
    const director = document.getElementById('InputFilmDirector').value;
    const duration = document.getElementById('InputFilmDuration').value;
    const genre = document.getElementById('InputFilmGenre').value;
    const synopsis = document.getElementById('InputFilmSynopsis').value;
    const image = document.getElementById('InputFilmImage').value;
    const date = document.getElementById('InputFilmDate').value;

    db.collection("films").add({
        name: name,
        director: director,
        duration: duration,
        genre: genre,
        synopsis: synopsis,
        image: image,
        date: date
    })
        .then(() => {
            alert("Película guardada correctamente");
            verPeliculas();


            // Limpiar los campos del formulario
            document.getElementById('InputFilmName').value = '';
            document.getElementById('InputFilmDirector').value = '';
            document.getElementById('InputFilmDuration').value = '';
            document.getElementById('InputFilmGenre').value = '';
            document.getElementById('InputFilmSynopsis').value = '';
            document.getElementById('InputFilmImage').value = '';
            document.getElementById('InputFilmDate').value = '';
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
}