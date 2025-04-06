import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';
import { IOrders } from '../../core/interfaces/iorders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {

  private readonly _OrdersService = inject(OrdersService)
  private readonly _AuthService = inject(AuthService)

  userID !: string
  userOrders !: IOrders[]

  ngOnInit(): void {
    this._AuthService.getDecodedInfo()
    this.userID = this._AuthService.decodedInfo.id
    this._OrdersService.getUserOrders(this.userID).subscribe({
      next: (res) => {
        this.userOrders = res
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
