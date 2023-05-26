# App

Node API Solid PostgreSQL (D'Coffee Shop API Client).

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
- [x] Métodos POST não devem poder substituir informações já cadastradas;
- [x] Métodos PUT não devem poder criar uma inforção;
- [x] Exceto as rotas de criar e autenticar clientes, todas outras devem ser autenticadas;

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
