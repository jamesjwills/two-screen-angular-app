import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-arithmetic-question',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './arithmetic-question.component.html',
  styleUrl: './arithmetic-question.component.css',
})
/**
 * Represents a component for arithmetic questions.
 */
export class ArithmeticQuestionComponent implements OnInit {
  title: string = `Test Your Addition!`;
  numberIncorrectAnswers: number = 0;
  answer: number = 0;
  question: string = ``;
  isSubmitted: boolean = false;
  userAnswer: number = NaN;
  messageWhenCorrect: string = `Well done! You got it right! Click the button to see your reward!`;
  messageWhenIncorrect: string = `boooooooo you're wrong. Try again!`;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.generateRandomQuestion();
    this.isSubmitted = false;
    this.userAnswer = NaN;
    this.userService.setIsCorrect(false);
    this.numberIncorrectAnswers = 0;
  }

  /**
   * Generates a random integer between 1 and 10.
   * @returns A random integer.
   */
  getRandomInt() {
    return Math.floor(Math.random() * 10 + 1);
  }

  /**
   * Generates a random arithmetic question.
   */
  generateRandomQuestion() {
    const firstNumber = this.getRandomInt();
    const secondNumber = this.getRandomInt();
    const answer = firstNumber + secondNumber;
    this.answer = answer;
    const question = `${firstNumber} + ${secondNumber}`;
    this.question = question;
  }

  /**
   * Checks if the user's answer is correct.
   * @param userAnswer - The user's answer.
   * @returns True if the answer is correct, false otherwise.
   */
  isAnswerCorrect(userAnswer: number): boolean {
    return userAnswer === this.answer;
  }

  /**
   * Handles the form submission.
   * @param userAnswer - The user's answer.
   * @param answerForm - The answer form.
   * disables form if userAnswer true
   * resets form if userAnswer false
   */
  onSubmit(userAnswer: number, answerForm: any) {
    if (this.isAnswerCorrect(userAnswer)) {
      this.userService.setIsCorrect(true);
      this.userService.setAnswer(this.answer);
      this.userService.setUserAnswer(userAnswer);
      answerForm.resetForm();
      answerForm.form.controls['userAnswer'].disable();
    } else {
      this.userService.setIsCorrect(false);
      this.generateRandomQuestion();
      answerForm.resetForm();
      this.numberIncorrectAnswers++;
    }
    this.isSubmitted = true;
  }

  /**
   * Gets the correctness of the user's answer.
   * @returns True if the user's answer is correct, false otherwise.
   */
  getIsCorrect(): boolean {
    return this.userService.getIsCorrect();
  }
}
