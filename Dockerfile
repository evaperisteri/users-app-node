#version of node to use
FROM node:22
#Directory to save image
WORKDIR /app
# Install all dpendencies
COPY package*.json ./
RUN npm install
# Bundlde app source
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]