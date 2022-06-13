class Persona {
    
private nombre :String;
private apellido :String;

    constructor(nombre:String, apellido:String){
        this.nombre = nombre;
        this.apellido = apellido;
    }

    obtenerNombreCompleto(){
        return `${this.nombre} ${this.apellido}`;
    }
}

export {Persona}