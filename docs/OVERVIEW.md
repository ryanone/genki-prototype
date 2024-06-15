# Summary

This document provides history regarding the creation of this codebase, areas of improvement it aims to potentially solve with existing solutions, architectural overview, and future direction.

# Overview and Areas of Improvement

In 2018, Seth Clydesdale started implementation of a web app that would contain the exercises from the series of books "Genki: An Integrated Course in Elementary Japanese", volumes 1 and 2. In 2022, a similar web app was created for the book "Tobira: Gateway to Advanced Japanese".

The code for these two web applications are contained in 2 separate codebases:

* [SethClydesdale/genki-study-resources](https://github.com/SethClydesdale/genki-study-resources)
* [SethClydesdale/tobira-study-resources](https://github.com/SethClydesdale/tobira-study-resources)

There's an opportunity to save on maintenance costs by creating an application where the data for each book and exercise is _completely data-driven_. This will result in creating less HTML files, speed up time to create exercises for new books if desired, and make it easier to test changes to the codebase. This codebase serves as a proposed prototype for where the future direction of the applications can go, based on the feedback of the BDFL of the current web apps.



# Architecture and Implementation

## Running the application

This prototype is implemented with Vite and React. To run the app, install dependencies by running `npm install` and then run `npm run dev` to run the app locally. You can then open a browser pointing to the URL indicated by the Terminal

## Routes

In this application, there are 3 routes defined:

* `/` - This is the root route and simply shows a link to the root page for the Genki 3rd edition book. The current we applications do not have an equivalent route to this.
* `/genki-3` - This is the root route for the Genki 3rd edition book. On this route, there are links to exercises for this book, similar to [this link](https://sethclydesdale.github.io/genki-study-resources/lessons-3rd/).
  * This arrangement can be expanded to support other books. For example, `/genki-2` can be used for the Genki 2nd edition book, and `/tobira` can be used for the Tobira book.
* `/genki-3/lesson/0/exercise/greetings-1` - This is the page for the `Greetings (p. 32)` exercise. This route renders the exercise based on supported render modes (ex. Drag and Drop, Multiple Choice, etc.).
  * There's another exercise implemented, available at `/hiragana-1`

Generally speaking, the route URLs are actually defined as follows:

* `/` - Root route
* `/[bookId]` - Root route for a specific book
* `/[bookId]/lesson/[lessonId]/exercise/[exerciseId]` - Route for rendering a specific exercise

Each route is data-driven by JSON files in the `/src/data/..` directory, which will be detailed in the next section.

## Data-driven Routes

For each route, its data is powered by files in the `/src/data/..` directory.

* `/` - This route is actually just completely static.
* `/[bookId]` - This route's data comes from `/src/data/genki-3/index.json`. This file defines all of the lessons for the Genki, 3rd edition book. However, the list of exercises for each lesson are defined in files in the `/src/data/genki-3/lessons` directory. For example

```
// /src/data/genki-3/index.json
{
  "title": "Genki Study Resources",
  "description": "3rd Edition",
  "id": "genki-3",
  "lessons": [
    {
      "title": "Lesson 0: Writing System, Greetings and Numbers (p. 20-35)",
      "id": "0",
      "exercisesId": "lesson-0"
    }
  ]
}
```

For Lesson 0, the `exerciseId` is `"lesson-0"`. This means there should be a JSON file called `"lesson-0.json"` in the `/src/data/genki-3/lessons` directory:


```
// /src/data/genki-3/lessons/lesson-0.json
{
  "exercises": [
    {
      "title": "Hiragana (p. 20-21)",
      "id": "hiragana-1"
    },
    {
      "title": "Greetings (p. 32)",
      "id": "greetings-1"
    }
  ]
}
```

The list of exercises for Lesson 0 are defined here.


* `/[bookId]/lesson/[lessonId]/exercise/[exerciseId]` - This route's data comes from a JSON file in `/src/data/genki-3/exercises`


# Future Direction

UX for creating new exercises and saving them
Validate new exercise data like unit tests
Linting during development of exercise data and the ability interactively test it out
Theming based on book