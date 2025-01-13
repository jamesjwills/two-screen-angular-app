import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-cat-image',
  standalone: true,
  imports: [HttpClientModule, RouterModule, NgIf],
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

  api_key: string = `live_oV30uAAhIprX4Lkg1LSUl5DWEMm4F7J1YKoxRasDEXZmPtrhVzliPFQIqJsFd5Iu`;
  base_url: string = `https://api.thecatapi.com/v1/images/search`;
  image_url = `${this.base_url}?api_key=${this.api_key}`;

  /**
   * Fetches a cat image from the API.
   * Updates the `image_url` property with the fetched image URL.
   */
  fetchCatImage() {
    this.httpClient
      .get<any>(this.image_url, { responseType: 'json' })
      .subscribe((response) => {
        this.image_url = response[0].url;
      });
  }

  /**
   * Creates an instance of CatImageComponent.
   * @param userService - The user service for managing user data.
   * @param httpClient - The HTTP client for making API requests.
   */
  constructor(
    private userService: UserService,
    private httpClient: HttpClient
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
}
