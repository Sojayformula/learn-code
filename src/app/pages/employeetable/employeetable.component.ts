import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeModel } from '../../model/model';
import { debounceTime, Subject } from 'rxjs';

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
      pageSize = 10;
      
      employeeModel: EmployeeModel = new EmployeeModel();
      selectedChoice: string = 'ALL'
      tempDepartment: string = 'ALL'
      searchQuery: string = ''
    //   employeeData: any = {
    //   // department: null,
    //   // status: null
    // };
      allEmployees: any[] = []
      filteredEmployees: any = {};

       searchSubject = new Subject<string>();

  

      constructor(private employeeService:EmployeeService){

        this.employeeModel = new EmployeeModel


          this.searchSubject.pipe(
            debounceTime(300)
          ).subscribe(() => {
            this.search();
          });

      }


  

  ngOnInit() {
    this.loadEmployees();
  }



loadEmployees() {
  this.employeeService.getEmployees(this.employeeModel).subscribe({
    next: (res) => {
       console.log('Employees loaded:', this.allEmployees);
      this.allEmployees = res.data;
      this.total = res.total;
      this.page = res.page;           // optional, for pagination component
    this.pageSize = res.pageSize;
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


  // search(){
  //   this.employeeModel.search = this.searchQuery
  //   console.log('search', this.searchQuery)
  //   this.page = 1
  //   this.loadEmployees()
  // }
  
  
  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  search() {
  // assign search term to employeeModel
  this.employeeModel.search = this.searchQuery; 
  this.employeeModel.page = 1;    
  this.employeeModel.pageSize = 10; 
  this.loadEmployees();

  console.log('searching for:', this.employeeModel.search);
}



   filter(){
    if(this.tempDepartment === 'ALL'){
    delete this.employeeModel.department
    }else{
      this.employeeModel.department = this.tempDepartment
    }

    this.page = 1
    this.loadEmployees()
    this.cancelFilterModal()
    console.log('filtered dept', this.tempDepartment)
  }


// filter() {
//   if (this.tempDepartment === 'ALL') {
//   this.employeeModel.department = "";
// } else {
//   this.employeeModel.department = this.tempDepartment;
// } 
// console.log('filter data', this.tempDepartment)
// this.page = 1
// this.loadEmployees()
// } 
// }



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