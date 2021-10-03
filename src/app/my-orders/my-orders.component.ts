import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {Order} from '../Models/order';
import {MatTableDataSource} from '@angular/material/table';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})

export class MyOrdersComponent implements OnInit {

  orders: Order[];
  dataSource: MatTableDataSource<Order>;
  displayedColumns = ['name', 'datePlaced'];
  userId: string;

  constructor(private orderService: OrderService, private authService: AuthenticationService) {
    this.authService.getUser().subscribe(user => {
      this.userId = user.uid;
      this.orderService.getOrdersByUser(this.userId)
        .valueChanges()
        .subscribe(orders => {
          this.orders = orders;
          this.dataSource = new MatTableDataSource<Order>(this.orders);
        });
    });

  }

  ngOnInit(): void {
  }

}
