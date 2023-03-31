import ModelMem from './productosMem.js'
import ModelFile from './productosFile.js'
import ModelMongo from './productosMongo.js'

import config from '../../config.js'

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case 'MEM':
                console.log(' ***** Persistiendo en Memoria ***** ')
                return new ModelMem()

            case 'FILE':
                console.log(' ***** Persistiendo en File System ***** ')
                return new ModelFile()

            case 'MONGO':
                console.log(` ***** Persistiendo en MongoDB (${config.STR_CNX}) ***** `)
                return new ModelMongo()

            default:
                console.log(' ***** Persistiendo en default (Memoria) ***** ')
                return new ModelMem()
        }
    }
}

export default ModelFactory