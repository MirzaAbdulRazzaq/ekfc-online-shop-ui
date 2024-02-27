import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  let Payload;
  if (token) {
    Payload = token.split('.')[1];
    Payload = JSON.parse(window.atob(Payload));
  }
  return token && Payload.role === 'ADMIN' ? true : false;
};
