import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

//   constructor() { }
// }



  private timeout!: any;
  private idleTime = 5 * 60 * 1000; // 5 minutes

  constructor(private router: Router, private ngZone: NgZone) {}

  startWatching() {
    this.resetTimer();

    window.addEventListener('mousemove', () => this.resetTimer());
    window.addEventListener('keydown', () => this.resetTimer());
    window.addEventListener('click', () => this.resetTimer());
  }

  resetTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.logout();
    }, this.idleTime);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

