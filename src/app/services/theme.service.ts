import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  get currentTheme() {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light-theme';
  }

  setTheme(name: string) {
    localStorage.setItem('theme', name);
  }
}
