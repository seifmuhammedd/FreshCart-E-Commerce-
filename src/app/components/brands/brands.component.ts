import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrand } from '../../core/interfaces/ibrand';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit , OnDestroy {

  private readonly _BrandsService = inject(BrandsService)

  brandsData !: IBrand[]
  brandsSub !: Subscription  

  ngOnInit(): void {
    this.brandsSub = this._BrandsService.getAllBrands().subscribe({
      next : (res) => {
        this.brandsData = res.data
      },
      error : (error) => {
        console.log(error)
      }
    })
  }

  ngOnDestroy(): void {
    this.brandsSub?.unsubscribe()
  }

}
