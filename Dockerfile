FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Install node packages
COPY package*.json ./
RUN npm install

# Copy local directories to the current local directory of our docker image (/app)
COPY . .

# Install the "serve" package globally
RUN npm install -g serve

# Build the app (you may need to run the build command, e.g., "npm run build" here)
RUN npm run build

EXPOSE 3000

# Start the app using the "serve" command
CMD ["serve", "-s", "dist"]