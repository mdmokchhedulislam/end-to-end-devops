# Use Node.js LTS image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of app files
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
