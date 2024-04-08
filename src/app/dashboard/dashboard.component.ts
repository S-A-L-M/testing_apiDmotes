import { AfterViewInit, Component, Inject } from '@angular/core';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {

  title = 'Dashboard';

  constructor(private _signinService: SigninService){}

  ngAfterViewInit() {
    this.initializeSidebarToggle();
  }

  initializeSidebarToggle() {
    const sidebarToggle = document.querySelector('#sidebar-toggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () => {
        const sidebar = document.querySelector('#sidebar');
        if (sidebar) {
          sidebar.classList.toggle('collapsed');
        }
      });
    }
  }
  logout() {
    this._signinService.logout();
  }
}
