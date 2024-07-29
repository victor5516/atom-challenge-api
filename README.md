# ATOM task manager challenge

## Descripción
Este proyecto es un desafío técnico para la empresa ATOM. Consiste en un administrador de tareas que permite crear, editar y eliminar tareas. Además, se pueden marcar como completadas.


## Instalación
1. Clonar el repositorio
2. Instalar las dependencias con `npm install`

## Swagger API
La documentación de la API se encuentra en el archivo `swagger.yml`. Para visualizarla, se puede copiar el contenido del archivo y pegarlo en la página [Swagger Editor](https://editor.swagger.io/).

## Descrición del desafío
El desafío consiste en desarrollar un administrador de tareas con las siguientes tecnologías:
- TypeScript
- Express
- Firebase Functions
- Firebase Firestore
La estructura de la aplicación es la siguiente:
- `src/controllers`: Controladores de la aplicación que se encargan de la lógica de las rutas.
- `src/services`: Servicios de la aplicación que se encargan de la lógica de negocio e interacción con la base de datos.
- `src/middlewares`: Middlewares de la aplicación que se encargan de la validación de los datos de entrada.
- `src/handlers`: Handlers de la aplicación que se encargan de manejar las respuestas de la aplicación.
- `src/models`: Modelos de la aplicación que representan los datos de la aplicación.
- `src/routes`: Rutas de la aplicación que definen las rutas de la API.
- `src/config`: Archivos de configuración de la aplicación, como la configuración de Firebase.

Dentro de la carpeta `src` se encuentra el archivo `index.ts`, que es el punto de entrada de la aplicación.

Para las pruebas unitarias se utilizó el framework de pruebas Mocha y la librería de aserciones Chai. Las pruebas se encuentran en la carpeta `test`.

Este proyecto esta debidamente documentado para su fácil comprensión y mantenimiento, además de que se han implementado buenas prácticas de desarrollo.

Puntos de mejora:
- Implementar pruebas unitarias para los servicios.
- Implementar un sistema de autenticación para los usuarios.
- Implementar una relación entre usuarios y tareas, para que cada usuario tenga sus propias tareas.



