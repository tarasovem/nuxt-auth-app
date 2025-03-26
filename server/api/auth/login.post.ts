import { pbkdf2 } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { promisify } from 'node:util'
import type { User } from '~/types/user'

const pbkdf2Async = promisify(pbkdf2)

const SALT = process.env.PASSWORD_SALT || 'your-secure-salt'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Method Not Allowed',
    })
  }

  try {
    const { email, password } = await readBody(event)

    const usersData = readFileSync('./server/data/users.json', 'utf-8')
    const users: User[] = JSON.parse(usersData)

    const hashedPassword = await pbkdf2Async(password, SALT, 100000, 64, 'sha512').then(
      (derivedKey) => derivedKey.toString('hex'),
    )

    const user = users.find((u) => {
      const match =
        u.credentials.username === email && u.credentials.passphrase === hashedPassword && u.active
      if (u.credentials.username === email) {
        console.log('Found user, password match:', match)
      }
      return match
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Неверный email или пароль',
      })
    }

    const { credentials, ...safeUserData } = user
    return {
      ...safeUserData,
      email: credentials.username,
    }
  } catch (error) {
    console.error('Login error:', error instanceof Error ? error.message : 'Unknown error')
    throw createError({
      statusCode: 500,
      message: 'Ошибка сервера при авторизации',
    })
  }
})
