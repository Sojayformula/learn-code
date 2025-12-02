import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);

   const token = localStorage.getItem('token')

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq)
};
