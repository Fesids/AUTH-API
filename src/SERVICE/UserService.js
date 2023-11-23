import { UserRepository } from '../REPOSITORY/UserRepository.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import pkg from 'jsonwebtoken'
const { TokenExpiredError, JsonWebTokenError } = pkg

export class UserService {
  constructor (useRepository, phoneRepository) {
    this.repository = useRepository
    this.phoneRepository = phoneRepository
  }

  // ****///
  async handleCreateUser (body) {
    try {
      if (!body) {
        return {
          mensagem: 'Nenhum corpo foi providênciado',
          statusCode: 400
        }
      }

      const userExist = await this.repository.findUserByEmail(body.email)

      if (userExist) {
        return {
          body: { mensagem: 'E-mail já existente' },
          statusCode: 400
        }
      }

      // cript hash pass
      const salt = bcrypt.genSaltSync(10)
      const hashPassword = bcrypt.hashSync(body.senha, salt)

      const newUserBody = {
        nome: body.nome,
        email: body.email,
        senha: hashPassword
      }

      // create user
      const { id, createdAt, updatedAt, last_login } = await this.repository.save(newUserBody)

      // add user phone numbers
      for (const phone of body.telefones) {
        await this.phoneRepository.save(id, phone)
      }

      const authToken = jwt.sign({ id }, 'jwtkey', { expiresIn: 1800 })

      const userReturnBody = {
        id,
        data_criacao: createdAt,
        data_atualizacao: updatedAt,
        ultimo_login: last_login,
        token: authToken
      }

      return {
        body: userReturnBody,
        statusCode: 201
      }
    } catch (err) {
      return {
        body: { mensagem: 'Algo de errado ocorreu ao tentar cadastrar um novo funcionário' },
        statusCode: 400
      }
    }
  }

  // Login function
  async handleLogin (body) {
    try {
      const { id, createdAt, updatedAt, last_login, password } = await this.repository.findUserByPassAndEmail(body)

      const isPasswordCorect = bcrypt.compareSync(body.senha, password)

      if (!id) {
        return {
          body: { mensagem: 'Usuário e/ou senha inválidos' },
          statusCode: 400
        }
      }

      if (!isPasswordCorect) {
        return {
          body: { mensagem: 'Usuário e/ou senha inválidos' },
          statusCode: 400
        }
      }

      await this.repository.updateLogin(id)

      const authToken = jwt.sign({ id }, 'jwtkey', { expiresIn: 1800 })

      const userReturnBody = {
        id,
        data_criacao: createdAt,
        data_atualizacao: updatedAt,
        ultimo_login: last_login,
        token: authToken
      }

      return {
        body: userReturnBody,
        statusCode: 200
      }
    } catch (err) {
      return {
        body: { mensagem: 'Algo de errado ocorreu ao tentar realizar o login' },
        statusCode: 400
      }
    }
  }

  // Find User

  async getUser (token) {
    try {
      if (!token || token == null) {
        return {
          body: { mensagem: 'Nenhum token providenciado' },
          statusCode: 400
        }
      }

      const authorization = token?.slice(7, token.length).trimStart()

      let userId = 0

      try {
        const tokenVerify = jwt.verify(authorization, 'jwtkey')
        userId = tokenVerify.id
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          return {
            body: { mensagem: 'Sessão inválida' },
            statusCode: 401
          }
        } else if (err instanceof JsonWebTokenError) {
          return {
            body: { mensagem: 'Não autorizado' },
            statusCode: 401
          }
        }
      }

      const user = await this.repository.findUserById(userId)

      const userReturnBody = {
        id: user.id,
        nome: user.username,
        data_criacao: user.createdAt,
        data_atualizacao: user.updatedAt,
        ultimo_login: user.last_login
      }

      return {
        body: userReturnBody,
        statusCode: 200
      }
    } catch (err) {
      return {
        body: { mensagem: 'Algo deu errado ao retornar o usuário' },
        statusCode: 400
      }
    }
  }
}
