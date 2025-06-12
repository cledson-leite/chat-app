import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Mongodb Conectado: ${conn.connection.host}`)
  } catch (error) {
    console.log(`Erro na conexão: ${error.message}`)
  }
}
