FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

# Use start script for production (not dev/nodemon)
CMD ["npm", "start"]