FROM node:16-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Set environment to development
ENV NODE_ENV=development

# Start the application in development mode
CMD ["npm", "start"]