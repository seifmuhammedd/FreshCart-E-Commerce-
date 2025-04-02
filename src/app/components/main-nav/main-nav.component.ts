import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent implements OnInit, OnDestroy {

  constructor ( private _Router : Router ) {}
  private readonly _CartService = inject(CartService)
  cartCounter : number = 0
  subscriptionID !: Subscription

  ngOnInit(): void {
    this.subscriptionID =  this._CartService.cartCounter.subscribe({
      next : (value) => {
        this.cartCounter = value
      }
    })
  }

  logOut() : void {
    sessionStorage.removeItem("token")
    this._Router.navigate(["/auth/login"])
  }

  ngOnDestroy(): void {
    this.subscriptionID?.unsubscribe()
  }
}
