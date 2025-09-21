# Stage 1: Build the React app
FROM node:18-bullseye AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Remove existing node_modules and lockfile (clean install)
RUN rm -rf node_modules package-lock.json \
    && npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Rebuild Rollup native dependencies (avoid optional dep issue)
RUN npm rebuild @rollup/rollup-linux-x64-gnu || true

# Build the app
RUN npm run build

# Stage 2: Serve the build with Nginx
FROM nginx:alpine

# Copy build output to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
