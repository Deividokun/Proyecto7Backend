# Backend API con Autenticación JWT

Este proyecto es una API construida con Node.js, Express, y MongoDB, que incluye funcionalidades básicas de autenticación (registro y login) utilizando JWT (JSON Web Token). Además, permite la gestión de usuarios, incluyendo actualización y eliminación, con control de roles (`user` y `admin`).

 Requisitos: 

Antes de empezar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (versión 16 o superior)
- **MongoDB** (instancia local o en la nube)
- **Postman** o algún cliente similar para hacer peticiones HTTP durante el desarrollo y las pruebas.

Instalación: 

   ```bash
   git clone https://github.com/tu-usuario/proyecto7.git

cd proyecto7

cd proyecto7

JWT_SECRET=your_secret_key
MONGO_URI=mongodb://localhost:27017/tu-base-de-datos
JWT_SECRET: Esta será la clave secreta que utilizarás para firmar los tokens JWT.
MONGO_URI: La URI de tu base de datos MongoDB.
---------
Scripts: 

-Inicia la aplicación en modo de producción.
-npm run dev	Inicia la aplicación en modo de desarrollo utilizando nodemon.
-npm run seed	Ejecuta el script de seed para poblar la base de datos con datos iniciales.

## Funcionalidades: 
Registro de Usuarios: El endpoint de registro permite crear un nuevo usuario con un rol predeterminado de user o, si es especificado, de admin. Se valida que el NickName sea único antes de registrar al usuario.

*Login de Usuarios: Los usuarios pueden autenticarse utilizando su NickName y password. Si las credenciales son correctas, se genera un token JWT con una validez de 1 año.

Actualización y Eliminación de Usuarios: Los usuarios pueden actualizar o eliminar su propia cuenta. Los administradores (admin) tienen permisos para modificar o eliminar cualquier cuenta.

Protección de Rutas: Las rutas sensibles están protegidas mediante autenticación JWT, asegurando que solo usuarios autenticados puedan acceder a ellas.

--Dependencias: 

El proyecto utiliza las siguientes dependencias:

Dependencia	Descripción: 

 -bcrypt:	Para el hashing de contraseñas.
 -cors:	Para manejar políticas de seguridad en el acceso a recursos desde dominios externos.
 -dotenv:	Para la gestión de variables de entorno.
 -express:	Framework para la creación de servidores web.
 -jsonwebtoken:	Para la generación y verificación de tokens JWT.
- mongoose: 	ODM para la interacción con MongoDB.

Para iniciar el entorno de desarrollo, usa:
npm run dev

Este proyecto fue desarrollado por David. Si tienes preguntas o sugerencias, no dudes en contactarme.

bash

src/
├── api/
│   └── controllers/
│       └── users.js         # Controladores para la gestión de usuarios
├── models/
│   └── users.js             # Modelo de usuario para Mongoose
├── utils/
│   └── seed/
│       └── seed.js          # Script para poblar la base de datos
├── config/
│   └── jwt.js               # Funciones para la generación y verificación de tokens JWT
└── index.js                 # Punto de entrada principal de la aplicación

Este proyecto está licenciado bajo la licencia ISC.
