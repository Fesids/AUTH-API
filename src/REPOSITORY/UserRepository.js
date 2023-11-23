import { MysqlPool } from '../DATABASE/MySQLDBConnect.js'

export class UserRepository {
  async updateLogin (userId) {
    const q = 'update USERS SET last_login = now() where id = ?;'

    await MysqlPool.query(q, [userId])
  }

  // Retrieve a User by email
  async findUserByEmail (email) {
    const q = 'select * from USERS where email=?'

    const [rows] = await MysqlPool.query(q, [email])

    if (rows.length) {
      return true
    }

    return false
  }

  // create a  new user
  async save (data) {
    let q = 'insert into USERS(username, email, password, createdAt, updatedAt, last_login) values(?, ?, ?, now(), now(), now())'

    const saveBody = [
      data.nome,
      data.email,
      data.senha
    ]

    try {
      await MysqlPool.query(q, saveBody)

      q = 'select * from USERS where email=?'

      const resp = await MysqlPool.query(q, data.email)

      return resp[0][0]
    } catch (err) {
      throw new Error('falha ao criar um novo usuário')
    }
  }

  async findUserByPassAndEmail (data) {
    const q = 'select * from USERS where email=?'

    const user = await MysqlPool.query(q, [data.email])

    return user[0][0]
  }

  async findUserById (id) {
    const q = 'select * from USERS where id=?'

    if (!id) {
      throw new Error('ID não providênciado')
    }

    const user = await MysqlPool.query(q, [id])

    return user[0][0]
  }
}
