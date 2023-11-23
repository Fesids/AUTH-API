import { MysqlDB, MysqlPool } from '../DATABASE/MySQLDBConnect.js'
import { server } from '../SERVER/index.js'
import request from 'supertest'
import { loginInput, userInput, wrongPassLogin } from './user.fixture.js'

const app = server

let authToken = ''

// USER REGISTRATION TEST
describe('User registration', () => {
  it('given a valid "email", "nome", "senha" and "telefones", should return a 201 status and a body', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(userInput)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual({
      id: expect.any(Number),
      data_criacao: expect.any(String),
      data_atualizacao: expect.any(String),
      ultimo_login: expect.any(String),
      token: expect.any(String)
    }
    )
  })
})

// USER LOGIN TEST
describe('User Login', () => {
  it('given a valid "email" and "senha", should return a 200 status and a body', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send(loginInput)
    expect(res.statusCode).toEqual(200)

    authToken = res.body.token

    expect(res.body).toEqual({
      id: expect.any(Number),
      data_criacao: expect.any(String),
      data_atualizacao: expect.any(String),
      ultimo_login: expect.any(String),
      token: expect.any(String)
    }
    )
  })
})

// USER GET TEST
describe('Get User', () => {
  it('given a valid token it should return a status 200 and a body with user information', async () => {
    const res = await request(app)
      .get('/api/v1/auth')
      .set({ Authorization: `Bearer ${authToken}` })
      .send(loginInput)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      id: expect.any(Number),
      nome: expect.any(String),
      data_criacao: expect.any(String),
      data_atualizacao: expect.any(String),
      ultimo_login: expect.any(String)
    }
    )
  })
})

// WRONG PASS TEST
describe('Wrong password', () => {
  it('given a wrong password it should return a status 400 and a body with a message', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send(wrongPassLogin)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({
      mensagem: 'Usuário e/ou senha inválidos'
    }
    )
  })
})

// EMAIL ALREADY EXISTS
describe('Email already in use', () => {
  it('given a in use e-mail it should return status 400 and a message error', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(userInput)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual({
      mensagem: 'E-mail já existente'
    }
    )
  })
})

afterAll(async () => {
  MysqlDB.end()
})
