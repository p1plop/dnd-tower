import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { RegisterComponent } from './components/register/register.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { CharacterSpellsComponent } from './components/character-spells/character-spells.component';


const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [LoggedOutGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'registration', component: RegisterComponent, canActivate: [LoggedOutGuard]},
  { path: 'characters', component: CharactersListComponent, canActivate: [LoggedInGuard]},
  {
    path: 'character/:id',
    canActivate: [LoggedInGuard],
    children: [
      { path: 'spells', component: CharacterSpellsComponent },
      { path: '', component: CharacterSheetComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
