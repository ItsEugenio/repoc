import React, { useEffect, useState } from "react";
import Headeer from "./headeer";
import "../src/index.css";
import io from "socket.io-client";
import swal from "sweetalert";

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = async () => {
    try {
      const loginFormData = {
        name,
        description,
      };
      const url = "http://54.208.59.207/service/";
      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });
      // Manejar la respuesta aquí si es necesario
    } catch (error) {
      console.error("Error al enviar el pago:", error);
    }
  };

  const socket = io("http://3.211.190.163:5000/");

  useEffect(() => {
    socket.on("receiveOrder", (data) => {
      console.log(data, "holaaaa");
      setOrder(data.noti);
      // Mostrar la alerta con SweetAlert
      swal({
        title: "Nueva orden recibida",
        text: data.noti,
        icon: "success",
        button: "Aceptar",
      });
    });
  }, []);

  return (
    <>
      <Headeer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: "20px",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            color: "black",
          }}
        >
          <h2>Nombre Del Producto</h2>
          <input
            style={{
              width: "100%",
              margin: "20px",
              height: "30px",
              borderRadius: "10px",
            }}
            name="name"
            value={name}
            onChange={handleInputChange}
          ></input>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            color: "black",
          }}
        >
          <h2>Descripción Del Producto</h2>
          <input
            style={{
              width: "100%",
              margin: "20px",
              height: "30px",
              borderRadius: "10px",
            }}
            name="description"
            value={description}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <button onClick={handleSubmit}>Enviar Orden</button>
      </div>

      
    </>
  );
}

export default App;
