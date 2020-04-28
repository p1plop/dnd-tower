import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @HostBinding('class') componentCssClass;
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private overlayContainer: OverlayContainer
    ) {
      this.componentCssClass = themeService.currentTheme;
      this.overlayContainer.getContainerElement().classList.add(themeService.currentTheme);
    }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  changeTheme(event: MatSlideToggleChange) {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
       overlayContainerClasses.remove(...themeClassesToRemove);
    }
    if (event.checked) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
      this.componentCssClass = 'dark-theme';
      this.themeService.setTheme('dark-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.add('light-theme');
      this.componentCssClass = 'light-theme';
      this.themeService.setTheme('light-theme');
    }
  }

}
