import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink , SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit , OnDestroy {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)

  productsData !: Iproduct[]
  productsSub !: Subscription
  searchValue : string = ""

  addCartItem(productId:string){
    this._CartService.addItemToCart(productId).subscribe({
      next : (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems) 
        this._ToastrService.success(res.message , "FreshCart" , {timeOut : 2000 , closeButton : true})
      },
      error : (error) => {
        console.log(error)
        this._ToastrService.error(error.message , "FreshCart" , {timeOut : 2000 , closeButton : true})
      }
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
