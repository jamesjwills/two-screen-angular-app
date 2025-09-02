# TwoScreenAngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.

## Description

This is a two-screen Angular app that demonstrates a simple navigation flow between two screens, including routing, services, angular material components and API.

## Features

- Screen 1: This is the initial screen of the app. It displays a simple arithmetic question inviting the user to input an answer. If the answer is wrong, the form resets the form, regenerates the question, displays a message and increments a wrongAnswers counter by 1. If the answer is correct, the question remains visible, the form is disabled and a message and button appears inviting the user to claim a reward. This button leads to the second component. Clicking the button sets a boolean flag which toggles the visibility of the messages.
- Screen 2: This screen is displayed when the user clicks the button on the first screen. It displays the user's answer and the correct answer and fetches an image of a cute cat using an API. There is a routerLink to provide a way to go back to the first screen.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/TwoScreenAngularApp.git`
2. Navigate to the project directory: `cd TwoScreenAngularApp`
3. Install the dependencies: `npm install`

## Usage

1. Start the development server: `ng serve`
2. Open your browser and navigate to `http://localhost:4200`

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
