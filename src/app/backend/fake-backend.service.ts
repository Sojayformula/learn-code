// // fake-backend.interceptor.ts
// import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { delay, mergeMap } from 'rxjs/operators';

// export const fakeBackendInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

//   const employees = [
//     { id: 1, name: 'John Doe', department: 'HR', status: 'Pending' },
//     { id: 2, name: 'Mary Smith', department: 'IT', status: 'Approved' },
//     { id: 3, name: 'Kwame Mensah', department: 'Finance', status: 'Pending' },
//     { id: 4, name: 'Ama Boateng', department: 'HR', status: 'Rejected' },
//     { id: 5, name: 'Kojo Asare', department: 'IT', status: 'Approved' }
//   ];

//   return of(null).pipe(
//     delay(400),
//     mergeMap(() => {
//       // GET /employees
//       if (req.url.endsWith('/employees') && req.method === 'GET') {
//         return of(new HttpResponse({ status: 200, body: employees }));
//       }

//       // Otherwise, pass through
//       return next(req);
//     })
//   );
// };





// fake-backend.interceptor.ts
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

export const fakeBackendInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  // 👉 Fake database users
  const users = [
    { id: 1, username: 'admin', password: '123456', role: 'Admin' },
    { id: 2, username: 'emma', password: 'password', role: 'User' }
  ];

  const employees = [
    { id: 1, name: 'John Doe', department: 'HR', status: 'Pending' },
    { id: 2, name: 'Mary Smith', department: 'IT', status: 'Approved' },
    { id: 3, name: 'Kwame Mensah', department: 'Finance', status: 'Pending' },
    { id: 4, name: 'Ama Boateng', department: 'HR', status: 'Rejected' },
    { id: 5, name: 'Kojo Asare', department: 'IT', status: 'Approved' }
  ];

  return of(null).pipe(
    delay(500),
    mergeMap(() => {

      // -------------------------
      // 🔐 LOGIN ENDPOINT
      // -------------------------
      if (req.url.endsWith('/login') && req.method === 'POST') {
        const body = req.body;

        const user = users.find(
          x => x.username === body.username && x.password === body.password
        );

        if (!user) {
          return throwError(() => ({
            status: 401,
            error: { message: 'Invalid username or password' }
          }));
        }

        // Fake token
        const token = 'fake-jwt-token-' + user.id;

        return of(
          new HttpResponse({
            status: 200,
            body: {
              id: user.id,
              username: user.username,
              role: user.role,
              token: token
            }
          })
        );
      }

      // -------------------------
      // 🧾 GET EMPLOYEES
      // -------------------------
      if (req.url.endsWith('/employees') && req.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: employees }));
      }

      // Pass through other requests
      return next(req);
    })
  );
};
