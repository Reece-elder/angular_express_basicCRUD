import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  constructor(
    private productsService: ProductsService
  ) {}

  // Products is an object type that takes in product objects

  // HomeComponent is an object that contains the paramater products (which is an empty array that will be filled with product objects)
  products: Product[] = [];

  // Variables for pagination
  totalRecords: number = 0;
  rows: number = 5;

  onProductOutput(product: Product) {
    console.log(product);
  }

  // Whenever the page changes this event will be called, which takes in the event object which contains the page and the rows to get the correct products
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows)
  }

  // Custom function to get the correct products from the API depending on the page and the perPage
  fetchProducts(page: number, perPage: number) {
    this.productsService
    .getProducts('http://localhost:3000/clothes', {page, perPage} )
    // retreivedProducts is the object that is returned from the API that is of type Products
    .subscribe((retrievedProducts: Products) => {
      this.products = retrievedProducts.items;
      this.totalRecords = retrievedProducts.total
    })
  
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
  
}
