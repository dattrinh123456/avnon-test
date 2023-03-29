import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAnswerComponent } from './form-answer/form-answer.component';
import {FormComponent} from './form/form.component'
const routes: Routes = [
  {
    component: FormComponent,
    path:'form/builder'
  },
  {
    component: FormAnswerComponent,
    path:'form/answers'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
