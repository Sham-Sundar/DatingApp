import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  
  
  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelStateErrors = []
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key]);
                }
              }
              throw modelStateErrors.flat();
            }else{
              toast.error(error.error + ' ' + error.status);
            }

            break;

          case 401:
            toast.error('Unauthorized' + ' ' + error.status);
            break;
          
          case 404:
            router.navigateByUrl('/not-found');
            break;

          case 500:
            toast.error('Server Error' + ' ' + error.status);
            break;
          
          default:
            toast.error('Something Went Wrong' + ' ' + error.status);
            break;
        }
      }
      throw error;
    })
  )
};
