import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  constructor (private _ProductsService : ProductsService) {}

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  productId !: string | null
  productDetails : Iproduct = {} as Iproduct

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({

      next : (productInfo) => {
        this.productId = productInfo.get("p_ID")
        this._ProductsService.getProductDetails(this.productId).subscribe({

            next : (res) => {
              this.productDetails = res.data
              console.log(this.productDetails)
            },
            error : (error) => console.log(error)

        })
      }
    })
  }

}
