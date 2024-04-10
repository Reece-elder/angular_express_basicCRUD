import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, RatingModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

// Generating the ProductComponent class
export class ProductComponent {
  // @Input here is declaring a property within the child class that can be obtained from the parent component. Allowing to pass data from Parent -> Child
  @Input() product!: Product;
  // @Output is allowing us to move certain data sets from the child up the chain. This is used to pass data for more complex forms (I.e using ngModel for forms)
  @Output() productOutput: EventEmitter<Product> = new EventEmitter<Product>();

  ngOnInit() {
    this.productOutput.emit(this.product)
  }

}
