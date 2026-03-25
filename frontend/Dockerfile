# Step 1: Node base image
FROM node:20.19

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package*.json ./
RUN npm install --platform=linux --arch=x64

# Step 4: Copy all frontend files
COPY . .

# Step 5: Expose Vite port
EXPOSE 5173

# Step 6: Run Vite dev server on 0.0.0.0 so Docker can access it
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]