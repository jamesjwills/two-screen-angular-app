import { Routes } from '@angular/router';
import { ArithmeticQuestionComponent } from './arithmetic-question/arithmetic-question.component';
import { CatImageComponent } from './cat-image/cat-image.component';

export const routes: Routes = [
  { path: '', component: ArithmeticQuestionComponent },
  { path: 'cat-image', component: CatImageComponent }
];
