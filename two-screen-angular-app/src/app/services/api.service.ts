import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
  private _image_url = new BehaviorSubject<string>('');
  image_url$ = this._image_url.asObservable();
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
        this._image_url.next(response[0].url);
      });
  }
}
