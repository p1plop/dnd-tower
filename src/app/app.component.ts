import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/google_logo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'abjuration',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/abjuration.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'conjuration',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/conjuration.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'divination',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/divination.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'enchantment',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/enchantment.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'evocation',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/evocation.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'illusion',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/illusion.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'necromancy',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/necromancy.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'transmutation',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/transmutation.svg')
    );
  }
}
