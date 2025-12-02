// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {

//   constructor() { }
// }




// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class EmployeeService {

//   private baseUrl = '/employees';  // fake backend route

//   constructor(private http: HttpClient) {}

//   getEmployees(): Observable<any[]> {
//     return this.http.get<any[]>(this.baseUrl);
//   }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Employee, EmployeeModel } from '../model/model';
// import { environment } from '../environment/environment';

// @Injectable({ providedIn: 'root' })
// export class EmployeeService {
//   private baseUrl = '/employees'; // matches the interceptor path

//   constructor(private http: HttpClient) {}

// //  getEmployees(item: EmployeeModel): Observable<any> {
// //   console.log("Fetch employees with filters:", item);

// //   let url = `${environment.baseUrl}/employees`;

// //   let isFirstParam = true;

// //   if (item.page) {
// //     url += `${isFirstParam ? '?' : '&'}page=${item.page}`;
// //     isFirstParam = false;
// //   }

// //   if (item.pageSize) {
// //     url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize}`;
// //     isFirstParam = false;
// //   }

// //   if (item.search) {
// //     url += `${isFirstParam ? '?' : '&'}search=${item.search}`;
// //     isFirstParam = false;
// //   }

// //   if (item.status) {
// //     url += `${isFirstParam ? '?' : '&'}status=${item.status}`;
// //     isFirstParam = false;
// //   }

// //   return this.http.get(url);
// // }


// // // getEmployees(status?: string) {
// // //   let headers = new HttpHeaders();

// // //   if (status) {
// // //     headers = headers.set('status', status);
// // //   }

// // //   return this.http.get<EmployeeModel[]>('/employees', { headers });
// // // }




// //   // POST ➤ Add employee
// //   addEmployee(employee: Employee): Observable<Employee> {
// //     return this.http.post<Employee>(this.baseUrl, employee);
// //   }



// getEmployees(item: EmployeeModel): Observable<any> {
//   let url = `${environment.baseUrl}/employees`;
//   let isFirstParam = true;

//   if (item.page) {
//     url += `${isFirstParam ? '?' : '&'}page=${item.page}`;
//     isFirstParam = false;
//   }

//   if (item.pageSize) {
//     url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize}`;
//     isFirstParam = false;
//   }

//   if (item.search) {
//     url += `${isFirstParam ? '?' : '&'}search=${item.search}`;
//     isFirstParam = false;
//   }

//   if (item.status) {
//     url += `${isFirstParam ? '?' : '&'}status=${item.status}`;
//   }

//   return this.http.get<{ total: number; page: number; pageSize: number; data: EmployeeModel[] }>(url);
// }



// }






import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment'; 
import { EmployeeModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // getEmployees(item: EmployeeModel): Observable<{ total: number; page: number; pageSize: number; data: EmployeeModel[] }> {
  //   let url = `${environment.baseUrl}/employees`;
  //   let isFirstParam = true;

  //   if (item.page) {
  //     url += `${isFirstParam ? '?' : '&'}page=${item.page}`;
  //     isFirstParam = false;
  //   }

  //   if (item.pageSize) {
  //     url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize}`;
  //     isFirstParam = false;
  //   }

  //   if (item.search) {
  //     url += `${isFirstParam ? '?' : '&'}search=${item.search}`;
  //     isFirstParam = false;
  //   }

  //   if (item.status) {
  //     url += `${isFirstParam ? '?' : '&'}status=${item.status}`;
  //   }

  //   return this.http.get<{ total: number; page: number; pageSize: number; data: EmployeeModel[] }>(url);
  // }




  getEmployees(item: EmployeeModel): Observable<{ total: number; page: number; pageSize: number; data: EmployeeModel[] }> {
    let url = `${environment.baseUrl}/employees`;
    let isFirstParam = true;

    if (item.page) {
      url += `${isFirstParam ? '?' : '&'}page=${item.page}`;
      isFirstParam = false;
    }

    if (item.pageSize) {
      url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize}`;
      isFirstParam = false;
    }

    if (item.search) {
      url += `${isFirstParam ? '?' : '&'}search=${item.search}`;
      isFirstParam = false;
    }

    if (item.status) {
      url += `${isFirstParam ? '?' : '&'}status=${item.status}`;
    }

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ total: number; page: number; pageSize: number; data: EmployeeModel[] }>(url, { headers });
  }
}


