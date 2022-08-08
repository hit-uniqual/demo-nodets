import { createCipheriv, createDecipheriv } from 'crypto'
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs'
import mime from 'mime'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../constants'
import dotenv from 'dotenv'

dotenv.config({path: '../../.env'})

const AES_ENC_KEY = Buffer.from('aa5da0d21b01447253ae947ffe81b6e3f48d3d8b25a3f8ff8e3fdabfa8148375', 'hex') // set random encryption key
const AES_IV = Buffer.from('cf55e913db45b815efcaedd30649c52e', 'hex') // set random initialisation vector

export const encrypt = (val) => {
  const cipher = createCipheriv('aes-256-cbc', AES_ENC_KEY, AES_IV)
  let encrypted = cipher.update(val, 'utf8', 'base64')
  encrypted += cipher.final('base64')
  return encrypted
}

export const decrypt = (encrypted) => {
  const decipher = createDecipheriv('aes-256-cbc', AES_ENC_KEY, AES_IV)
  const decrypted = decipher.update(encrypted, 'base64', 'utf8')
  return decrypted + decipher.final('utf8')
}

export const storeAsSync = (dir, buffer, mimetype) => {
  const storageDir = 'public/storage'
  const fileName = `${dir}/${uuidv4()}.${mime.extension(mimetype)}`

  const storageDirExists = existsSync(storageDir)
  if (!storageDirExists) mkdirSync(storageDir)

  const exists = existsSync(`${storageDir}/${dir}`)
  if (!exists) mkdirSync(`${storageDir}/${dir}`)

  writeFileSync(`${storageDir}/${fileName}`, buffer)

  return fileName
}

export const deleteFile = (file) => {
  const filePath = `./public/storage/${file}`
  if (existsSync(filePath)) {
    unlinkSync(filePath)
  }
  return true
}

export const castToStorage = (string) =>
  string ? config.baseUrl(`storage/${string}`) : null
