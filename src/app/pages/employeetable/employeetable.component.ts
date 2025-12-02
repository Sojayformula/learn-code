import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeModel } from '../../model/model';

@Component({
  selector: 'app-employeetable',
  imports: [FormsModule, CommonModule],
  templateUrl: './employeetable.component.html',
  styleUrl: './employeetable.component.scss'
})
export class EmployeetableComponent implements OnInit {

      showFilterModal = false;
      isLoading = false
      email: string = '';
      password: string = '';
      total: number = 0;
      page = 1;
      
      employeeModel: EmployeeModel = new EmployeeModel();
      selectedChoice: string = 'ALL'
      tempDepartment: string = 'ALL'
      employeeData: any = {
      department: null,
      status: null
    };
      allEmployees: any[] = []
      filteredEmployees: any = {};

  

      constructor(private employeeService:EmployeeService){

        this.employeeModel = new EmployeeModel

      }


  

  ngOnInit() {
    this.loadEmployees();
  }



loadEmployees() {
  this.employeeService.getEmployees(this.employeeModel).subscribe({
    next: (res) => {
      this.allEmployees = res.data;
      this.total = res.total;
      console.log('Employees loaded:', this.allEmployees);
    },
    error: (err) => {
      console.error('Error fetching employees', err);
    }
  });
}



  toggleSelect(item: string) {
  this.employeeModel.status = item === 'ALL' ? '' : item;
  this.selectedChoice = item;
  this.loadEmployees();
  console.log('toggleSelect called with:', item);
}


  // Department change
  onDepartmentChange(dept: string) { 
    this.tempDepartment = dept;
    
  }


  filter(){
    if(this.tempDepartment === 'ALL'){
    delete this.employeeModel.department
    }else{
      this.employeeModel.department = this.tempDepartment
    }

    this.page = 1
    this.loadEmployees()
    console.log('filtered dept', this.tempDepartment)
  }

  openFilterModal(){
    this.showFilterModal = true
  }

   cancelFilterModal(){
    this.showFilterModal = false
  }

  applyFilter(){}



  onSubmit(item:NgForm){}

}




  // if(this.selectedChoice = 'All'){
    //   delete this.allEmployees.department
    // }else{
    //   this.allEmployees.department
    // }
    // this.loadEmployees()