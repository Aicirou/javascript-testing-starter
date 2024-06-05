import { describe, it, expect } from 'vitest';
import { fizzBuzz, max, calculateAverage, factorial } from '../src/intro';

//max function
describe('max', () => {
  it('should return the first argument if it is greater', () => {
    /**  //AAA
    //Arrange: turn on the tv
    const a = 2;
    const b = 1;
    //Act: press the power button
    const result = max(a, b);
    //Assert: verify the tv is off
    expect(result).toBe(2);
    */
    expect(max(2, 1)).toBe(2);
  });
  it('should return the second argument if it is greater', () => {
    expect(max(1, 2)).toBe(2);
  });
  it('should return the first argument if both are equal', () => {
    expect(max(1, 1)).toBe(1);
  });
});

//fizzBuzz function
describe('fizzBuzz', () => {
  it('should return FizzBuzz if the number is divisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });
  it('should return Fizz if the number is divisible by 3', () => {
    expect(fizzBuzz(3)).toBe('Fizz');
  });
  it('should return Buzz if the number is divisible by 5', () => {
    expect(fizzBuzz(5)).toBe('Buzz');
  });
  it('should return the number as a string if it is not divisible by 3 or 5', () => {
    expect(fizzBuzz(1)).toBe('1');
  });
});

//Test-Driven Development (TDD) approach
//1. Write a failing test
//2. Write the minimum amount of code to make the test pass
//3. Refactor the code

//calculateAverage function
describe('calculateAverage', () => {
  it('should return NaN if the input is an empty array', () => {
    expect(calculateAverage([])).toBeNaN();
  });
  it('should return the average of the single number in the array', () => {
    expect(calculateAverage([1])).toBe(1);
  });
  it('should return the average of the numbers in the array', () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
    expect(calculateAverage([1, 2, 3])).toBe(2);
    expect(calculateAverage([1, 2, 3, 4])).toBe(2.5);
    expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
  });
});

//Factorial function
describe('factorial', () => {
  it('should return 1 for 0', () => {
    expect(factorial(0)).toBe(1);
  });
  it('should return the factorial of a positive integer', () => {
    expect(factorial(1)).toBe(1);
    expect(factorial(2)).toBe(2);
    expect(factorial(3)).toBe(6);
    expect(factorial(4)).toBe(24);
    expect(factorial(5)).toBe(120);
  });
  it('should return undefined for negative numbers', () => {
    expect(factorial(-1)).toBeUndefined();
  });
});

// Path: tests/intro.test.js
