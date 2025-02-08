# Proyecto: Gestión de Datos Personales

Este proyecto permite gestionar datos personales mediante un backend en **Node.js (Express)**, una base de datos en **PostgreSQL** y un servicio de consultas en lenguaje natural utilizando **OpenAI**.

## Tecnologías Utilizadas

- **Frontend:** (Pendiente)
- **Backend:** Node.js con Express
- **Base de Datos:** PostgreSQL
- **Servicio de IA:** OpenAI (usando LangChain y RAG en el futuro)
- **Contenedores:** Docker y Docker Compose

## Estructura del Proyecto

```
proyecto_ds2/
├── app/       # Backend principal (Express, CRUD, API REST)
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   ├── .env
├── query/     # Servicio de consultas en lenguaje natural (OpenAI)
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   ├── .env
├── docker-compose.yml  # Orquestación de contenedores
├── .gitignore
├── README.md  # Este archivo con instrucciones
```

## Requisitos Previos

Antes de empezar, asegúrese de tener instalado:

- Docker y Docker Compose
- Git
- Node.js (si desea hacer pruebas sin Docker)

## Configuración Inicial

### Clonar el repositorio

```sh
git clone https://github.com/JeanC221/proyecto_ds2.git
cd proyecto_ds2
```

### Configurar variables de entorno

Cree un archivo `.env` dentro de **app/** y **query/** con la siguiente estructura:

#### `app/.env`

```env
DATABASE_USER=user
DATABASE_PASSWORD=password
DATABASE_NAME=mydatabase
DATABASE_HOST=db
DATABASE_PORT=5432
```

#### `query/.env`

```env
OPENAI_API_KEY=tu_api_key
```

Reemplace `tu_api_key` con su clave real de OpenAI.

### Levantar los contenedores con Docker

Ejecute el siguiente comando en la raíz del proyecto:

```sh
docker-compose up --build
```

Esto iniciará los tres contenedores:

- `app_main` (Backend en Express)
- `query_service` (Servicio de OpenAI)
- `postgres_db` (Base de datos PostgreSQL)

### Verificar que todo funciona correctamente

Para comprobar que los servicios están corriendo:

- **Backend:** Abrir en el navegador o Postman:\
  `http://localhost:3000/`  (Debe responder "Backend funcionando!")
- **Base de Datos:** Probar conexión en `http://localhost:3000/test-db`.
- **Servicio de consultas:** Abrir en el navegador o Postman:\
  `http://localhost:3001/`  (Debe responder "Servicio de consultas funcionando!")

Para probar una consulta en lenguaje natural:

```sh
curl -X POST http://localhost:3001/consulta \
     -H "Content-Type: application/json" \
     -d '{"pregunta": "¿Cuál es el empleado más joven?"}'
```

## Detener los contenedores

Para detener los contenedores, ejecute:

```sh
docker-compose down
```

## Actualizar y volver a correr

Si hay cambios en el código:

```sh
git pull
```

Luego, reconstruya los contenedores:

```sh
docker-compose up --build
```
