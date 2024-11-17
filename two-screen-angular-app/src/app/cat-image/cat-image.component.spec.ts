import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatImageComponent } from './cat-image.component';
import { UserService } from '../services/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { provideRouter } from '@angular/router'; // Updated import

describe('CatImageComponent', () => {
  let component: CatImageComponent;
  let fixture: ComponentFixture<CatImageComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let httpMock: HttpTestingController;

  // Mock values for UserService observables
  const mockIsCorrect$ = new BehaviorSubject<boolean>(false);
  const mockAnswer$ = new BehaviorSubject<number>(42);
  const mockUserAnswer$ = new BehaviorSubject<number>(42);

  // Mock cat API response
  const mockCatApiResponse = [{
    url: 'https://example.com/cat.jpg',
    id: '1',
    width: 500,
    height: 500
  }];

  beforeEach(async () => {
    // Create spy object for UserService
    const spy = jasmine.createSpyObj('UserService', [], {
      isCorrect$: mockIsCorrect$,
      answer$: mockAnswer$,
      userAnswer$: mockUserAnswer$
    });

    await TestBed.configureTestingModule({
      imports: [
        CatImageComponent,
        HttpClientTestingModule,
        provideRouter([])
      ],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatImageComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title).toBe(`Here's a cat!`);
    expect(component.isCorrect).toBeFalse();
    expect(component.answer).toBe(0);
    expect(isNaN(component.userAnswer)).toBeTrue();
  });

  it('should fetch cat image on init', () => {
    fixture.detectChanges(); // Trigger ngOnInit

    const req = httpMock.expectOne((request) => 
      request.url.startsWith('https://api.thecatapi.com/v1/images/search')
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCatApiResponse);

    expect(component.image_url).toBe(mockCatApiResponse[0].url);
  });

  it('should update values when UserService observables emit', () => {
    fixture.detectChanges(); // Trigger ngOnInit

    // Test isCorrect$ subscription
    mockIsCorrect$.next(true);
    expect(component.isCorrect).toBeTrue();

    // Test answer$ subscription
    mockAnswer$.next(10);
    expect(component.answer).toBe(10);

    // Test userAnswer$ subscription
    mockUserAnswer$.next(15);
    expect(component.userAnswer).toBe(15);
  });

  it('should handle API errors gracefully', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne((request) => 
      request.url.startsWith('https://api.thecatapi.com/v1/images/search')
    );
    req.error(new ErrorEvent('Network error', { message: 'Network error' }));

    // The image_url should remain unchanged
    expect(component.image_url).toContain('api.thecatapi.com');
  });

  it('should unsubscribe from observables on destroy', () => {
    fixture.detectChanges();
    const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
    
    component.ngOnDestroy();
    
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should display correct template values', () => {
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(component.title);
    expect(compiled.querySelector('.rewards__message')).toBeTruthy();
    expect(compiled.querySelector('.rewards__image')).toBeTruthy();
    expect(compiled.querySelector('img')).toBeTruthy();
    expect(compiled.querySelector('a')).toBeTruthy();
  });
});
