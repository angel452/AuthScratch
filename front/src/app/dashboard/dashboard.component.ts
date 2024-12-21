import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // List of users
  users = [
    { name: 'Juan Pérez', email: 'juan@ejemplo.com'},
    { name: 'Ana García', email: 'ana@ejemplo.com'},
    { name: 'Luis Rodríguez', email: 'luis@ejemplo.com'},
  ];
}
