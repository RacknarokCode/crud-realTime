import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../services/product.service"
import { NgForm } from '@angular/forms';
//esta es la clase de products
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor( public productService: ProductService) { }
  ngOnInit() {
    //se trae todos los datos de firebase y se crea un arreglo dentro del servicio
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm:NgForm) {


     //recibe el productForm de tipo ngForm. recibe desde el servicio para insertar un nuevo dato
  //se le pasa todos los valores que tenga el formulario
    //this.productService.insertProduct(productForm.value);
  //Resetea el formulario al agregar un nuevo dato
 // this.resetForm(productForm); 

  //valida el onSubmit. si tenemos el campo $key empieza a actualizar,sino, se empieza a agregar un nuevo producto
  if(productForm.value.$key == null) 
    this.productService.insertProduct(productForm.value);
    
  else
    this.productService.updateProduct(productForm.value);
    this.resetForm(productForm);
  
  
  }
 
//cuando se reciba un formulario va ser de tipo ngForm
  resetForm(productForm?:NgForm){
    //condicion para limpiar el form
    if (productForm != null)  
        productForm.reset();
        this.productService.selectedProduct = new Product();
    
  }
}
