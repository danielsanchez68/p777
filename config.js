import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8080
const STR_CNX = process.env.STR_CNX || 'mongodb://127.0.0.1/ecommerce7'
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || 'MEM'   // MEM - FILE - MONGO

export default {
    PORT,
    STR_CNX,
    MODO_PERSISTENCIA,
}