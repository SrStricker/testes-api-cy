/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contracts';
const faker = require('faker-br');

describe('Testes da Funcionalidade Usuários', () => {

     let token
     before(() => {
          cy.token('luciano@ebac.com', 'teste123').then(tkn => { token = tkn })
     });

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {

               return contrato.validateAsync(response.body)
          })

     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios',
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(69)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let usuario = faker.name.firstName() + ' ' + faker.name.lastName()
          let email = faker.internet.email(usuario)
          let senha = faker.internet.password()
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": usuario,
                    "email": email,
                    "password": senha,
                    "administrador": "true"
               }
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })

     });

     it('Deve validar um usuário com email inválido', () => {
          cy.validaçãousuario('Ana Silva', 'ana@ebac.com', 'teste123')
               .then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.body.message).to.equal('Este email já está sendo usado')
               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[5]._id
               let usuario = faker.name.firstName() + '' + faker.name.lastName()
               let email = faker.internet.email(usuario)

               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body:
                    {
                         "nome": usuario,
                         "email": email,
                         "password": 'teste123',
                         "administrador": "true"
                    }
               }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal("Registro alterado com sucesso")
               })
          });
     });

     it('Deve deletar um usuário previamente cadastrado', () => {

          let usuario = faker.name.firstName() + '' + faker.name.lastName()
          let email = faker.internet.email(usuario)

          cy.validaçãousuario(usuario, email, 'teste123', 'true')
               .then(response => {
                    let id = response.body._id

                    cy.request({
                         method: 'DELETE',
                         url: `usuarios/${id}`,

                    }).then(response => {
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
                         expect(response.status).to.equal(200)
                    })
               })
     });


});
