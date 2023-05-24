# App

Node API Solid PostgreSQL (D'Coffee Shop API Client).

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível editar um cliente
- [x] Deve ser possível buscar cliente pelo ID
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um cliente logado;
- [ ] Deve ser possível cadastrar um endereço;
- [ ] Deve ser possível alterar um endereço cadastrado;
- [x] Deve ser possível cadastrar a compra de um cliente;

## RNs (Regras de negócio)

- [x] O cliente não deve poder se cadastrar com um e-mail duplicado;
- [x] O cliente não deve poder se cadastrar com um telefone duplicado;

## RNFs (Requisitos não-funcionais)

- [x] A senha do cliente precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O cliente deve ser identificado por um JWT (JSON Web Token);
