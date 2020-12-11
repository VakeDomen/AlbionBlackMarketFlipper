import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlipperComponent } from './pages/flipper/flipper.component';

const routes: Routes = [{ path: '**', component: FlipperComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
