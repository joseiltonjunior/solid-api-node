# D'Coffee Shop API Client

Node API Solid PostgreSQL

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível editar um cliente;
- [x] Deve ser possível buscar cliente;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um cliente logado;
- [x] Deve ser possível cadastrar o endereço de um cliente
- [x] Deve ser possível alterar um endereço cadastrado;
- [x] Deve ser possível cadastrar a compra de um cliente;
- [x] Deve ser possível obter as compras de um cliente;

## RNs (Regras de negócio)

- [x] O cliente não deve poder se cadastrar com um e-mail duplicado;
- [x] O cliente não deve poder se cadastrar com um telefone duplicado;
- [x] O cliente não deve poder se cadastrar com o customer_id(Stripe) duplicado;


## RNFs (Requisitos não-funcionais)

- [x] A senha do cliente precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 10 itens por página;
- [x] O cliente deve ser identificado por um JWT (JSON Web Token);
- [ ] Deve haver a documentação da API(Swagger), com todas rotas e com exemplos práticos;
- [x] Métodos POST não devem poder substituir informações já cadastradas;
- [x] Métodos PUT não devem poder criar uma inforção;
- [x] Exceto as rotas de criar e autenticar clientes, todas outras devem ser autenticadas;

<br/>

#### Step 1 (Clone the project)
```sh
$ git clone https://github.com/joseiltonjunior/dcoffee-shop-api-node.git
```
#### Step 2 (Open a project)
```sh
$ cd dcoffee-shop-api-node
```
#### Step 3 (Install yours dependencies)
```sh
$ npm i or yarn 
```
#### Step 4 (Run docker-compose)
```sh
$ docker compose up -d
```

#### Step 5 (Run migrations)
```sh
$ npx prisma migrate dev
```
#### Step 6 (Run server) 
```sh
$ npm run start:dev or yarn start:dev
```
#### Step 6 (Run Prisma Studio) 
```sh
$ npx prisma studio
```

## Credits

<a href="https://www.instagram.com/dvlp.code/" target="_blank">Junior Ferreira</a> at Full-stack Developer JS