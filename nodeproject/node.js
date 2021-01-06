const express = require('express');
const fileUpload = require('express-fileupload'); //import da biblioteca para file upload
const cors = require('cors')
const app = express();

app.use(express.static('public')); // inicializando método do express para visualizar a pasta public dentro do diretório
app.use(cors()); // inicializando library que permite acesso de diferentes origens à API
app.use(fileUpload()); //inicializando a biblioteca para uploadde arquivos

/**
 * Rota e midleware para checagem e envio de arquivos do frontend para a pasta
 * public, que se encontra dentro do diretório da API. 
 * Considerando que esta não seria a melhor arquitetura para escalar a aplicação.
 * Para este caso o arquivo físico seria armazenado em um cloud storage e a path em um .db
 */
app.post('/upload', (req, res) => {
    // condicional que verifica se existem arquivos anexados antes de serem armazenados propriamente
    if (!req.files) res.status(500).send({ msg: "file is not found" })
    // variavel em que se armazana a iteração dentro do objeto de cada arquivo
    const myFile = req.files.image;
    // função que nomeia e move os respectivos arquivos anexados, para pasta public
    myFile.mv(`${__dirname}/public/${myFile.name}`, (err) => {
        if (err) {
            return res.status(500).send({ msg: "Error occured" });
        }
        return res.send({ name: myFile.name, path: `/${myFile.name}` });
    });
})

app.listen(8000, () => {
    console.log('server is running at port 8000');
})