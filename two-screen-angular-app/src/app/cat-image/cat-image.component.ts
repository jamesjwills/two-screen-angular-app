import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cat-image',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cat-image.component.html',
  styleUrl: './cat-image.component.css',
})
/**
 * Represents the CatImageComponent class.
 * This component is responsible for displaying a cat image and managing user interactions.
 */
export class CatImageComponent implements OnInit, OnDestroy {
  title: string = `Here's a cat!`;
  isCorrect: boolean = false;
  answer: number = 0;
  userAnswer: number = NaN;
  private subscription: Subscription = new Subscription();
  image_url = '';

  /**
   * Creates an instance of CatImageComponent.
   * @param userService - The user service for managing user data.
   * @param apiService - The API service for fetching cat images.
   */

  constructor(
    private userService: UserService,
    private apiService: ApiService
  ) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Subscribes to user service observables and fetches a cat image.
   */

  ngOnInit(): void {
    // Subscribe to the isCorrect$ observable to get the latest value of isCorrect
    this.subscription.add(this.userService.isCorrect$.subscribe((value) => {
      this.isCorrect = value;
    }));

    // Subscribe to the answer$ observable to get the latest value of answer
    this.subscription.add(this.userService.answer$.subscribe((value) => {
      this.answer = value;
    }));

    // Subscribe to the userAnswer$ observable to get the latest value of userAnswer
    this.subscription.add(this.userService.userAnswer$.subscribe((value) => {
      this.userAnswer = value;
    }));

    // Subscribe to the image_url$ observable to get the latest value of image_url
    this.subscription.add(this.apiService.image_url$.subscribe((value) => {
      this.image_url = value;
    }));

    // Fetch a cat image
    this.fetchCatImage();
  }

  /**
   * Lifecycle hook that is called when the component is about to be destroyed.
   * Unsubscribes from observables to prevent memory leaks.
   */

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Fetches a cat image from the API.
   * Updates the `image_url` property with the fetched image URL.
   */

  fetchCatImage() {
    this.apiService.fetchCatImage();
  }
}
