import { PhoneRepository } from '../REPOSITORY/PhoneRepository.js'
import { UserRepository } from '../REPOSITORY/UserRepository.js'
import { UserService } from '../SERVICE/UserService.js'

export const register = async (req, res) => {
  const repository = new UserRepository()
  const phoneRepository = new PhoneRepository()

  const service = new UserService(repository, phoneRepository)

  const { body, statusCode } = await service.handleCreateUser(req.body)
  res.status(statusCode).json(body)
}

export const login = async (req, res) => {
  const repository = new UserRepository()
  const service = new UserService(repository)

  const { body, statusCode } = await service.handleLogin(req.body)

  res.status(statusCode).json(body)
}

export const getUser = async (req, res) => {
  const repository = new UserRepository()

  const service = new UserService(repository)

  const token = req.header('Authorization')

  const { body, statusCode } = await service.getUser(token)

  res.status(statusCode).json(body)
}
