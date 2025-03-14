import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , RouterLink , SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)


  productsData !: Iproduct[]
  categoriesData !: ICategory[]
  productsSub !: Subscription
  categoriesSub !: Subscription
  searchValue : string = ""

  categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
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
      },
      1100: {
        items: 6
      }
    },
    nav: false
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }


  ngOnInit(): void {
    this.productsSub = this._ProductsService.getAllProducts().subscribe({
      next : (res) => {
        this.productsData = res.data.slice(0,20)
      },
      error : (error) => {console.log(error)}
    })

    this.categoriesSub = this._CategoriesService.getALLCategories().subscribe({
      next : (res) => {
        this.categoriesData = res.data
      },
      error : (error) => {console.log(error)}
    })
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe()
    this.categoriesSub?.unsubscribe()
  }
}
