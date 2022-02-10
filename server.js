const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const PDFParser = require('pdf2json');
const PDFDocument = require('pdf-lib');
const pdf = require('pdf-parse');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pdfParser = new PDFParser();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const fileName = file.originalname.slice(0, -4);
        fs.mkdirSync('pdf_files/' + fileName);
        cb(null, 'pdf_files/' + fileName);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '_' + uniqueSuffix + '.pdf');
    }
});

const uploadLocation = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send({ api: 'online' });
});

app.get('/document', (req, res) => {
    res.send({ documents: [] });
});


app.post('/document', uploadLocation.single('file'), (req, res) => {
    console.log(req.body);
    console.log(req.file);


    fs.readFile('./pdf_files/' + req.file.originalname.slice(0, -4) + '/' + req.file.filename, (err, pdfBuffer) => {
        pdf(pdfBuffer)
            .then(data => {
                console.log(data.meta);
                //console.log(data.text);
            });
    });

    // pdfParser.on("data", page => console.log(page ? "One page paged" : "All pages parsed", page));
    // pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    // const pdfPath = './pdf_files/' + req.file.originalname.slice(0, -4) + '/' + req.file.filename;

    // pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    // pdfParser.on("pdfParser_dataReady", pdfData => {
    //     fs.writeFile("./pdf2json/F1040EZ.json", JSON.stringify(pdfData));
    // });

    //pdfParser.loadPDF(pdfPath);

    res.send({ success: true });
});

app.listen(5000, () => {
    console.log("Server is started on 5000");
});

exports.default = app;