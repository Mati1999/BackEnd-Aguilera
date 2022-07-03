import util from 'util'
import norm from 'normalizr'
import post from './blog.js'

const esquemaComentarios = new norm.schema.Entity('comentarios');
const esquemaAutor = new norm.schema.Entity('autor');
const esquemaCategoria = new norm.schema.Entity('categoria');

const esquemaPost = new norm.schema.Entity('posts',{
    autor: esquemaAutor,
    categoria: esquemaCategoria,
    comentarios: [esquemaComentarios]
})

const normalizado = norm.normalize(post,[esquemaPost])

const print = (objeto) => {
    console.log(util.inspect(objeto,false,12,true));
}

print(normalizado)