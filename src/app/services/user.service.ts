import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Service responsible for managing user-related data and behavior.
 */
export class UserService {
  private _isCorrect = new BehaviorSubject<boolean>(false);
  private _answer = new BehaviorSubject<number>(0);
  private _userAnswer = new BehaviorSubject<number>(NaN);

  constructor() {}

  /**
   * Observable that emits whether the user's answer is correct or not.
   */
  isCorrect$ = this._isCorrect.asObservable();

  /**
   * Observable that emits the correct answer.
   */
  answer$ = this._answer.asObservable();

  /**
   * Observable that emits the user's answer.
   */
  userAnswer$ = this._userAnswer.asObservable();

  /**
   * Sets the value of `isCorrect` property.
   * @param value - The new value for `isCorrect`.
   */
  setIsCorrect(value: boolean) {
    this._isCorrect.next(value);
  }

  /**
   * Sets the value of `answer` property.
   * @param value - The new value for `answer`.
   */
  setAnswer(value: number) {
    this._answer.next(value);
  }

  /**
   * Sets the value of `userAnswer` property.
   * @param value - The new value for `userAnswer`.
   */
  setUserAnswer(value: number) {
    this._userAnswer.next(value);
  }

  /**
   * Gets the current value of `isCorrect`.
   * @returns The current value of `isCorrect`.
   */
  getIsCorrect(): boolean {
    return this._isCorrect.value;
  }
}
