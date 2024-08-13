import { useState } from 'react';
import { Link } from 'react-router-dom';
import  {uploadFileToS3}  from '../helpers/uploadFileS3.JS';
import { sendEmail } from '../helpers/Pinpoint';


const EmailForm = () => {
  const [formData, setFormData] = useState({to: '',from: '',subject: '',body: '',attachment: null,});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { to, from, subject, body, attachment } = formData;
    let attachmentUrl = null;
    let finalBody = body;
    if (attachment) {
        try {
            attachmentUrl = await uploadFileToS3(attachment);
          } catch (error) {
            setMessage(`Error uploading attachment: ${error.message}`);
            return;
          }
            finalBody += `<br><a href="${attachmentUrl}">Descargar Archivo</a>`;
    }
    try {
      const response = await sendEmail(to, from, subject, finalBody);
        if (response.MessageResponse.Result[to].StatusCode === 200) {
          setMessage('Email sent successfully');
        } else {
          setMessage(`Error sending email: ${response.MessageResponse.Result[to].StatusMessage}`);
        }
      } catch (error) {
        setMessage(`Error sending email: ${error.message}`);
      }
  };

  return (
    <div className="container mt-5">
      <h2>Email Form</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Destinatario:</label>
          <input type="email" className="form-control" name="to" value={formData.to} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Emisor:</label>
          <input type="email" className="form-control" name="from" value={formData.from} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Asunto:</label>
          <input type="text" className="form-control" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mensaje:</label>
          <textarea className="form-control" name="body" value={formData.body} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Adjuntar Documento:</label>
          <input type="file" className="form-control" name="attachment" onChange={handleChange} accept=".pdf" />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
      <Link to="/" className="btn btn-primary mt-3">Regresar a Home</Link>
    </div>
  );
};

export default EmailForm;