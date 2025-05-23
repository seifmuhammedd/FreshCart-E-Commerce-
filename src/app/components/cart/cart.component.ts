import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit , OnDestroy {

  private readonly _CartService = inject(CartService)
  cartData : ICart | null = null  
  cartSub !: Subscription

  removeCartItem(productId : string) {
    this._CartService.removeItemFromCart(productId).subscribe({
      next : (res) => {
        this.cartData = res.data
        this._CartService.cartCounter.next(res.numOfCartItems)
      }
    })
  }

  clearAllCart() {
    this._CartService.clearCart().subscribe({
      next : (res) => {
        this.cartData = res.data
        this._CartService.cartCounter.next(res.numOfCartItems)
      }
    })
  }

  updateItemQuantity(productId : string , count : number){
    if(count > 0){
      this._CartService.updateItemQuantitiy(productId,count).subscribe({
        next : (res) => {this.cartData = res.data}
      })
    }
  }

  ngOnInit(): void {
    this.cartSub = this._CartService.getLoggedUserCart().subscribe({
      next : (res) => {
        this.cartData = res.data
      }
    })
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe()
  }

}
