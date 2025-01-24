# **MobileJoystickControllerDef**

 es una aplicación para el control remoto de un videojuego realizado en Unity, con C#.
Mediante la lectura de un **QR**, abrimos la interfaz para el manejo del videojuego en el móvil.

Lee detenidamente el contenido de la carpeta docs, en el que podrás encontrar variada información sobre este proyecto. Este proyecto es el resultado del uso en Replit, de Agent y Assistant.

- En user\_manual.md, podrás encontrar información de utilidad para el manejo de las interfaces.

- En technical\_spec.md, podrás encontrar información técnica en la que se apoya.

- En websocket.md, podrás encontrar información de como se utiliza WebSocket, como protocolo de comunicación.

- En code\_mapping.md, podrás encontrar información de como se mapea el codigo, de los diferentes archivos, segun el siguiente esquema:

\[Dispositivo Móvil\] --> (WebSocket) --> \[Servidor Flask\] --> (WebSocket) --> \[Unity WebGL\] ^ | | Feedback | +--------------------------------------------------------------------------- +

Por último he de añadir, que este juego ha sido posible gracias a tres packages, que podréis encontrar en los siguientes enlaces y que me han simplificado el desarrollo. 

https://assetstore.unity.com/packages/3d/props/electronics/vintage-style-radio-158856 

https://assetstore.unity.com/packages/3d/characters/toony-tiny-people-demo-113188 

https://assetstore.unity.com/packages/3d/vehicles/low-poly-streets-and-cars-pack-292375

Así como los sonidos de nuestro querido Chiquito.

https://tuna.voicemod.net/user/carloskelok/soundboards/cfd4bffc-d971-43d2-b915-f3c0c8c76c0d

Espero que os sea de utilidad. Saludos.
