import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast';
      document.body.appendChild(container);
    }
  }

  private createToastElement(message: string, alertClass: string, duration = 5000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg', 'flex', 'justify-between');
    toast.innerHTML = `
      <span>${message}</span>
      <button class="btn btn-sm btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
    `;

    toast.querySelector('button')?.addEventListener('click', ()=>{
      toastContainer.removeChild(toast);
    });

    toastContainer.appendChild(toast);

    setTimeout(() => {
      if(toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  success(message:string, duration?:number){
    this.createToastElement(message, 'alert-success', duration);
  }

  error(message: string, duration?: number) {
    this.createToastElement(message, 'alert-error', duration);
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, 'alert-warning', duration);
  }

  info(message: string, duration?: number) {
    this.createToastElement(message, 'alert-info', duration);
  }
}




















// constructor() {
//   this.createToastContainer();
// }

// private createToastContainer(){
//   if (!document.getElementById('toast-container')) {
//     const container = document.createElement('div');
//     container.id = 'toast-container';
//     container.className = 'toast';
//     document.body.appendChild(container);
//   }
// }

// private createToastElement(message: string, alertClass: string, duration = 5000){
//   const toastContainer = document.getElementById('toast-container');
//   if (!toastContainer) return;

//   const toast = document.createElement('div');
//   toast.classList.add('alert', alertClass, 'shadow-lg');
//   toast.innerHTML = `
//     <span>${{ message }}</span>
//     <div class="badge badge-sm">x</div>
//   `;

//   toast.querySelector('div')?.addEventListener('click', () => {
//     toastContainer.removeChild(toast);
//   })

//   toastContainer.append(toast);

//   setTimeout(() => {
//     if (toastContainer.contains(toast)) {
//       toastContainer.removeChild(toast);
//     }
//   }, duration);
// }

// success(message: string, duration ?: number){
//   this.createToastElement(message, 'alert-success', duration);
// }

// error(message: string, duration ?: number) {
//   this.createToastElement(message, 'alert-error', duration);
// }

// info(message: string, duration ?: number) {
//   this.createToastElement(message, 'alert-info', duration);
// }

// warning(message: string, duration ?: number) {
//   this.createToastElement(message, 'alert-warning', duration);
// }