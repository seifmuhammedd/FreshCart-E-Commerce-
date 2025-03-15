import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit , OnDestroy {

  constructor ( private _CategoriesService : CategoriesService ) {}

  categoriesData !: ICategory[]
  categoriesSub !: Subscription

  ngOnInit(): void {
    this.categoriesSub =  this._CategoriesService.getALLCategories().subscribe({
      next : (res) => {
        this.categoriesData = res.data
      },
      error : (error) => {console.log(error)}
    })
  }

  ngOnDestroy(): void {
    this.categoriesSub?.unsubscribe()
  }

}
