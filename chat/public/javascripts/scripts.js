const express = require("express");
const { json } = require("express");
const app = express();
app.use(express.json());


const Joi = require("joi");

const mensajes=[];

app.get("/chat/api/messages", (req, res) => {
    res.send(mensajes);
});

app.listen(3000, () =>{
    console.log("Listening port 3000");
});

app.get("/api/messages/:ts", (req, res) => {
    const mensaje = mensajes.find((c) => c.id === parseInt(req.params.ts));
    if(!client){
        return  res.status(404).send("El mensaje con el ts dado no fue encontrado.")
    }
    res.send(client);
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