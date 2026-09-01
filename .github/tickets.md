# Spam Project Tickets

This file contains all the tickets/issues for the Spam project. Update this file with your tickets, and then ask Claude to create the project board from this file.

## Ticket Format

Each ticket should include:

- Title
- Description/Body
- Labels (comma-separated)
- Priority (P1, P2, P3)
- Size (S, M, L)

---

## Backlog Tickets

### Replace Sarah Spamalot!#1

**Description:**
Front End: Replace the fake logged in user “sarah-spamalot” with authenticated user info.
Write some code in the components/Nav/LoginButton.tsx so you can render the actual user.
Read the TODO comments in that component, AND the Authenticated.tsxcomponent to fulfill these details.

TIP: check out the jwt-auth challenge for reference, if you get stuck!

Test Login: You can use our example user details to test Logging in to the SPAM site, or make your own by Signing Up!
Example user login details:

email= fakeuser@example.org

password= fakeUser5000!

This ticket is connected to issue #2 —after you finish this ticket, please move on to that issue.

**Labels:** auth0, frontend

**Priority:** P1

**Size:** S

---

### Verify user name renders correctly after Auth0 login #2

**Description:**
Write a front-end test to confirm that when a user logs in via Auth0, the correct user name is rendered on the page.

Acceptance Criteria:

Simulate a login using Auth0 in the front end

After successful authentication, check that the displayed name matches the Auth0 user’s profile

The test should fail if the user name is missing or incorrect

Useful resource:
https://miro.com/app/board/uXjVJE4M2P8=/?moveToWidget=3458764647642243322&cot=14

Depends on:
#1

**Labels:** frontend, test, auth0, software quality

**Priority:**

**Size:**

---

### Style the About page #3

**Description:**
**The About page needs styling!**
Our designer has provided some helpful screenshots of how the About page should look. Your task is to style the About page to replicate the design shown in these screenshots.

The SPAM website uses [Tailwind CSS](https://tailwindcss.com/), a useful styling framework which allows you to style your components inline rather than using a separate CSS file.

Tailwind has all the same properties and attributes as native CSS, however the syntax can be quite different.

NOTE: For this ticket, you do not need to modify the placeholder content. Leave it as it is.

---

**Pro tips:**

- Read the [Tailwind docs](https://tailwindcss.com/docs/installation) thoroughly! They're extremely helpful.
- Check out the `tailwind.config.js` file at the root of the codebase. It contains preset colours and fonts which you'll need to use in your styling. [This page in the docs](https://tailwindcss.com/docs/adding-custom-styles) may be useful.
- We have provided screenshots of how the About page should look. Consult these carefully, they are your reference point!

This ticket is connected to issue #4 —after you finish this ticket, please move on to that issue.

**Labels:** Tailwind CSS, frontend

**Priority:**

**Size:**

---

### Verify About Page CSS Styling with a Frontend Test #4

**Description:**
The About page has already been styled according to the provided screenshots.

Write and implement at least one passing frontend test to confirm that the About page’s Tailwind CSS styling renders as "described in the designer’s screenshots".

**Acceptance Criteria:**
The test should fail if the expected styling is missing or incorrect.

Depends on:
#3

**Labels:** Tailwind CSS, frontend, software quality, test

**Priority:**

**Size:**

---

### Render real data on About page #5

**Description:**
Right now the About page content is all placeholder, including some lovely SPAM Ipsum text. Your task is to replace this fake data with the real About page content, which is currently stored in the database. You'll need to write a client-side function to fetch data from the server, and then use ReactQuery to render it in the About page.

---

Pro tips:

- The backend functionality has been completed for you. Test out these API endpoints in Postman: `api/v1/about/text` and `api/v1/about/images`
- Check out the `client/hooks` folder in the codebase. Note how the ReactQuery functionality is being contained inside these custom hooks, which are then called in the `Pages`. Ensure your code conforms to this layout convention.

- Take a look at the `models` folder for some TypeScript interfaces you can use.

_This ticket is connected to issue #6—after you finish this ticket, please move on to that issue._

**Labels:** frontend

**Priority:**

**Size:**

---

### Frontend Integration Test for About Page Data Fetching #6

**Description:**
Write and implement at least one frontend integration test to verify that real About page content is correctly fetched from the backend and rendered on the About page via ReactQuery.

**Acceptance Criteria:**

- At least one automated integration test passes, confirming that the rendered content matches what is provided by the API.

- Test should fail if placeholder content is displayed or if the About page does not update with real data.

- For testing examples, [check out this code from class](https://github.com/raumati-2026/code-from-class/blob/main/unit3-async-apis-useQuery/4-testing-react-query/client/components/__tests__/Sharks.test.tsx)

or
https://miro.com/app/board/uXjVGCFk3Zw=/?moveToWidget=3458764659204209870&cot=14
Depends on:
#5

**Labels:** software quality, test

**Priority:**

**Size:**

---

### Display the comments #7

**Description:**
As a user, when I go to Rate A Spam, and click a Spam flavour, I want to be able to see a list of comments for that spam flavour. There are already some seed data comments in the backend. Do a postman GET request to `/api/v1/comments/:spamId`to see what shape the data response is.

1. in the client folder, create an apiClient function e.g. fetchCommentsBySpamId() to make a get request to the backend route `api/v1/comments/:spamId` .
2. In the `/hooks/useComments.ts` file, make a custom hook in the hooks folder for useQuery to use that apiClient function.
3. Refactor the `/components/RateSpam/ListComments.tsx` component to get the data from our custom hook (make sure it’s passing the spamId from the client side routes params).
4. Render the data in the component- specifically the comments text and created-on (figure out how to turn this timestamp number into a more readable date/ time format)...

_This ticket is connected to issue #8 —after you finish this ticket, please move on to that issue._

**Labels:** frontend

**Priority:**

**Size:**

---

### Verify Comments Display on Rate A Spam Page for Specific spamId #8

**Description:**
Write an automated frontend test to check that, when navigating to /rate-spam/2/, the correct list of comments for spamId 2 is rendered.

The test should simulate visiting `/rate-spam/2/` and verify that the component displays the expected comments and their readable dates.

**Acceptance Criteria:**

- An automated frontend test passes, verifying that `/rate-spam/2/` displays the correct comments for spamId 2.

- Test fails if the expected comments data does not appear, or if placeholder/fake data is rendered.

---

Pro tips:

- To generate sample data for your test, refer to the backend seed data returned from /api/v1/comments/2.

Depends on:
#7

**Labels:** frontend, software quality, test

**Priority:**

**Size:**

---

### STRETCH: Display Commenter Name on Rate A Spam Page #9

**Description:**

Enhance the comments section on the Rate A Spam page by showing the name of the person who made each comment.

TIP: you may need to create a new database function to join the comments and the users table…

**Acceptance Criteria:**
Each comment listed on the Rate A Spam page shows the name of the person who made the comment, along with the text and readable date.

Depends on:
#7

**Labels:** backend, frontend

**Priority:**

**Size:**

---

### Add a comment! Authorized users only #10

**Description:**
We only want authorized users to be able to add a comment to a spam flavour.

In the `/hooks/useComments.ts` file, write a custom useMutation hook that calls the existing `addComment` function from the `apis/comments.ts` file.

Call your custom hook in the existing `AddComment.tsx` component. The form currently has no submit button — add one (`<button type="submit">`) and wire the form's `onSubmit` to your `handleSubmit`, so the mutation actually fires.

Tip: Make sure you use getAccessTokenSilently from useAuth0() to grab the token, you'll need to pass this token (and your form data), to the mutation function in your handleSubmit.

This ticket is connected to issue #11 —after you finish this ticket, please move on to that issue.

**Labels:** auth0, frontend

**Priority:**

**Size:**

---

### Simulate Authorized User Submitting a Comment on Rate A Spam #11

**Description:**
TEST: Write a test for simulating a user submitting a comment in the form, check that it is added to the database. Use the Week 6, testing lecture example in the code-from-class as a point of reference.
https://github.com/raumati-2026/code-from-class/blob/main/unit6-fullstack/2-mocking-auth-for-tests/client/components/__tests__/AddFruit.test.tsx

Depends on:
#10

**Labels:** auth0, test

**Priority:**

**Size:**

---

### Create an API endpoint for Quiz Results data #12

**Description:**
Your task is to create API endpoints on your server side which should return quiz results data in JSON format.
This will consist of:

- Querying the 'results' table by category - check `db/queries/quiz.ts`
- Writing server-side routes to retrieve this data in JSON format - check `routes/quiz.ts`

---

Pro tips:

- Take a look at the way the data is structured in the `db` and `models` folders.

This ticket is connected to issue #13 —after you finish this ticket, please move on to that issue.

**Labels:** backend

**Priority:**

**Size:**

---

### Backend Integration Test for Quiz Results API #13

**Description:**
Two integration tests have been pre-written in `server/routes/quiz.test.ts` and marked with `it.skip` — your job is to make them pass.

1. Implement ticket #12 so the route and db query are working
2. Remove the `.skip` from both tests and verify they go green
3. Write **at least 1 additional** integration test of your own for the quiz results route

Pro tips:

- Take a look at the way the data is structured in the `db` and `models` folders.
- Take a look at the code-from-class for Week 5, for examples of server-side integration tests. Make sure that you're testing both the route and the db query in your test.

Depends on:
#12

**Labels:** backend, test

**Priority:**

**Size:**

---

### Render Quiz results data on the Results page #14

**Description:**
Your task is to retrieve JSON data from the backend API endpoints, and render it on the frontend. You will mostly be working in `client/components/ResultsPage.tsx`

- Use an existing helper function to calculate the category that a user most associates with based on their quiz answers.
- Then write an api function in `apis/quiz` which uses that category to get its associated quiz result data from the backend.
- Writing **at least 1 x frontend integration test**

---

Pro tips:

- Take a look at the hardcoded data `ResultPage` component and their corresponding TypeScript interfaces in the `models` folder. This is your source of truth for the return shape of your data.
- If you're unable to retrieve data from the backend just yet, think about how you can handle this in your api functions. Maybe [Promise.resolve()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) could help with this?
- Take a look at the code-from-class for Week 3, Day 1 (PM) for frontend integration testing examples.

**Labels:** frontend

**Priority:**

**Size:**

---

### Make Ratings component #15

**Description:**
As a user, when I go to the Rate a Spam page, I want to see the average rating of each spam underneath the spam pictures.
If I click onto an individual spam, I should also see the average rating for that spam.
We currently have the custom hook and the apiClient written, check out `useAvgRatingById` hook in the `useRatings.ts`file. This uses the spamId for getting this info.
Your job is to work inside the `RatingAvg.tsx` component, and use useQuery to render the average rating data on the component.
To make the design/ UI of the rating, use this package from material UI: https://mui.com/material-ui/react-rating/
Ideally we would love a custom icon! Perhaps pink squares to represent SPAM? But if that is too hard, MVP is hearts.

TEST: Write a test to render the `/rate-spam` page, and make sure the ratings for one of the spams is what we expect (the same as from the database).

**Labels:** frontend, test

**Priority:**

**Size:**

---

### Backend - Add a Rating! #16

**Description:**
Create the backend POST route to allow authorized user to add a rating to a spam.
The database is already set up to support ratings. So spend some time looking at the ERD diagram, and see how the `ratings` table connects to the `users` and `spam` tables.

Create your POST route in the `/routes/ratings.ts` file. Have it send some data to the `addRating` database function in `db/spam.ts`

As a point of reference, check the POST route for comments (especially for the checkJWT middleware, and the auth0_id).

Tip: use Postman! Remember to generate a test bearer token!

TEST: Write a backend integration test for this POST route, make sure you get back what you expect.

**Labels:** backend, test

**Priority:**

**Size:**

---

### Backend - Delete Comments - user only! #17

**Description:**
In the backend, create a database function and a route for letting users delete a comment.
The CATCH?? Only the user who MADE the comment is authorized to delete it.

Check the POST route for reference of how to use the checkJwt middleware AND how to extract the auth0_id out of the header.

Otherwise, scope out how the `jwt-auth` challenge protected the delete fruits route in the backend.

Tip: use Postman!

TEST: Write a test for this delete route, make sure you get back what you expect.

**Labels:** backend, test

**Priority:**

**Size:**

---

### Make the app layout responsive #18

**Description:**
Currently the layout for the Spam site is desktop only (take a look in dev tools to see what it looks like in mobile view)

The yellow nav menu at the top of the site should be replaced with a "hamburger menu" (Spamburger?) when at mobile size.
Tip: Check out documentation for Tailwind CSS media queries to help you achieve this

**Labels:** Tailwind CSS, frontend

**Priority:**

**Size:**

---

### Add variable difficulty settings to the Snake game #19

**Description:**
There are 2 variables in Snake which can currently affect the game difficulty: speed, numOfObstacles.

Your task is to make those into dynamic variables which are controlled by a set of 2 sliders.

If you consider each slider to have 3 positions (easy, medium, hard), have the sliders default to medium.
Suggested values for the sliders:

- speed > easy: 200, med: 150, hard: 100
- obstacles > easy: 0, med: 3, hard: 5

Write a front end test to test the number of obstacles. This will entail simulating user events to set the sliders and click the "Play" button, then you can count the number of table cells which are obstacles.

**Labels:** frontend

**Priority:**

**Size:**

---

### STRETCH: Fan Picture Gallery - Backend (API + Storage) #20

**Description:**
Build the backend for a fan picture gallery feature, so users can eventually upload their own SPAM-related photos to share with the community. This ticket covers the database, storage, and API only — the gallery page and upload form are a separate ticket (see below).

**Requirements:**

- Create a database table to store image metadata (user_id, image_url, caption, upload_date)
- Create API endpoint `POST /api/v1/gallery` (authenticated) to handle image uploads
- Create API endpoint `GET /api/v1/gallery` to retrieve all gallery images
- Implement image upload handling — pick **one** storage approach:
  - **Cloudinary** — popular free tier, widely used in tutorials, built-in image transforms
  - **Supabase Storage** — generous free tier, S3-compatible, handy if you're already using Supabase elsewhere
- Only image files should be accepted (jpg, png, gif) and file size should be limited (e.g. max 5MB) — enforce this server-side regardless of which storage option you pick

**Testing:**
- Write backend integration test(s) for the image upload endpoint
- Test file upload validation (file size, file type)

**Acceptance Criteria:**
- Authenticated users can POST an image + optional caption and it's stored
- `GET /api/v1/gallery` returns all uploaded images with their metadata
- Only image files are accepted (jpg, png, gif) — non-image uploads are rejected
- Oversized files are rejected (e.g. max 5MB)

This ticket is connected to the frontend gallery ticket below — after you finish this ticket, please move on to that one.

**Labels:** backend, auth0

**Priority:** P3

**Size:** M

---

### STRETCH: Fan Picture Gallery - Frontend (Gallery Page + Upload Form) #21

**Description:**
Build the frontend for the fan picture gallery — a page where users can browse uploaded SPAM photos and upload their own. This depends on the backend gallery ticket (#20) already being done.

**Requirements:**

- Create a Gallery page component and register it at the `/gallery` route
- Build an upload form with image file input and optional caption
- Add image preview before upload
- Display all uploaded images in a responsive grid layout
- Show uploader name and date with each image
- Validate file type and size client-side too (jpg/png/gif, max 5MB) for fast feedback, in addition to the server-side checks from #20

**Testing:**
- Write frontend test(s) to verify the gallery page renders images correctly
- Test file upload validation (file size, file type) on the frontend

**Acceptance Criteria:**
- Authenticated users can upload SPAM-related photos from the Gallery page
- Uploaded photos appear in the community gallery
- Each photo displays who uploaded it and when
- Only image files are accepted (jpg, png, gif) — user gets a clear error otherwise
- File size is limited (e.g., max 5MB) — user gets a clear error otherwise

Depends on:
#20

**Labels:** frontend, auth0

**Priority:** P3

**Size:** M

---

### Fix comment date formatting (ms/seconds bug) + style the comments section #30

**Description:**
**The comments section needs a fix and a bit of polish!**

While testing the new "Add a comment" feature, we noticed the comment dates are rendering incorrectly. When a new comment is created, its `created_date` is saved using `Date.now()` (milliseconds), but `ListComments.tsx` formats it by multiplying by `1000` — as if it were already in seconds. That double-conversion pushes the displayed date way into the future for any newly created comment.

**Where to find `created_date`:**

- It's set in `server/db/queries/comments.ts`, inside the `createComment` function — look for this line:
  ```ts
  created_date: Date.now(),
  ```
- It's read back out in `client/components/RateSpam/ListComments.tsx`, where the comment date gets formatted:
  ```ts
  new Date(comment.created_date * 1000).toLocaleDateString(...)
  ```
  The `* 1000` here assumes `created_date` is in **seconds**, but `Date.now()` returns **milliseconds** — that mismatch is the bug.

On top of fixing that, the comments section itself is still very plain — this is a good chance to give it some basic styling love using Tailwind CSS.

1. In `server/db/queries/comments.ts`, fix the units of `created_date` in `createComment` so they're consistent with how `ListComments.tsx` expects to read them (seconds, not milliseconds).
2. In `client/components/RateSpam/ListComments.tsx`, double check the date formatting logic now renders correctly for both old (seed) comments and newly created ones.
3. Add some Tailwind styling to the comments list and each comment item — spacing, borders, font sizing, whatever makes it feel less like a plain bullet list. Check `tailwind.config.js` for the preset colours/fonts already used elsewhere in the app, and try to keep it consistent with the rest of the Rate A Spam page.

NOTE: You don't need to redesign the whole section — just clean up the date bug and make it visually consistent with the rest of the app.

**Pro tips:**

- Test by adding a brand new comment and confirming its date shows today's date, not a date far in the future.
- Check the existing seed data comments still display correctly after your fix — don't break what's already working.
- Read the [Tailwind docs](https://tailwindcss.com/docs/installation) if you need a refresher on utility classes.

**Labels:** frontend, Tailwind CSS

**Priority:** P1

**Size:** S

---

### Add validation and submit feedback to the Add Comment form #31

**Description:**
**Add some basic validation and feedback to the Add Comment form!**

Right now the "Add a comment" form on the Rate A Spam page will happily submit an empty comment, and gives the user no feedback while their comment is being saved (or if saving fails). Let's tighten that up.

1. In `client/components/RateSpam/AddComment.tsx`, update `handleSubmit` so it doesn't call `mutate(...)` if the comment is empty or just whitespace (e.g. check `newComment.trim()` before submitting).
2. `useAddComment()` (from `client/hooks/useComments.ts`) is built with React Query's `useMutation`, which already gives you `isPending` and `isError` out of the box. Use these in `AddComment.tsx` to:
   - Disable the submit button while the comment is being saved (`isPending`).
   - Show a simple error message if the submission fails (`isError`).
3. Bonus: clear the input field after a successful submission, so the user isn't left looking at their old comment text.

NOTE: This is about UX polish, not a redesign — a disabled button and a short text message are enough, no need to get fancy.

**Pro tips:**

- Try submitting an empty comment (or just spaces) before your fix, and confirm it's blocked after.
- You can simulate a failed submission by temporarily breaking the API URL, to check your error message shows up correctly.
- Check the [React Query docs on mutation status](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) if you want a refresher on `isPending`/`isError`.

**Labels:** frontend

**Priority:** P2

**Size:** S

---

### STRETCH: Let users edit their own comments #32

**Description:**
**STRETCH: Let users edit their own comments!**

Right now there's no way to edit a comment once it's been submitted — only adding (#10) and (eventually) deleting (#17) are covered. This ticket adds editing, but only for the comment's original author.

**Backend:**

1. In `server/db/queries/comments.ts`, add an `updateComment` function (next to `createComment`) that updates `comment_text` for a given comment `id`, and returns the updated row.
2. In `server/routes/comments.ts`, fill in the existing `router.patch('/:id', ...)` stub:
   - Protect it with the `checkJwt` middleware, same as the POST route.
   - Look up the comment first and check that `req.auth?.sub` matches the comment's `user_id` — if it doesn't match, return a `403 Forbidden`. We only want the original author to be able to edit their own comment.
   - If it matches, call your new `updateComment` function and return the updated comment.

**Frontend:**

3. In `client/apis/comments.ts`, add an `updateComment` function (alongside `addComment`) that sends a PATCH request to `/api/v1/comments/:id` with the new comment text and auth token.
4. In `client/hooks/useComments.ts`, add a `useUpdateComment` hook (a `useMutation`, similar to `useAddComment`) that calls your new `updateComment` function and invalidates the `['comments']` query on success.
5. In `client/components/RateSpam/ListComments.tsx`, add an "Edit" option next to each comment — but only show it if the logged-in user is the comment's author. Clicking it should let the user update the text and save their change using your new hook.

NOTE: Keep the UI simple — an inline input that swaps in when you click "Edit", with a "Save" button, is enough. No need for a modal or anything fancy.

**Pro tips:**

- Test that editing someone else's comment is blocked (you should get a 403, not a silent failure).
- The PATCH route pattern is almost identical to the existing POST route in `server/routes/comments.ts` — use that as your reference.
- `useAddComment` in `client/hooks/useComments.ts` is a good template for your `useUpdateComment` hook.

Depends on:
#10

**Labels:** frontend, backend

**Priority:** P3

**Size:** L

---

### Frontend - Let users delete their own comments #33

**Description:**
**Frontend - Let users delete their own comments!**

This is the frontend half of #17 — once the backend DELETE route exists, we need a way for users to actually trigger it from the UI.

1. In `client/apis/comments.ts`, add a `deleteComment` function (alongside `addComment`) that sends a DELETE request to `/api/v1/comments/:id` with the auth token.
2. In `client/hooks/useComments.ts`, add a `useDeleteComment` hook (a `useMutation`, similar to `useAddComment`) that calls your new `deleteComment` function and invalidates the `['comments']` query on success.
3. In `client/components/RateSpam/ListComments.tsx`, add a "Delete" button next to each comment — but only show it if the logged-in user is the comment's author (you'll need the `user` object from `useAuth0()` to compare against the comment's `user_id`).
4. Clicking "Delete" should call your new hook and remove the comment from the list once the backend confirms it's deleted.

NOTE: A simple confirmation (e.g. a native `window.confirm`) before deleting is a nice touch, but not required.

**Pro tips:**

- Test that you can't see a Delete button on comments made by other users.
- `useAddComment` in `client/hooks/useComments.ts` is a good template for your `useDeleteComment` hook.
- Check the Network tab to confirm the DELETE request is actually firing with the right comment id and auth header.

Depends on:
#17

**Labels:** frontend

**Priority:** P2

**Size:** S

---

### Add Gallery link to nav bar #40

**Description:**
Once #21 (Fan Picture Gallery - Frontend) has been implemented, the `/gallery` route won't be reachable from the site navigation — `Header.tsx`'s `menuItems` array doesn't include it, so users would only be able to find the gallery page by typing the URL directly.

NOTE: This ticket depends on #21 being done first — there's no `/gallery` route to link to until then.

**Acceptance Criteria:**
- "Gallery" link appears in both desktop and mobile nav
- Clicking it navigates to `/gallery`

**Pro tips:**

- In `client/components/Header/Header.tsx`, find the `menuItems` array:
  ```ts
  const menuItems = [
    { title: 'About', link: './about' },
    { title: 'Games', link: './games' },
    { title: 'Quiz', link: './quiz' },
    { title: 'Rate That Spam!', link: './rate-spam' },
  ]
  ```
  Add a `{ title: 'Gallery', link: './gallery' }` entry. This applies to both the desktop nav (`md:flex` list) and the mobile menu, since both render from the same `menuItems` array.

Depends on:
#21

**Labels:** frontend

**Priority:** P1

**Size:** S

---

### Style the Add Comment form #41

**Description:**
**The Add Comment form needs some visual polish!**

Right now the "Add a comment" input and submit button on the Rate A Spam page only have minimal placeholder styling (`rounded border border-spamBlue`). Your task is to give the form some proper styling using Tailwind CSS, consistent with the rest of the site.

NOTE: This is about visual styling only — the validation and submit-feedback logic from #31 should already be in place before you start, so you're styling the finished states (default, disabled/pending, error) rather than guessing at them.

1. In `client/components/RateSpam/AddComment.tsx`, style the form layout, input, and submit button using Tailwind utility classes.
2. Check `tailwind.config.js` for the preset colours and fonts already used elsewhere in the app, and keep the styling consistent with the rest of the Rate A Spam page.
3. Make sure the disabled/pending state (from #31) and any error message are visually clear, not just functionally present.

**Pro tips:**

- Read the [Tailwind docs](https://tailwindcss.com/docs/installation) if you need a refresher on utility classes.
- Look at how other components in the app (e.g. the nav, the comments list) use the app's design tokens for a consistent look.

Depends on:
#31

**Labels:** frontend, Tailwind CSS

**Priority:** P3

**Size:** S

---
