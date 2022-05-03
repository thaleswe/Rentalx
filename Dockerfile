# Essa é a imagem (prefiro chamar modelo). É tipo como se fosse uma interface para os containers 
FROM node 

# Onde será trabalhado os containers
WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]