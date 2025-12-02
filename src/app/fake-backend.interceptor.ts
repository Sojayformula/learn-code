// // src/app/fake-backend.interceptor.ts
// import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { delay, mergeMap } from 'rxjs/operators';

// // --- In-memory employees ---
// const employees = [
//   {
//     id: 1,
//     personal: { firstName: 'John', lastName: 'Doe', fullName: 'John Doe', gender: 'Male', dob: '1990-06-12', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
//     contact: { email: 'john.doe@example.com', phone: '+233 245 678 900', address: { street: '14 Ring Road', city: 'Accra', country: 'Ghana' } },
//     job: { department: 'HR', position: 'HR Manager', dateJoined: '2020-01-15', salary: 4500, managerId: null },
//     status: 'Pending',
//     permissions: ['view-employees', 'edit-profile'],
//     logs: [{ action: 'Created account', date: '2024-01-05' }]
//   },
//   {
//     id: 2,
//     personal: { firstName: 'Mary', lastName: 'Smith', fullName: 'Mary Smith', gender: 'Female', dob: '1994-03-21', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
//     contact: { email: 'mary.smith@example.com', phone: '+233 501 234 567', address: { street: 'Airport Hills', city: 'Accra', country: 'Ghana' } },
//     job: { department: 'IT', position: 'Software Engineer', dateJoined: '2019-08-01', salary: 5200, managerId: 5 },
//     status: 'Approved',
//     permissions: ['view-employees', 'access-dashboard'],
//     logs: [{ action: 'Logged in', date: '2024-03-10' }]
//   },
//   {
//     id: 3,
//     personal: { firstName: 'Kwame', lastName: 'Mensah', fullName: 'Kwame Mensah', gender: 'Male', dob: '1988-11-10', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
//     contact: { email: 'kwame.mensah@example.com', phone: '+233 547 001 223', address: { street: 'Tema Community 8', city: 'Tema', country: 'Ghana' } },
//     job: { department: 'Finance', position: 'Account Officer', dateJoined: '2022-06-12', salary: 3900, managerId: 4 },
//     status: 'Pending',
//     permissions: ['view-reports'],
//     logs: [{ action: 'Submitted report', date: '2024-01-29' }]
//   },

//    {
//     id: 4,
//     personal: { firstName: 'Kwame', lastName: 'Mensah', fullName: 'Kwame Mensah', gender: 'Male', dob: '1988-11-10', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
//     contact: { email: 'kwame.mensah@example.com', phone: '+233 547 001 223', address: { street: 'Tema Community 8', city: 'Tema', country: 'Ghana' } },
//     job: { department: 'Finance', position: 'Account Officer', dateJoined: '2022-06-12', salary: 3900, managerId: 4 },
//     status: 'Rejected',
//     permissions: ['view-reports'],
//     logs: [{ action: 'Submitted report', date: '2024-01-29' }]
//   },

//    {
//     id: 3,
//     personal: { firstName: 'Kwame', lastName: 'Mensah', fullName: 'Kwame Mensah', gender: 'Male', dob: '1988-11-10', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
//     contact: { email: 'kwame.mensah@example.com', phone: '+233 547 001 223', address: { street: 'Tema Community 8', city: 'Tema', country: 'Ghana' } },
//     job: { department: 'Finance', position: 'Account Officer', dateJoined: '2022-06-12', salary: 3900, managerId: 4 },
//     status: 'Approved',
//     permissions: ['view-reports'],
//     logs: [{ action: 'Submitted report', date: '2024-01-29' }]
//   }
// ];

// // --- Users for login ---
// const users: { id: number; email: string; password: string; token?: string }[] = [
//   { id: 1, email: 'admin@example.com', password: '123' },
//   { id: 2, email: 'user@example.com', password: '123' }
// ];

// // --- Fake backend interceptor ---
// export const fakeBackendInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
//   return of(null).pipe(
//     delay(400), // simulate network latency
//     mergeMap(() => {
//       const { url, method, body } = req;
//       const urlPath = url.replace(window.location.origin, ''); // remove host

//       // --- POST /login ---
//       if (urlPath.endsWith('/login') && method === 'POST') {
//         const { email, password } = body;
//         const user = users.find(u => u.email === email && u.password === password);
//         if (!user) {
//           return of(new HttpResponse({ status: 401, body: { message: 'Invalid email or password' } }));
//         }
//         return of(new HttpResponse({
//           status: 200,
//           body: { id: user.id, email: user.email, token: 'fake-jwt-token' }
//         }));
//       }

//       // --- GET /employees with query filters ---
//       if (urlPath.startsWith('/api/employees') && method === 'GET') {
//         const queryString = urlPath.split('?')[1] || '';
//         const params = new URLSearchParams(queryString);
//         const page = Number(params.get('page') || 1);
//         const pageSize = Number(params.get('pageSize') || 10);
//         const status = params.get('status') || '';
//         const search = params.get('search') || '';
//         const department = params.get('department') || '';

//         let filtered = [...employees];
//         if (status) filtered = filtered.filter(emp => emp.status.toLowerCase() === status.toLowerCase());
//         if (search) filtered = filtered.filter(emp => emp.personal.fullName.toLowerCase().includes(search.toLowerCase()));
//         if (department) filtered = filtered.filter(emp => emp.job.department.toLowerCase() === department.toLowerCase());

//         const start = (page - 1) * pageSize;
//         const paginated = filtered.slice(start, start + pageSize);

//         return of(new HttpResponse({
//           status: 200,
//           body: { total: filtered.length, page, pageSize, data: paginated }
//         }));
//       }

//       // --- POST /employees (add) ---
//       if (urlPath.endsWith('/employees') && method === 'POST') {
//         const newEmp = body;
//         newEmp.id = employees.length + 1;
//         employees.push(newEmp);
//         return of(new HttpResponse({ status: 201, body: newEmp }));
//       }

//       // --- GET /employees/:id ---
//       if (urlPath.match(/\/employees\/\d+$/) && method === 'GET') {
//         const id = Number(urlPath.split('/').pop());
//         const emp = employees.find(e => e.id === id) || null;
//         return of(new HttpResponse({ status: 200, body: emp }));
//       }

//       // --- PUT /employees/:id ---
//       if (urlPath.match(/\/employees\/\d+$/) && method === 'PUT') {
//         const id = Number(urlPath.split('/').pop());
//         const index = employees.findIndex(e => e.id === id);
//         if (index !== -1) {
//           employees[index] = body;
//           return of(new HttpResponse({ status: 200, body: employees[index] }));
//         }
//         return of(new HttpResponse({ status: 404 }));
//       }

//       // --- DELETE /employees/:id ---
//       if (urlPath.match(/\/employees\/\d+$/) && method === 'DELETE') {
//         const id = Number(urlPath.split('/').pop());
//         const index = employees.findIndex(e => e.id === id);
//         if (index !== -1) {
//           const deleted = employees.splice(index, 1)[0];
//           return of(new HttpResponse({ status: 200, body: deleted }));
//         }
//         return of(new HttpResponse({ status: 404 }));
//       }

//       // Pass through any other requests
//       return next(req);
//     })
//   );
// };

// src/app/fake-backend.interceptor.ts
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

// --- In-memory employees ---
const employees = [
  {
    id: 1,
    personal: { firstName: 'John', lastName: 'Doe', fullName: 'John Doe', gender: 'Male', dob: '1990-06-12', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
    contact: { email: 'john.doe@example.com', phone: '+233 245 678 900', address: { street: '14 Ring Road', city: 'Accra', country: 'Ghana' } },
    job: { department: 'HR', position: 'HR Manager', dateJoined: '2020-01-15', salary: 4500, managerId: null },
    status: 'Pending',
    permissions: ['view-employees', 'edit-profile'],
    logs: [{ action: 'Created account', date: '2024-01-05' }]
  },
  {
    id: 2,
    personal: { firstName: 'Mary', lastName: 'Smith', fullName: 'Mary Smith', gender: 'Female', dob: '1994-03-21', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
    contact: { email: 'mary.smith@example.com', phone: '+233 501 234 567', address: { street: 'Airport Hills', city: 'Accra', country: 'Ghana' } },
    job: { department: 'IT', position: 'Software Engineer', dateJoined: '2019-08-01', salary: 5200, managerId: 5 },
    status: 'Approved',
    permissions: ['view-employees', 'access-dashboard'],
    logs: [{ action: 'Logged in', date: '2024-03-10' }]
  },
  {
    id: 3,
    personal: { firstName: 'Kwame', lastName: 'Mensah', fullName: 'Kwame Mensah', gender: 'Male', dob: '1988-11-10', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    contact: { email: 'kwame.mensah@example.com', phone: '+233 547 001 223', address: { street: 'Tema Community 8', city: 'Tema', country: 'Ghana' } },
    job: { department: 'Finance', position: 'Account Officer', dateJoined: '2022-06-12', salary: 3900, managerId: 4 },
    status: 'Approved',
    permissions: ['view-reports'],
    logs: [{ action: 'Submitted report', date: '2024-01-29' }]
  },
  {
    id: 4,
    personal: { firstName: 'Ama', lastName: 'Boateng', fullName: 'Ama Boateng', gender: 'Female', dob: '1985-04-05', image: 'https://randomuser.me/api/portraits/women/45.jpg' },
    contact: { email: 'ama.boateng@example.com', phone: '+233 278 450 900', address: { street: 'KNUST', city: 'Kumasi', country: 'Ghana' } },
    job: { department: 'HR', position: 'Senior HR Officer', dateJoined: '2018-03-20', salary: 6200, managerId: null },
    status: 'Rejected',
    permissions: ['manage-employees', 'approve-leaves'],
    logs: [{ action: 'Rejected leave request', date: '2024-02-10' }]
  }
];

// --- Users for login ---
const users: { id: number; email: string; password: string; token?: string }[] = [
  { id: 1, email: 'admin@example.com', password: '123' },
  { id: 2, email: 'user@example.com', password: '123' }
];

// --- Fake backend interceptor ---
export const fakeBackendInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  return of(null).pipe(
    delay(400), // simulate network latency
    mergeMap(() => {
      const { url, method, body } = req;
      const urlPath = url.replace(window.location.origin, ''); // remove host

      // --- POST /login ---
      if (urlPath.endsWith('/login') && method === 'POST') {
        const { email, password } = body;
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
          return of(new HttpResponse({ status: 401, body: { message: 'Invalid email or password' } }));
        }
        return of(new HttpResponse({
          status: 200,
          body: { id: user.id, email: user.email, token: 'fake-jwt-token' }
        }));
      }

      // --- GET /employees with deep search & pagination ---
      if (urlPath.startsWith('/api/employees') && method === 'GET') {
        const queryString = urlPath.split('?')[1] || '';
        const params = new URLSearchParams(queryString);
        const page = Number(params.get('page') || 1);
        const pageSize = Number(params.get('pageSize') || 10);
        const status = params.get('status')?.toLowerCase() || '';
        const department = params.get('department')?.toLowerCase() || '';
        const search = params.get('search')?.toLowerCase() || '';

        let filtered = [...employees];

        // Filter by status
        if (status) {
          filtered = filtered.filter(emp => emp.status.toLowerCase() === status);
        }

        // Filter by department
        if (department) {
          filtered = filtered.filter(emp => emp.job.department.toLowerCase() === department);
        }

        // Deep search across multiple fields
        if (search) {
          filtered = filtered.filter(emp =>
            emp.personal.fullName.toLowerCase().includes(search) ||
            emp.personal.firstName.toLowerCase().includes(search) ||
            emp.personal.lastName.toLowerCase().includes(search) ||
            emp.contact.email.toLowerCase().includes(search) ||
            emp.contact.phone.toLowerCase().includes(search) ||
            emp.job.department.toLowerCase().includes(search) ||
            emp.job.position.toLowerCase().includes(search)
          );
        }

        // Pagination
        const start = (page - 1) * pageSize;
        const paginated = filtered.slice(start, start + pageSize);

        return of(new HttpResponse({
          status: 200,
          body: { total: filtered.length, page, pageSize, data: paginated }
        }));
      }

      // --- POST /employees (add) ---
      if (urlPath.endsWith('/employees') && method === 'POST') {
        const newEmp = body;
        newEmp.id = employees.length + 1;
        employees.push(newEmp);
        return of(new HttpResponse({ status: 201, body: newEmp }));
      }

      // --- GET /employees/:id ---
      if (urlPath.match(/\/employees\/\d+$/) && method === 'GET') {
        const id = Number(urlPath.split('/').pop());
        const emp = employees.find(e => e.id === id) || null;
        return of(new HttpResponse({ status: 200, body: emp }));
      }

      // --- PUT /employees/:id ---
      if (urlPath.match(/\/employees\/\d+$/) && method === 'PUT') {
        const id = Number(urlPath.split('/').pop());
        const index = employees.findIndex(e => e.id === id);
        if (index !== -1) {
          employees[index] = body;
          return of(new HttpResponse({ status: 200, body: employees[index] }));
        }
        return of(new HttpResponse({ status: 404 }));
      }

      // --- DELETE /employees/:id ---
      if (urlPath.match(/\/employees\/\d+$/) && method === 'DELETE') {
        const id = Number(urlPath.split('/').pop());
        const index = employees.findIndex(e => e.id === id);
        if (index !== -1) {
          const deleted = employees.splice(index, 1)[0];
          return of(new HttpResponse({ status: 200, body: deleted }));
        }
        return of(new HttpResponse({ status: 404 }));
      }

      // Pass through any other requests
      return next(req);
    })
  );
};








// // src/app/fake-backend.interceptor.ts
// import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { delay, mergeMap } from 'rxjs/operators';

// // --- In-memory employee data ---
// const employees = [
//   {
//     id: 1,
//     personal: { firstName: 'John', lastName: 'Doe', fullName: 'John Doe', gender: 'Male', dob: '1990-06-12', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
//     contact: { email: 'john.doe@example.com', phone: '+233 245 678 900', address: { street: '14 Ring Road', city: 'Accra', country: 'Ghana' } },
//     job: { department: 'HR', position: 'HR Manager', dateJoined: '2020-01-15', salary: 4500, managerId: null },
//     status: 'Pending',
//     permissions: ['view-employees', 'edit-profile'],
//     logs: [{ action: 'Created account', date: '2024-01-05' }, { action: 'Updated profile', date: '2024-02-15' }]
//   },
//   {
//     id: 2,
//     personal: { firstName: 'Mary', lastName: 'Smith', fullName: 'Mary Smith', gender: 'Female', dob: '1994-03-21', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
//     contact: { email: 'sojay.com', phone: '+233 501 234 567', address: { street: 'Airport Hills', city: 'Accra', country: 'Ghana' } },
//     job: { department: 'IT', position: 'Software Engineer', dateJoined: '2019-08-01', salary: 5200, managerId: 5 },
//     status: 'Approved',
//     permissions: ['view-employees', 'access-dashboard'],
//     logs: [{ action: 'Logged in', date: '2024-03-10' }, { action: 'Password change', date: '2024-03-20' }]
//   },
//    {
//       id: 3,
//       personal: { firstName: 'John', lastName: 'Doe', fullName: 'John Doe', gender: 'Male', dob: '1990-06-12', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
//       contact: { email: 'john.doe@example.com', phone: '+233 245 678 900', address: { street: '14 Ring Road', city: 'Accra', country: 'Ghana' } },
//       job: { department: 'HR', position: 'HR Manager', dateJoined: '2020-01-15', salary: 4500, managerId: null },
//       status: 'Pending',
//       permissions: ['view-employees', 'edit-profile'],
//       logs: [{ action: 'Created account', date: '2024-01-05' }, { action: 'Updated profile', date: '2024-02-15' }]
//     },
//     {
//       id: 4,
//       personal: { firstName: 'Mary', lastName: 'Smith', fullName: 'Mary Smith', gender: 'Female', dob: '1994-03-21', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
//       contact: { email: 'mary.smith@example.com', phone: '+233 501 234 567', address: { street: 'Airport Hills', city: 'Accra', country: 'Ghana' } },
//       job: { department: 'IT', position: 'Software Engineer', dateJoined: '2019-08-01', salary: 5200, managerId: 5 },
//       status: 'Approved',
//       permissions: ['view-employees', 'access-dashboard'],
//       logs: [{ action: 'Logged in', date: '2024-03-10' }, { action: 'Password change', date: '2024-03-20' }]
//     },
//     {
//       id: 5,
//       personal: { firstName: 'Kwame', lastName: 'Mensah', fullName: 'Kwame Mensah', gender: 'Male', dob: '1988-11-10', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
//       contact: { email: 'kwame.mensah@example.com', phone: '+233 547 001 223', address: { street: 'Tema Community 8', city: 'Tema', country: 'Ghana' } },
//       job: { department: 'Finance', position: 'Account Officer', dateJoined: '2022-06-12', salary: 3900, managerId: 4 },
//       status: 'Pending',
//       permissions: ['view-reports'],
//       logs: [{ action: 'Submitted report', date: '2024-01-29' }]
//     },
//     {
//       id: 6,
//       personal: { firstName: 'Ama', lastName: 'Boateng', fullName: 'Ama Boateng', gender: 'Female', dob: '1985-04-05', image: 'https://randomuser.me/api/portraits/women/45.jpg' },
//       contact: { email: 'ama.boateng@example.com', phone: '+233 278 450 900', address: { street: 'KNUST', city: 'Kumasi', country: 'Ghana' } },
//       job: { department: 'HR', position: 'Senior HR Officer', dateJoined: '2018-03-20', salary: 6200, managerId: null },
//       status: 'Rejected',
//       permissions: ['manage-employees', 'approve-leaves'],
//       logs: [{ action: 'Rejected leave request', date: '2024-02-10' }]
//     },
//     {
//       id: 7,
//       personal: { firstName: 'Kojo', lastName: 'Asare', fullName: 'Kojo Asare', gender: 'Male', dob: '1992-10-02', image: 'https://randomuser.me/api/portraits/men/50.jpg' },
//       contact: { email: 'kojo.asare@example.com', phone: '+233 503 400 600', address: { street: 'Dansoman', city: 'Accra', country: 'Ghana' } },
//       job: { department: 'IT', position: 'Lead Full-Stack Developer', dateJoined: '2017-09-12', salary: 8500, managerId: null },
//       status: 'Approved',
//       permissions: ['access-dashboard', 'deploy-code', 'manage-system'],
//       logs: [{ action: 'Deployed new version', date: '2024-03-18' }]
//     }
// ];

// // --- Users for login ---
// const users: { id: number; email: string; password: string; token?: string }[] = [
//   { id: 1, email: 'admin@example.com', password: '123' },
//   { id: 2, email: 'sojay.com', password: '123' }
// ];

// export const fakeBackendInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
//   return of(null).pipe(
//     delay(400), // simulate network latency
//     mergeMap(() => {
//       const { url, method, body } = req;
//       const urlPath = url.replace(window.location.origin, ''); // remove host for full URL

//       // --- POST /login ---
//       if (urlPath.endsWith('/login') && method === 'POST') {
//         const { email, password } = body;
//         const user = users.find(u => u.email === email && u.password === password);

//         if (!user) {
//           return of(new HttpResponse({ status: 401, body: { message: 'Invalid email or password' } }));
//         }

//         return of(new HttpResponse({
//           status: 200,
//           body: { id: user.id, email: user.email, token: 'fake-jwt-token' }
//         }));
//       }

//       // --- GET /employees with query parameters ---
//       if (urlPath.startsWith('/api/employees') && method === 'GET') {
//         const queryString = urlPath.split('?')[1] || '';
//         const params = new URLSearchParams(queryString);
//         const page = Number(params.get('page') || 1);
//         const pageSize = Number(params.get('pageSize') || 10);
//         const status = params.get('status') || '';
//         const search = params.get('search') || '';

//         let filtered = [...employees];
//         if (status) filtered = filtered.filter(emp => emp.status.toLowerCase() === status.toLowerCase());
//         if (search) filtered = filtered.filter(emp => emp.personal.fullName.toLowerCase().includes(search.toLowerCase()));

//         const start = (page - 1) * pageSize;
//         const paginated = filtered.slice(start, start + pageSize);

//         return of(new HttpResponse({
//           status: 200,
//           body: { total: filtered.length, page, pageSize, data: paginated }
//         }));
//       }

//       // --- POST /employees ---
//       if (urlPath.endsWith('/employees') && method === 'POST') {
//         const newEmp = body;
//         newEmp.id = employees.length + 1;
//         employees.push(newEmp);
//         return of(new HttpResponse({ status: 201, body: newEmp }));
//       }

//       // --- GET /employees/:id ---
//       if (urlPath.match(/\/employees\/\d+$/) && method === 'GET') {
//         const id = Number(urlPath.split('/').pop());
//         const emp = employees.find(e => e.id === id) || null;
//         return of(new HttpResponse({ status: 200, body: emp }));
//       }

//       // --- PUT /employees/:id ---
//       if (urlPath.match(/\/employees\/\d+$/) && method === 'PUT') {
//         const id = Number(urlPath.split('/').pop());
//         const index = employees.findIndex(e => e.id === id);
//         if (index !== -1) {
//           employees[index] = body;
//           return of(new HttpResponse({ status: 200, body: employees[index] }));
//         }
//         return of(new HttpResponse({ status: 404 }));
//       }

//       // --- DELETE /employees/:id ---
//       if (urlPath.match(/\/employees\/\d+$/) && method === 'DELETE') {
//         const id = Number(urlPath.split('/').pop());
//         const index = employees.findIndex(e => e.id === id);
//         if (index !== -1) {
//           const deleted = employees.splice(index, 1)[0];
//           return of(new HttpResponse({ status: 200, body: deleted }));
//         }
//         return of(new HttpResponse({ status: 404 }));
//       }

//       // Pass through other requests
//       return next(req);
//     })
//   );
// };
