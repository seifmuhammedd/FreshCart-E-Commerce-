import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule , CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  constructor (private _ProductsService : ProductsService , private _cartService : CartService) {}

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  productId !: string | null
  productDetails : Iproduct = {} as Iproduct

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  addCartItem(productId:string){
    this._cartService.addItemToCart(productId).subscribe({
      error : (error) => {console.log(error)}
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({

      next : (productInfo) => {
        this.productId = productInfo.get("p_ID")
        this._ProductsService.getProductDetails(this.productId).subscribe({

            next : (res) => {
              this.productDetails = res.data
            },
            error : (error) => console.log(error)

        })
      }
    })
  }

}
