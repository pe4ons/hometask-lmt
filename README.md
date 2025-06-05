# 1. Prepare and describe test cases.

Test case 1

Title: Successfully add a new observation

Steps:
  1. Open `New observation` form
  2. Enter `Riga, Latvia` for the `Location` input field
  3. Enter valid date for the `Date` input field
  4. Enter valid image url for the `Image URL` input field
  5. Enter any amount of text for the `Description` input field
  6. Click `Add` button

Expected result: New observation entry is added at the bottom of the list

Actual result: As expected

---

Test case 2

Title: Successfully delete observation

Steps:
  1. Open main page
  2. Scroll down to see the `delete` button
  3. Click `delete` button

Expected result: Observation entry is removed and not visible on the page

Actual result: As expected

---

Test case 3

Title: Verify validations for sending empty form

Steps:
  1. Open `New observation` form
  2. Leave all input fields empty
  3. Click `Add` button

Expected result: Observation entry is not created.

Actual result: As expected

---

Test case 4

Title: Verify validation for invalid date format for the "Date" input field

Steps:
  1. Open `New observation` form
  2. Enter invalid date `06/31/2025` for the `Date` input field
  3. Click `Add` button

Expected result: An error popup is displayed informing the user that the date is invalid.

Actual result: As expected

---

Test case 5

Title: Verify validation for invalid URL format for the "Image URL" input field

Steps:
  1. Open `New observation` form
  2. Enter invalid url for the `Image URL` input field
  3. Click `Add` button

Expected result: An error popup is displayed informing the user that the date is invalid.

Actual result: As expected


# 2. Note any issues or potential improvements you find, including any assumptions you made.

Bug ID: 1

Title: Backend returns error 500 if location input is not between 3 and 100 characters

Env:
  1. OS: Windows 11
  2. Browser: Version 1.78.102 Chromium: 136.0.7103.113 (Official Build) (64-bit)

Steps to reproduce:
  1. Open `New observation` form
  2. Enter `aa` for the `Location` input field
  3. Enter valid date for the `Date` input field
  4. Enter valid image url for the `Image URL` input field
  5. Click `Add` button

Expected result: Exception is handled the same way as it is for the Date and Image URL fields. Error 422 is retunred.

Actual result: When form is sent, error 500 is returned.

Video: 

https://github.com/user-attachments/assets/22452d0c-c985-4064-8e97-aa7567668b2d

From logs:

![image](https://github.com/user-attachments/assets/05a5aec8-1b9e-4982-9ef9-f3581ce57c8c)

---

## Feedback for improvments

Observation form could use a few UI/UX improvements:
   1. Display `*` symbol for required input field.
   2. Display validation errors for the `Location` input field after the Add button is clicked. As its limit is set from 3-100 characters.
   3. While empty `Date` and `Image URL` input validation are handled by `/observations` request, the error is only visible in the browsers network tab. Displaying an error under the input field would better communicate the issue to the user.

# 3. Create automated tests using any tools, frameworks and languages you are comfortable with.

  1. Using `pnpm` for the project. `pnpm` can be installed using `npm` https://pnpm.io/installation#using-npm
  2. Run `pnpm install`.
  3. Setup `.env` file (check `.env.example`) 
  4. To run test `pnpm exec playwright test {{filename}} --headed`.
