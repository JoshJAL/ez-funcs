# Easy Functions

This is just a list of easy utility functions I found myself copying and pasting
over various personal and work projects. I am not going to gate-keep the code,
that will be provided in this README as well if you just want to have them in
your code base without installing the entire project. Having this project makes
things easier for me, but I am not going to pretend like every project on the
planet is going to need a "capitalizeFirstLetters" function.

## Table of Contents

- [Features](#features)
- [Installing](#installing)
- [Capitalize First Letters](#capitalize-first-letters)
- [Create Dollar Amount](#create-dollar-amount)
- [Extract Number](#extract-number)
- [Format Phone](#format-phone)
- [Truncate Text](#truncate-text)
- [Try Catch](#try-catch)

## Features

- Several utility functions that are useful in many projects.
- Source code to all of those functions is available in this README.
- No dependencies, just copy and paste the code you need.

## Installing

Using npm:

```bash
npm install ez-funcs
```

Using yarn:

```bash
yarn add ez-funcs
```

Using bun:

```bash
bun install ez-funcs
```

Using pnpm:

```bash
pnpm add ez-funcs
```

Using bower:

```bash
bower install ez-funcs
```

Once the package is installed, you can import the library using `import`
approach:

```typescript
import { tryCatch } from 'ez-funcs';
```

## Capitalize First Letters

This functions takes a string and returns the same string with the first letters
of each word capitalized.

### capitalizeFirstLetters Example

```typescript
import { capitalizeFirstLetters } from 'ez-funcs';

const text = 'hello world';

const newText = capitalizeFirstLetters(text);

console.log(newText); // Output: Hello World
```

### capitalizeFirstLetters Source Code

```typescript
export function capitalizeFirstLetters(str: string | null) {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

## Create Dollar Amount

This function takes a number or a string representing a number and returns
formatted dollar amount as a string. It supports different currencies and
handles invalid inputs gracefully.

### createDollaraAmount Example

```typescript
import { createDollarAmount } from 'ez-funcs';

const amountString = '200';

const newAmountOne = createDollarAmount(amountString);

console.log(newAmountOne); // Output: $200.00

const amountNumber = 200;

const newAmountTwo = createDollarAmount(amountNumber);

console.log(newAmountTwo); // Output: $200.00
```

### createDollarAmount Source Code

```typescript
export function createDollarAmount(
  amountInput: number | string,
  currency: SupportedCurrency = 'USD'
): string {
  if (amountInput === null || amountInput === undefined || amountInput === '') {
    const defaultAmount = 0; // Default amount if input is null, undefined, or empty string
    return defaultAmount.toLocaleString(CURRENCY_LOCALE_MAP[currency], {
      style: 'currency',
      currency: currency
    });
  }
  const numericAmount = Number(amountInput);

  // 1. Handle invalid numeric input
  if (isNaN(numericAmount)) {
    // You can decide how to handle this:
    // - Throw an error (often preferred for library functions)
    // - Return a specific string like "Invalid Amount" or an empty string
    // - Return a default formatted value like $0.00
    // For this example, let's throw an error.
    throw new TypeError(
      "Invalid 'amountInput': failed to convert to a number."
    );
  }

  // 2. Get the locale from the map
  // This replaces the large switch statement.
  const locale = CURRENCY_LOCALE_MAP[currency];

  // 3. Use a try-catch block for the toLocaleString call
  // This can catch errors if the locale or options are somehow invalid,
  // though with the current setup, it's less likely for supported currencies.
  try {
    return numericAmount.toLocaleString(locale, {
      style: 'currency',
      currency: currency // The 'currency' option takes the ISO currency code
    });
  } catch (error) {
    console.error(
      `Error formatting currency ${currency} for locale ${locale}:`,
      error
    );
    // Fallback behavior: re-throw, or return a specific error string,
    // or even a basic formatting if possible.
    // For now, let's return an error message string.
    return `Error formatting ${currency}`; // Or throw the error
  }
}
```

## Extract Number

This function extracts a number from a string, removing all non-numeric
characters except for commas and decimal points. It returns the number as a
float or null if the number cannot be parsed.

### extractNumber Example

```typescript
import { extractNumber } from 'ez-funcs';

const inputString = '2,812.30 refund minus 25% CANCELLATION FEE.';

const result = extractNumber(inputString);

console.log(result); // Output: 2812.3
```

### extractNumber Source Code

```typescript
export function extractNumber(input: number | string) {
  input = input.toString();

  // Remove all characters except digits, commas, and decimal points
  const cleaned = input.replace(/[^0-9.,]/g, '');
  // Remove commas
  const normalized = cleaned.replace(/,/g, '');
  // Parse as float
  const number = parseFloat(normalized);
  return isNaN(number) ? null : number;
}
```

## Format Phone

This function formats a phone number string into a standard format of
`(123) 456-7890`. It supports both 10-digit and 11-digit numbers, where the
latter starts with a '1'.

### formatPhone Example

```typescript
import { formatPhone } from 'ez-funcs';

const phoneNumber = '1234567890';

const formattedPhone = formatPhone(phoneNumber);

console.log(formattedPhone); // Output: (123) 456-7890
```

### formatPhone Source Code

```typescript
export function formatPhone(phoneNumber: string) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // Check for 10-digit number
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  // If no match, check for 11-digit number starting with 1
  if (!match && cleaned.length === 11 && cleaned.charAt(0) === '1') {
    match = cleaned.match(/^1(\d{3})(\d{3})(\d{4})$/);
  }

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return null;
}
```

## Truncate Text

This function truncates a string to a specified length and appends an ellipsis
(...) if the string exceeds that length. It also ensures that the string does
not end with a space before the ellipsis.

### truncateText Example

```typescript
import { truncateText } from 'ez-funcs';

const text 'Imagine this is super long text that needs to be truncated';

const truncatedText = truncateText(text, 20);

console.log(truncatedText); // Output: Imagine this is super long...
```

### truncateText Source Code

```typescript
export function truncateText(text: string, length: number) {
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length) + '...';
}
```

## Try Catch

This function executes a given function and catches any errors that occur in a
much more elegant way than the built in try-catch functionality. It returns an
object with the result or error. This functions exists in every project I create
and I highly recommend using it. However, if you have came up with a better
solution please send it my way! Also, I am not going to try to take credit for
this one this comes from Theo, if you don't watch his YouTube videos maybe give
them a shot!
[https://www.youtube.com/@t3dotgg](https://www.youtube.com/@t3dotgg).

### tryCatch Example

```typescript
import { tryCatch } from 'ez-funcs';

async function something() {
  const { data, error } = await tryCatch(async () => {
    const response = await fetch('/api/some-endpoint');
    return response.json();
  });

  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Fetched data:', data);
  }
}
```

### tryCatch Source Code

```typescript
// Types for the result object with discriminated union
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
```

If you have any suggestions visit the contact me page on my website! ->
[Contact Me](https://joshualevine.me/contact)
