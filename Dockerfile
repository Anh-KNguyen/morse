# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /my-app

# add `/my-app/node_modules/.bin` to $PATH
ENV PATH /my-app/node_modules/.bin:$PATH

# install my-app dependencies
COPY ./my-app/package.json ./
COPY ./my-app/package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add my-app
COPY ./my-app /my-app

# start app
CMD ["npm", "start"]

