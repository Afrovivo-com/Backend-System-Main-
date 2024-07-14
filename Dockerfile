# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .


# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build


# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the application
CMD [ "node", "start" ]