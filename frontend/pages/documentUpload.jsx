import { useState } from "react";
import axios from 'axios';

const DocumentUpload = () => {

    const [data, setData] = useState({
        file: '',
        msg: ''
    });

    const fileHandler = (e) => {
        console.log(e.target.files[0]);
        setData({
            ...data,
            file: e.target.files[0]
        });
    }

    const changeHandler = (e) => {
        const { value } = e.target;
        setData({
            ...data,
            msg: value
        })
    }

    const submit = () => {
        const sendData = new FormData();
        sendData.append('file', data.file);
        sendData.append('msg', data.msg);
        axios.post('http://localhost:5000/document', sendData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }

    return (
        <div className="container">
            <h1>Pdf Upload</h1>
            <div className="mb-3">
                <label
                    htmlFor="msg"
                    className="form-label">
                    Message
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="msg"
                    value={data.msg}
                    placeholder="Message"
                    onChange={changeHandler} />
            </div>
            <div className="mb-3">
                <label
                    htmlFor="pdfFile"
                    className="form-label">
                    Pdf File</label>
                <input
                    className="form-control"
                    type="file"
                    id="pdfFile"
                    onChange={fileHandler} />
            </div>
            <div className="mt-3">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={submit}>
                    Submit</button>
            </div>
        </div>
    );
}

export default DocumentUpload;