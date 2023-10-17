# Shoppinglist Frontend

This is the frontend application for the shoppinglist project. It is developed with JavaScript, React and Vite. We also have support for Docker and Docker Compose.

# How to run with Docker

The easiest way is to use Docker Compose. It uses the `docker-compose.yml` file found in the repository root.

```bash
cd shoppinglist-frontend
```
```bash
docker compose up -d
```

The application will be available in port `5173`.

The container has Nginx web server running on Alpine Linux. It is much more minimal than running a Node runtime inside the container.

Stop the application
```bash
docker compose down
```

Alternatively, there is a Dockerfile to run the application with Node runtime.

Build the image
```bash
cd shoppinglist-frontend
```
```bash
docker build -t shoppinglist .
```

Create a container and run it
```bash
docker run --rm -p 5173:3000 shoppinglist
```
