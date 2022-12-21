import User from '../models/user-model'

const initialUsers = [
    {
      "username": "user_1",
      "password": "password123",
      "passwordHash": "$2b$10$drQ3m/uP5sejRRlfHNwNfu4Esxec454XqrE9j6ivWG8E/pYa4HF1u",
      "id": "61c7483607e4533869b9ec08"
    },
    {
      "username": "user_2",
      "password": "password1234",
      "passwordHash": "$2b$10$//cykx4aefD9n4YOKYB7kuFGGoHto3izcLWxvmgyZSc0GnAIf8Oh6",
      "id": "61c7483607e4533869b9ec09"
    }]


const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u: { toJSON: () => any }) => u.toJSON())
}

export default {
  initialUsers,
  usersInDb,
}