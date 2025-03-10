import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy {

  private readonly _ProductsService = inject(ProductsService)
  productsData !: Iproduct[]
  productsSub !: Subscription
  ngOnInit(): void {
    this.productsSub = this._ProductsService.getAllProducts().subscribe({
      next : (res) => {
        this.productsData = res.data.slice(0,20)
      },
      error : (error) => {console.log(error)}
    })
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe()
  }
}
