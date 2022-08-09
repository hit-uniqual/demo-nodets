import { castToStorage } from '../common/helper'

export default class UserModel {
  public userId: number
  public profilePicture: string
  public firstName: string
  public lastName: string
  public email: string
  public password: string

  constructor(data) {
    this.userId = data.id
    this.profilePicture = castToStorage(data.profilePicture)
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.email = data.email
    this.password = data.password
  }
}
