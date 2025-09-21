# Stage 1: Build the React app
FROM node:20 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files and build
COPY . . 
RUN npm run build

# Stage 2: Serve the build with Nginx
FROM nginx:alpine

# Copy build output to Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
