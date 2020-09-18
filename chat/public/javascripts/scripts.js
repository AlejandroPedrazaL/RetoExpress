const ws = new WebSocket("ws://localhost:3000");
const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${item}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const message = document.getElementById("message");
  const author = document.getElementById("message");
  ws.send(message.value);
  message.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

app.get("/api/messages", (req, res) => {
    res.send(mensajes);
});

app.get("/api/messages/:ts", (req, res) => {
    const mensaje = mensajes.find((c) => c.id === parseInt(req.params.ts));
    if(!client){
        return  res.status(404).send("El mensaje con el ts dado no fue encontrado.")
    }
    res.send(client);
});

app.post("/api/messages", (req, res) => {
    const schema = Joi.object({
        message: Joi.string().min(5).required(),
        author: Joi.string().required()
    });

    const {error} = schema.validate(res.body);
    if(error){
        return res.status(400).send(error);
    }
    const mensaje = {
        "message": req.body.message,        
        "author": req.body.author,
        "ts": clientes.length +1 
    }

    clientes.push(cliente);
    res.send(cliente);
});

app.put("/api/messages/:ts", (req, res) => {
    const mensaje = mensajes.find((c) => c.id === parseInt(req.params.ts));
    if(!client){
        return  res.status(404).send("El mensaje con el ts dado no fue encontrado.")
    }

    const schema = Joi.object({
        message: Joi.string().min(5).required(),
        author: Joi.string().required()
    });

    schema.validate(res.body);

    mensaje.author =  req.body.author;
    mensaje.message = req.body.message;
    
    res.send(mensaje);
});

app.delete("/api/messages/:ts", (req, res) => {
    const mensaje = mensajes.find((c) => c.id === parseInt(req.params.ts));
    if(!client){
        return  res.status(404).send("El mensaje con el ts dado no fue encontrado.")
    }

    const index = mensajes.indexOf(mensaje);
    mensajes.splice(index,i);
    
    res.send(mensaje);
});