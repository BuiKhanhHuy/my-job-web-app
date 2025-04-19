# Frontend development environment
FROM node:18.18

WORKDIR /myjob_web_app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose port for dev server
EXPOSE 3000

# Default command when container starts
CMD ["npm", "run", "start"]