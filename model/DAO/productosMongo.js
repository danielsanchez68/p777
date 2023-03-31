import mongoose from 'mongoose'
import DB from '../db.js'


class ModelMongo {

    constructor() {
        const productoSchema = mongoose.Schema({
            nombre : String,
            descripcion : String,
            stock : Number,
            precio : Number,
            codigo : String
        })
    
        this.ProductoModel = mongoose.model('productos', productoSchema)
    }

    // ------- CRUD hacia mongoDB ---------
    obtenerProductos = async id => {
        if(!DB.getConexion()) return []

        try {
            if(id) {
                let producto = await this.ProductoModel.findOne({_id:id})
                //console.log(producto)    
                return producto
            }
            else {
                let productos = await this.ProductoModel.find({})
                //console.log(productos)    
                return productos
            }
        }
        catch(err) {
            console.log(`Error en lectura de productos: ${err.message}`)
            return []
        }
    }

    guardarProducto = async producto => {
        if(!DB.getConexion()) return {}

        try {
            let productoModel = new this.ProductoModel(producto)
            await productoModel.save()
            
            //leo el producto agregado
            let productos = await this.ProductoModel.find({})
            let productoAgregado = productos[productos.length-1]
            return productoAgregado
        }
        catch(err) {
            console.log(`Error en escritura del producto: ${err.message}`)
            return {}
        }
    }

    actualizarProducto = async (id, producto) => {
        if(!DB.getConexion()) return {}

        try {
            await this.ProductoModel.updateOne({_id:id}, {$set: producto})

            //leo el producto actualizado
            let productoActualizado = await this.ProductoModel.findOne({_id:id})
            //console.log(productoActualizado)    
            return productoActualizado
        }
        catch(err) {
            console.log(`Error en actualización del producto: ${err.message}`)
            return {}
        }
    }

    borrarProducto = async id => {
        if(!DB.getConexion()) return {}

        try {
            //leo el producto que va a ser eliminado
            let productoEliminado = await this.ProductoModel.findOne({_id:id})

            await this.ProductoModel.deleteOne({_id:id})
            return productoEliminado
        }
        catch(err) {
            console.log(`Error en borrado del producto: ${err.message}`)
            return {}
        }
    }
}

export default ModelMongo