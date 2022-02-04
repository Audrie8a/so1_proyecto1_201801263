# Se define con base a la imagen elegisda
FROM node:lts-alpine


#Directorio que contiene el codigo de la aplicación dentro de la img
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

#Comando para ejecutar el servidor de nuestra app
CMD [ "node", "index.js" ]