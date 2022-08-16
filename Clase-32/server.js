const autocannon = require('autocannon');
const { PassThrough } = require('stream');

const ejecutar = (url) => {
    const buf = [];
    const outputStream = new PassThrough();

    const inst = autocannon({
        url,
        connections: 500,
        duration: 20
    });
    autocannon.track(inst,{ outputStream });

    outputStream.on('data',(data) => {
        buf.push(data);
    });

    inst.on('done',() => {
        process.stdout.write(Buffer.concat(buf));
    })
}

ejecutar("http://localhost:3000/no-bloqueante");
ejecutar("http://localhost:3000/bloqueante");