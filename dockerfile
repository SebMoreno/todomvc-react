FROM node:18.17.1-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 5173
EXPOSE 5173

# Run the app
CMD npm run dev