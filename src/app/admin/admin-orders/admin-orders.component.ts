import {Component, OnInit} from '@angular/core';
import {Order} from '../../Models/order';
import {MatTableDataSource} from '@angular/material/table';
import {OrderService} from '../../services/order.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: Order[];
  dataSource: MatTableDataSource<Order>;
  displayedColumns = ['name', 'datePlaced'];
  userId: string;

  constructor(private orderService: OrderService, private authService: AuthenticationService) {
    this.authService.getUser().subscribe(user => {
      this.userId = user.uid;
      this.orderService.getOrders()
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
