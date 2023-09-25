import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthDataService } from 'src/app/shared/data-services/services/auth.data.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private authSub: any;

  constructor(private authService: AuthDataService) {}

  ngOnInit() {
    this.authSub = this.authService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
      }
    );
  }

  onLogout() {
    this.authSub = this.authService.logout();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
