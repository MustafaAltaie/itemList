# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the frontend application
RUN npm run build

# Expose the frontend port
EXPOSE 5173

# Start the frontend app using a simple HTTP server
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]