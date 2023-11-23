import { MysqlPool } from '../DATABASE/MySQLDBConnect.js'

export class PhoneRepository {
  async save (userId, data) {
    const q = 'insert into user_phones(user_id, number, ddd, createdAt, updatedAt) values(?, ?, ?, now(), now())'

    if (!userId) {
      throw new Error(' ID do usuário não providênciado')
    }

    try {
      await MysqlPool.query(q, [userId, data.numero, data.ddd])

      return true
    } catch (err) {
      throw new Error('Falha ao criar um novo número')
    }
  }
}
