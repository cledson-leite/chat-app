import mogoose from 'mongoose'

const userSchema = new mogoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLangth: 6,
    },
    {
      profilePic: {
        type: String,
        default:
          'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      },
    },
  },
  {
    timestamps: true,
  }
)

export default mogoose.model('USERS', userSchema)