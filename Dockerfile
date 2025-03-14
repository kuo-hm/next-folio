# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Next.js app into the container
COPY . .

# Copy the .env file into the container (make sure it's in the root of your project)
COPY .env .env

# Build the Next.js app
RUN npm run build

# Expose the default port for Next.js (3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
