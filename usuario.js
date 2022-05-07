class Usuario {
    constructor(nombre,apellido,libros,mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.log(`${this.nombre} ${this.apellido}`);
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        console.log(this.mascotas.length);
    }

    addBook(libro,autor) {
        this.libros.push(
            {
                nombre: libro,
                autor: autor
            }
        );
    }

    getBookNames() {
        console.log(this.libros.map(libro => libro.nombre));
    }
}

let nuevoUsuario = new Usuario('Juan','Perez',[],[]);

nuevoUsuario.getFullName();

nuevoUsuario.addMascota('Perro');
nuevoUsuario.countMascotas();

nuevoUsuario.addBook('El señor de los anillos','J.R.R. Tolkien');
nuevoUsuario.addBook('El señor de los anillos 2','J.R.R. Tolkien');
nuevoUsuario.getBookNames();