import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  title = 'Dashboard';
  isPostCollapsed = true; 

  ngAfterViewInit() {
    this.initializeSidebarToggle();
  }

  initializeSidebarToggle() {
    const sidebarToggle = document.querySelector("#sidebar-toggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        const sidebar = document.querySelector("#sidebar");
        if (sidebar) {
          sidebar.classList.toggle("collapsed");
        }
      });
    }
  }

  toggleRootClass() {
    const current = document.documentElement.getAttribute('data-bs-theme');
    const inverted = current == 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', inverted);
  }

  toggleLocalStorage() {
    if (this.isLight()) {
      localStorage.removeItem("light");
    } else {
      localStorage.setItem("light", "set");
    }
  }

  isLight() {
    return localStorage.getItem("light");
  }
}