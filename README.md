# App

Node API Solid PostgreSQL (D'Coffee Shop API Client).

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível editar um cliente usando TOKEN;
- [x] Deve ser possível buscar cliente pelo TOKEN;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um cliente logado usando TOKEN;
- [x] Deve ser possível cadastrar o endereço de um cliente usando TOKEN
- [ ] Deve ser possível alterar um endereço cadastrado usando TOKEN;
- [x] Deve ser possível cadastrar a compra de um cliente usando TOKEN;
- [x] Deve ser possível obter as compras de um cliente pelo TOKEN;

## RNs (Regras de negócio)

- [x] O cliente não deve poder se cadastrar com um e-mail duplicado;
- [x] O cliente não deve poder se cadastrar com um telefone duplicado;
- [x] Métodos POST não deve poder substituir informações já cadastradas;

## RNFs (Requisitos não-funcionais)

- [x] A senha do cliente precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 10 itens por página;
- [x] O cliente deve ser identificado por um JWT (JSON Web Token);
