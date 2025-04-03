FROM node:23-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port you want to run your app on
EXPOSE 63193

# Run the command for the app in my case npm run dev.
RUN ["npm", "run", "start"]

# Set up a use root is by default
USER ritik
