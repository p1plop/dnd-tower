import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './components/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';

import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { MessageComponent } from './components/dialogs/message/message.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateCharacterComponent } from './components/dialogs/create-character/create-character.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { EditStatComponent } from './components/dialogs/edit-stat/edit-stat.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AvatarUploadComponent } from './components/dialogs/avatar-upload/avatar-upload.component';
import { CharacterSpellsComponent } from './components/character-spells/character-spells.component';
import { ViewSpellComponent } from './components/dialogs/view-spell/view-spell.component';
import { AddSpellComponent } from './components/dialogs/add-spell/add-spell.component';
import { ConfirmationComponent } from './components/dialogs/confirmation/confirmation.component';
import { BattleMapComponent } from './components/battle-map/battle-map.component';
import { EditMapUnitComponent } from './components/dialogs/edit-map-unit/edit-map-unit.component';
import { EditHpComponent } from './components/dialogs/edit-hp/edit-hp.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    LoginComponent,
    MessageComponent,
    CharactersListComponent,
    RegisterComponent,
    CreateCharacterComponent,
    CharacterSheetComponent,
    EditStatComponent,
    AvatarUploadComponent,
    CharacterSpellsComponent,
    ViewSpellComponent,
    AddSpellComponent,
    ConfirmationComponent,
    BattleMapComponent,
    EditMapUnitComponent,
    EditHpComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    DragDropModule,
    ScrollingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
