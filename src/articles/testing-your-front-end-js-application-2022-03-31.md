---
slug: testing-your-front-end-js-application
title: Testing your Front-end JS application
subtitle: Testing your JS application - a (not so) simple and (not so) short guide and resource map
date: 2022-03-31T11:38:14.158Z
unsplashId: f77Bh3inUpE
excerpt: This guide will give you a lot of references and links to material,
  which you should go and analyze, learn and consume on your own. This guide
  will not give you direct answers about what and why to do, on syntax or on how
  to configure testing in your project
  
---

## Introduction

After different discussions and thoughts I had a feeling that the test suits I’m writing weren’t the best. And guess what - they totally were not! Speaking and concentrating on words like “unit testing” & “code coverage” were probably the main reasons to be here, but whatever - you should be ready to know that you don’t know stuff. That’s why I created this article/guide to group and keep some resources and notes on the general topic of JS testing. You will see that I’m mainly referencing “Integration/Component” testing, as this is the main point I needed to show to colleagues and coworkers. 

If you’re completely new to testing - check what unit, integration and end to end testing is so you can differentiate what I have gathered here. Probably also going through the docs of Jest like  <https://jestjs.io/docs/setup-teardown> will help or any other course from the more resources here, at the end of the article. Also some notes on code coverage: [What is a branch in code coverage for JavaScript unit testing](https://stackoverflow.com/questions/35034977/what-is-a-branch-in-code-coverage-for-javascript-unit-testing) &  [Code coverage](https://en.wikipedia.org/wiki/Code_coverage).

- - -

## What is this?

In short - I went through 20 or so articles on the topic of testing from [kentcdodds' blog](https://kentcdodds.com/blog?q=testing) and other places and gatherd those here for future references and for other to use this as a starting point. I will link most of these with some excerpts to outline and share important concepts. I would advise you to go through all of these too.

This guide will give you a lot of references and links to material, which you should go and analyze, learn and consume on your own. This guide will not give you direct answers about what and why to do, on syntax or on how to configure testing in your project.

⚠️ These materials are targeted to be universal - even if you see "React", "Vue", "Angular" or whatever framework in the title, this doesn't mean that it's something you should pass - the underlying idea of testing is the same, as are generally the assertions (rules) that we use and the overall methodology, architecture and syntax. ⚠️

- - -

## TL;DR

The overall notion is that when we're testing components or views, we should test them like the end-user that will be using them. This really looks like e2e testing, but there are differences - working with mocked data, executing the tests in virtual dom (jsdom) instead of real browser, not calling our BE services, etc. We will be calling this "integration" testing. (integration is in quotes as the descriptions are quite fuzzy here).

So what we want is to create "integration" tests - clicking all over our app, but in a virtual environment, that's faster and more concise than a browser (e2e). We can still keep writing "unit" tests, but those are directed to things like utility functions, pure functions, http call wrappers, simple dummy components, etc., not bigger components, views, pages, etc.

> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/kentcdodds/status/977018512689455106)

- - -

## What exactly should I test? - Excerpts and links

> [Think less about the code you are testing and more about the use cases that code support](https://kentcdodds.com/blog/how-to-know-what-to-test)

#### [📗 Static vs Unit vs Integration vs E2E Testing for Frontend App](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests)

Integration

The test below renders the full app. This is NOT a requirement of integration tests and most of my integration tests don't render the full app. They will however render with all the providers used in my app (that's what the render method from the imaginary "test/app-test-utils" module does). The idea behind integration tests is to mock as little as possible. I pretty much only mock:

1. Network requests (using [MSW](https://mswjs.io/))
2. Components responsible for animation (because who wants to wait for that in your tests?

pure functions are the BEST for unit testing and I LOVE using jest-in-case for them!

#### [📗 Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)

[Why is testing implementation details bad?](https://kentcdodds.com/blog/testing-implementation-details#why-is-testing-implementation-detailsbad)

There are two distinct reasons that it's important to avoid testing implementation details. Tests which test implementation details:

1. Can break when you refactor application code. False negatives
2. May not fail when you break application code. False positives

[So... What are implementation details then?](https://kentcdodds.com/blog/testing-implementation-details#so-what-are-implementation-detailsthen)

Implementation details are things which users of your code will not typically use, see, or even know about.

"Who is the user of this code." Well, the end user who will be interacting with our component in the browser is definitely a user. They'll be observing and interacting with the rendered buttons and contents. But we also have the developer who will be rendering the accordion with props (in our case, a given list of items). So React components typically have two users: end-users, and developers. End-users and developers are the two "users" that our application code needs to consider.

This is precisely what the [React Testing Library](https://github.com/testing-library/react-testing-library) test does. We give it our own React element of the Accordion component with our fake props, then we interact with the rendered output by querying the output for the contents that will be displayed to the user (or ensuring that it wont be displayed) and clicking the buttons that are rendered.

So how do you avoid testing implementation details? Using the right tools is a good start. Here's a process for how to know what to test. Following this process helps you have the right mindset when testing and you will naturally avoid implementation details:

1. What part of your untested codebase would be really bad if it broke? (The checkout process)
2. Try to narrow it down to a unit or a few units of code (When clicking the "checkout" button a request with the cart items is sent to /checkout)
3. Look at that code and consider who the "users" are (The developer rendering the checkout form, the end user clicking on the button)
4. Write down a list of instructions for that user to manually test that code to make sure it's not broken. (render the form with some fake data in the cart, click the checkout button, ensure the mocked /checkout API was called with the right data, respond with a fake successful response, make sure the success message is displayed).
5. Turn that list of instructions into an automated test.

#### [📗 Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)

I've heard managers and teams mandating 100% code coverage for applications. That's a really bad idea. The problem is that you get diminishing returns on your tests as the coverage increases much beyond 70% (I made that number up... no science there). Why is that? Well, when you strive for 100% all the time, you find yourself spending time testing things that really don't need to be tested. Things that really have no logic in them at all (so any bugs could be caught by ESLint and Flow). Maintaining tests like this actually really slow you and your team down.

It doesn't matter if your component `<A />` renders component `<B />` with props c and d if component `<B />` actually breaks if prop e is not supplied. So while having some unit tests to verify these pieces work in isolation isn't a bad thing, it doesn't do you any good if you don't also verify that they work together properly. And you'll find that by testing that they work together properly, you often don't need to bother testing them in isolation.

Integration tests strike a great balance on the trade-offs between confidence and speed/expense. This is why it's advisable to spend most (not all, mind you) of your effort there.

#### [📗 Common Testing Mistakes](https://kentcdodds.com/blog/common-testing-mistakes)

[Mistake Number 1: Testing Implementation Details](https://kentcdodds.com/blog/common-testing-mistakes#mistake-number-1-testing-implementation-details)

I harp on this a lot ([read more](https://kentcdodds.com/blog/testing-implementation-details)). It's because it's a huge problem in testing and leads to tests that don't give nearly as much confidence as they could. Here's a very simple example of a test that's testing implementation details:

#### [📗 Making your UI tests resilient to change](https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change)

[So how do we write resilient selectors?](https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change#so-how-do-we-write-resilient-selectors)

Given that ["the more your tests resemble the way your software is used, the more confidence they can give you"](https://twitter.com/kentcdodds/status/977018512689455106), it would be wise of us to consider the fact that our users don't care what our class names are.

So, let's imagine that you have a manual tester on your team and you're writing instructions for them to test the page for you. What would those instructions say?

1. get the element with the class name username-field
2. ...

"Wait," they say. "How am I going to find the element with the class name username-field?"

"Oh, just open your devtools and..."

"But our users wont do that. Why don't I just find the field that has a label that says username?"

"Oh, yeah, good idea."

This is why [Testing Library](https://testing-library.com) has the queries that it does. The queries help you to find elements in the same way that users will find them. These queries allow you to find elements by their [role](https://testing-library.com/docs/dom-testing-library/api-queries#byrole), [label](https://testing-library.com/docs/dom-testing-library/api-queries#bylabeltext), [placeholder](https://testing-library.com/docs/dom-testing-library/api-queries#byplaceholdertext), [text contents](https://testing-library.com/docs/dom-testing-library/api-queries#bytext), [display value](https://testing-library.com/docs/dom-testing-library/api-queries#bydisplayvalue), [alt text](https://testing-library.com/docs/dom-testing-library/api-queries#byalttext), [title](https://testing-library.com/docs/dom-testing-library/api-queries#bytitle), [test ID](https://testing-library.com/docs/dom-testing-library/api-queries#bytestid).

That's actually in the order of [recommendation](https://testing-library.com/docs/guide-which-query). There certainly are trade-offs with these approaches, but if you wrote out instructions for a manual tester using these queries, it would look something like this:

1. Type a fake username in the input labeled username
2. Type a fake password in the input labeled password
3. Click on the button that has text sign in

#### [📗 Write fewer, longer tests](https://kentcdodds.com/blog/write-fewer-longer-tests)

Many people read that list of requirements for a component and turn those into individual test cases. Maybe you've read about a so-called "only one assertion per test best practice." Let's give that a try:

```js

  it('should show a loading spinner', () => {
    utils = render(<Course courseId={courseId} />)
    expect(utils.getByRole('alert')).toHaveTextContent(/loading/i)
  }

  it('should call the getCourseInfo function properly', () => {
    expect(getCourseInfo).toHaveBeenCalledWith(courseId)
  })

  it('should render the title', async () => {
    expect(await utils.findByRole('heading')).toHaveTextContent(title)
  })

```

I definitely recommend against this approach to testing. There are a few problems with it:

1. The tests are not at all isolated (read [Test Isolation with React](https://kentcdodds.com/blog/test-isolation-with-react))
2. Mutable variables are shared between tests (read [Avoid Nesting when you're Testing](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing))
3. Asynchronous things can happen between tests resulting in you getting act warnings (for this particular example)

Think of a test case workflow for a manual tester and try to make each of your test cases include all parts to that workflow. This often results in multiple actions and assertions which is fine.

#### 📗 More really good (important) articles from Kent’s blog:

* [How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test)
* [When I follow TDD](https://kentcdodds.com/blog/when-i-follow-tdd)
* [Test Isolation with React](https://kentcdodds.com/blog/test-isolation-with-react)
* [Why I Never Use Shallow Rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)

### Render/Mount - Normal vs Shallow

[Deep vs Shallow Rendering in Vue.js Tests](https://vuedose.tips/deep-vs-shallow-rendering-in-vuejs-tests)

[Hybrid Rendering: the secret way to smoothly test Vue.js components](https://vuedose.tips/hybrid-rendering-the-secret-way-to-test-components-in-vuejs)

Deep Rendering - Deep rendering, as the name states, renders all component tree given a root component.

Shallow Rendering - Opposite to deep rendering, shallow rendering only renders the component that you're testing without going into deeper levels.

### Mocking

In vitest (alternative of Jest for Vite) there’s a pretty good guide on [mocking](https://vitest.dev/guide/mocking.html). Vitest supports fully jest syntax, so just remember vi === jest in those docs.

## More resources

* [What Is Integration Testing](https://www.youtube.com/watch?v=kRD6PA6uxiY)
* [Series: Unit testing in Javascript (fun fun function)](https://www.youtube.com/playlist?list=PL0zVEGEvSaeF_zoW9o66wa_UCNE3a7BEr)
* [Course: JavaScript Testing Introduction Tutorial - Unit Tests, Integration Tests & e2e Tests](https://www.youtube.com/watch?v=r9HdJ8P6GQI)
* [Course: Testing JavaScript with Jest (What’s Jest, snapshot, watch, etc.) Kent  C Dodds ](https://egghead.io/courses/testing-javascript-with-jest-a36c4074)
* [Course: Intro To JavaScript Unit Testing & BDD (2 Hour+ Course)](https://www.youtube.com/watch?v=u5cLK1UrFyQ)
* [Talk: What We Can Learn About Testing From The Wheel](https://www.youtube.com/watch?v=Da9wfQ0frGA&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
* [Talk: Kent C. Dodds – Write tests. Not too many. Mostly integration.](https://www.youtube.com/watch?v=Fha2bVoC8SE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

## React resources

(again - the underlying logic and methods are the same)

* [Course: Net Ninja React Testing Library Tutorial](https://www.youtube.com/watch?v=7dTTFW7yACQ)
* [Adding tests to a React Application (and building an accessible star rating component)](https://www.youtube.com/watch?v=2rmUyzN4J38)
* [Adding tests to a React Application (part 2... for real this time)](https://www.youtube.com/watch?v=sqCikjna2Lg)
* [Testing a Multi-Page form](https://www.youtube.com/watch?v=9xaJ78qEJCM)
* [Testing a Multi-Page form part 2](https://www.youtube.com/watch?v=I0dYO2JMUmQ)
* [Testing a React component that uses useContext](https://www.youtube.com/watch?v=3yiialslPbc)
* [Livestream: Writing tests for a React app](https://www.youtube.com/watch?v=knQR1oHMQFA)
* [Livestream: Integration testing a React App](https://www.youtube.com/watch?v=pcFUAvoqiaQ)
* [Ask Me Anything about Testing](https://www.youtube.com/watch?v=T5q0uUPw3uQ)

</p>

<route>
{
  meta: {
    layout: 'blogpost'
  }
}
</route>