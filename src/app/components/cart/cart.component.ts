import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { error } from 'console';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit , OnDestroy {

  private readonly _CartService = inject(CartService)
  cartData : ICart | null = null  
  cartSub !: Subscription

  removeCartItem(productId : string) {
    this._CartService.removeItemFromCart(productId).subscribe({
      next : (res) => {this.cartData = res.data},
      error : (error) => {console.log(error)}
    })
  }

  clearAllCart() {
    this._CartService.clearCart().subscribe({
      next : (res) => {this.cartData = res.data},
      error : (error) => {console.log(error)}
    })
  }

  ngOnInit(): void {
    this.cartSub = this._CartService.getLoggedUserCart().subscribe({
      next : (res) => {
        this.cartData = res.data
      },
      error : (error) => {
        console.log(error)
      }
    })
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe()
  }

}
