# Step 1: Use an official Node.js image as the base
FROM node:20

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install --force

# Step 5: Copy the rest of the app's source code to the container
COPY . .

# Step 6: Build the Vite app for production
RUN npm run build

# Step 7: Use a lightweight HTTP server to serve the built app
RUN npm install -g serve

# Step 8: Expose the port Vite uses in production
EXPOSE 3001

# Step 9: Serve the app
CMD ["serve", "-s", "dist"]
