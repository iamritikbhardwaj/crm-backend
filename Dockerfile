# Use Node 23 as base image
FROM node:23-alpine

# Install netcat for the wait-for script
# RUN apk add --no-cache bash

# Set the working directory
WORKDIR /usr/src/app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy wait script
# COPY wait-for-it.sh ./wait-for-it.sh
# RUN chmod +x ./wait-for-it.sh

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 63193

# Command to run the app when the container starts
#CMD ./wait-for-it.sh db2:3306 -- npm run start

# Command to run the app when the container starts
CMD ["npm", "run", "start"]