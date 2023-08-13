import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'player', pathMatch: 'full' },
  { path: 'player', loadChildren: () => import('./player/player.module').then(m => m.PlayerModule) },
  { path: 'alert', loadChildren: () => import('./alert/alert.module').then(m => m.AlertModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
