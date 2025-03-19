import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink , SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit , OnDestroy {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _cartService = inject(CartService)

  productsData !: Iproduct[]
  productsSub !: Subscription
  searchValue : string = ""

  addCartItem(productId:string){
    this._cartService.addItemToCart(productId).subscribe({
      error : (error) => {console.log(error)}
    })
  }

  ngOnInit(): void {
    this.productsSub = this._ProductsService.getAllProducts().subscribe({
      next : (res) => {
        this.productsData = res.data
      },
      error : (error) => {console.log(error)}
    })
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe()
  }
}
