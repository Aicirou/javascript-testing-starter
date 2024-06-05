// Lesson: Writing your first tests
export function max(a, b) {
  return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
}

// Exercise - Test-Driven Development (TDD) approach
export function calculateAverage(numbers) {
  if (numbers.length === 0) return NaN;
  return numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
}

// Exercise - Factorial function (TDD approach)
export function factorial(n) {
  // if (n < 0) return undefined;
  // return n === 0 ? 1 : n * factorial(n - 1);

  return n < 0 ? undefined : n === 0 ? 1 : n * factorial(n - 1);
}
