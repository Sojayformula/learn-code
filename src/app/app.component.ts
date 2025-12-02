import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './services/employee.service';
import { AutoLogoutService } from './services/auto-logout.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'learcode';

   
    constructor(private idle: AutoLogoutService) {}

  ngOnInit() {
    this.idle.startWatching();
  }



  // applyFilters() {
  //     if (this.tempDepartment === 'All') {
  //       delete this.employeeData.department;
  //     } else {
  //       this.employeeData.department = this.tempDepartment;
  //     }
    
  //     this.page = 1;
  //     this.closeFilterModal();
  //     this.getEmployees();
    
//       console.log('Filters applied:', this.employeeData);

// ngOnInit(): void {
  
// }




    }