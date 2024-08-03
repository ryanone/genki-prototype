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

This prototype is implemented with Vite and React. To run the app, install dependencies by running `npm install` and then run `npm run dev` to run the app locally. You can then open a browser pointing to the URL indicated by the Terminal.

## Routes

In this application, there are 3 routes defined:

* `/` - This is the root route and simply shows a link to the root page for the Genki 3rd edition book. The current we applications do not have an equivalent route to this.
* `/genki-3` - This is the root route for the Genki 3rd edition book. On this route, there are links to exercises for this book, similar to [this link](https://sethclydesdale.github.io/genki-study-resources/lessons-3rd/).
  * This arrangement can be expanded to support other books. For example, `/genki-2` can be used for the Genki 2nd edition book, and `/tobira` can be used for the Tobira book.
* `/genki-3/lesson/0/exercise/greetings-1` - This is the page for the `Greetings (p. 32)` exercise. This route renders the exercise based on supported exercise types (ex. Drag and Drop, Multiple Choice, etc.).
  * There's another exercise implemented, available at `/hiragana-0`

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
      "id": "hiragana-0"
    },
    {
      "title": "Greetings (p. 32)",
      "id": "greetings-1"
    }
  ]
}
```

The list of exercises for Lesson 0 are defined here.

* `/[bookId]/lesson/[lessonId]/exercise/[exerciseId]` - This route's data comes from a JSON file in `/src/data/genki-3/exercises`. For example, with the "Hiragana (p. 20-21)" exercise, whose ID is `"hiragana-0"`, its data is defined in `/src/data/genki-3/exercises/hiragana-0.json`.

## Exercise JSON Format

This file defines the questions and answer choices for a given exercise. It also defines the supported exercise types (ex. DRAG_DROP, MULTIPLE_CHOICE). Currently only Drag & Drop and Multiple Choice are supported. The following are the properties of the exercise object:

* `types` - List of enums of exercise types
* `choices` - List of objects corresponding to possible answers. Each object contains a `content` property (human-readable answer) and an `id`, which is the unique identifier of the answer within the exercise.
* `questions` - List of objects corresponding to possible questions. Each object contains a `content `property (human-readable question) and a `choices` property, whose value is an object with a `correctId` property. The value of this property corresponds to the choice which is the correct answer for the question.

The following is a snippet from `/src/data/genki-3/exercises/hiragana
1.json`:

```
{
  "questions": [
    {
      "content": "わ",
      "choices": {
        "correctId": "1"
      }
    }
  ],
  "choices": [
    // "wa" is the correct Romaji for わ - the `correctId` is the same as this choice’s id
    {
      "content": "wa",
      "id": "1"
    }
  ]
}
```
### Meta

The `questions` and `choices` objects are structured independently of how they will be displayed. This is intentional, as an exercise can be displayed in any number of ways. However, there may be a need to explicitly define how an exercise should be rendered for a given exercise type. The `meta` object allows for this definition. In this object, for a given exercise type, we can define the instructions to render. For Drag and Drop, if you look at the `hiragana-0.json` file, we define how individual questions are rendered (`questionFlow`) and how the questions are arranged as a group (`questionsFlow`). We also define how many questions to render in each column (`configuration`). There will likely be a different options to specify based on exercise type.

The following is a snippet from `/src/data/genki-3/exercises/hiragana
1.json`:

```
{
  "meta": {
    "DRAG_DROP": {
      "supportedLayouts": ["HORIZONTAL"], // Only horizontal drag & drop mode is supported
      "instructions": "Drag the Kana to the matching Romaji. TIP: Click the kana to mark it, then click an empty field to drop the answer there.",
      "HORIZONTAL": {  // These values only apply to the horizontal drag & drop mode
        "questionsFlow": "VERTICAL",  // Each question should be laid out vertically (i.e. by column)
        "questionFlow": "HORIZONTAL", // Within each question, the content and click target
        "configuration": [
          // 3 questions go in the first column, then 5 questions in the second column, 3 in the third column, etc.
          3,
          5,
          3,
          5,
          5,
          5,
          5,
          5,
          5,
          5
        ]
      }
    }
  }
}
```

## Storybook Integration

To see each of the React components in action, [Storybook](https://storybook.js.org/) has been integrated with this repository. Run `npm run storybook` and open a browser to the specified URL to see the Storybook environment.

# Future Direction

This prototype is not meant to be proposal of any finalized approach, nor is it comprehensive in terms of its current feature set. Rather, the prototype is meant to serve as a discussion starting point. If we like the general approach or idea, the following are some ideas of how this concept can be expanded:

* Improve experience for creating new exercises
  * Create a UX that facilitates creating and modifying of exercises. The UX should allow users to define exercises and test them out in some sort of playground. The current applications already do this.
  * When a new exercise is added, its data should be validated against a schema, so as to ensure proper structure.
* Feature parity with the existing applications
