import { Injectable } from '@angular/core';
//se importa la base de datos de firebase (AngularFireList es para listar datos de la bd)
//AngularFireDatabase es para usar la conexion a firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Product } from '../models/product'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //definir lista de productos
  productsList: AngularFireList<any>;

  //se crea una variable para almacenar temporalmente el dato seleccionado
      //cuando empiece el servicio estara en blanco
  selectedProduct: Product = new Product();
  constructor(private firebase: AngularFireDatabase) { }
//Definir metodos
    getProducts(){

      //se trae y retorna todo lo que tenga en firebase y se guarda en una coleccion llamada "products") 
   return this.productsList = this.firebase.list('products');
    }
    //insertar productos en la bd
    insertProduct(product: Product){
      //con push se agrega un dato al final de toda la lista
      this.productsList.push({
        //se le da un nombre, y viene desde el parametro product con su propiedad name
        name: product.name,
        category: product.category,
        location: product.location,
        price: product.price
      });
    }

    // se actualiza campos del producto
    updateProduct(product: Product){
      //se busca en la lista para actualizarlo
        //el metodo para actualizar es update

        //recibe 2 parametros para poder actualizarlo y cuando lo encuentre, le decimos que parametros va actualizar atraves de un objeto
      this.productsList.update(product.$key, {
        //parametros a actualizar
        name: product.name,
        category: product.category,
        location: product.location,
        price: product.price
      });
    }

    //para eliminar productos
        //se pasa la clave para encontrarlo y asi poder eliminarlo
    deleteProduct($key: string){
      //se da la clave como parametro para poder eliminarlo
      this.productsList.remove($key);
    }

  }

