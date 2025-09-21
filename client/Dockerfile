# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Remove existing node_modules and lockfile to avoid optional dependency issues
RUN rm -rf node_modules package-lock.json

# Install dependencies fresh
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
