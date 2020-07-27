import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../services/product.service"
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
//se guardan los datos en un arreglo que se traigan de la db para poder alterarlos
  productList: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    //trae todos los datos de firebase
    this.productService.getProducts()
    //snaphotChanges sirve para traer todos los cambios que hayan en firebase
    //el subscribe trae los propios datos que guardamos en la base de datos

    //se reccorren, y por cada item recorrido se puede empezar a alterar
    .snapshotChanges()
    .subscribe(item =>{
      this.productList = [];
      //Se llena el arreglo con cada item
      // se recorre cada item con forEach
      item.forEach(element =>{
        //selecciona cada campo, se convierte en un json y se almacena en una variable
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        //se agrega con push, a la lista del html
        this.productList.push(x as Product);
      })
    });
  }

  onEdit(product: Product){
    //Selecciona el producto seleccionado y lo escribe en el form para editarlo

    //el Object.assign({},product) crea una copia nueva del elemento y de esta manera no se tendra doble enlace
    this.productService.selectedProduct= Object.assign({},product);
  }
  onDelete($key: string){
    //evento que se encarga de eliminar los productos
    this.productService.deleteProduct($key);
  }

}
