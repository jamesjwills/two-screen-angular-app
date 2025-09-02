import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatImageComponent } from './cat-image/cat-image.component';
import { ArithmeticQuestionComponent } from './arithmetic-question/arithmetic-question.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatImageComponent, ArithmeticQuestionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'Test Your Addition';
}
