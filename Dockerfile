FROM node

# Set Working Directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Copy Source
COPY index.js /usr/src/app/index.js
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

# Build
RUN npm install

# Setup Server
EXPOSE 8080

# start app
CMD ["npm", "run", "serve"]