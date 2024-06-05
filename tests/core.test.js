import {
  it,
  expect,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
} from 'vitest';
import {
  getCoupons,
  calculateDiscount,
  validateUserInput,
  isPriceInRange,
  isValidUsername,
  canDrive,
  fetchData,
  Stack,
  createProduct,
  isStrongPassword,
} from '../src/core.js';

//test cases for getCoupons
describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    // Test goes here
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should return an array with valid coupon codes', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy();
    });
  });

  it('should return an array with valid discount values', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThanOrEqual(0);
      expect(coupon.discount).toBeLessThanOrEqual(1);
    });
  });
});

//test cases for calculateDiscount
describe('calculateDiscount', () => {
  // Test cases go here
  it('should return discounted price if given valid code', () => {
    // Test goes here
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });
  it('should handle non-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
  });
  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });
  it('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });
  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10, 'INVALID')).toBe(10);
  });
});

//test cases for validateUserInput
describe('validateUserInput', () => {
  it("should return 'Validation successful' if given valid input", () => {
    expect(validateUserInput('JohnDoe', 18)).toMatch(/successful/i);
  });
  it("should return 'Invalid username' if given invalid username", () => {
    expect(validateUserInput('JD', 18)).toMatch(/invalid/i);
    expect(validateUserInput(123, 18)).toMatch(/invalid/i);
  });
  it("should return 'Invalid age' if given invalid age", () => {
    expect(validateUserInput('JohnDoe', 17)).toMatch(/invalid/i);
    expect(validateUserInput('JohnDoe', '18')).toMatch(/invalid/i);
  });
  it("should return 'Invalid username, Invalid age' if given invalid username and age", () => {
    expect(validateUserInput('', 0)).toMatch(/invalid username/i);
    expect(validateUserInput('', 0)).toMatch(/invalid age/i);
  });
});

//test cases for isPriceInRange
describe('isPriceInRange', () => {
  // Test cases go here
  // it("should return false if price is outside the range", () => {
  //   expect(isPriceInRange(-10, 0, 100)).toBe(false);
  //   expect(isPriceInRange(200, 0, 100)).toBe(false);
  // });
  // it("should return true if price is within the range", () => {
  //   expect(isPriceInRange(50, 0, 100)).toBe(true);
  // });
  // it("should return true if price is on the boundary", () => {
  //   expect(isPriceInRange(0, 0, 100)).toBe(true);
  //   expect(isPriceInRange(100, 0, 100)).toBe(true);
  // });

  //using parameterized test
  it.each([
    { scenario: 'price < min', price: -10, expected: false },
    { scenario: 'price = min', price: 0, expected: true },
    { scenario: 'price > max', price: 200, expected: false },
    { scenario: 'price = max', price: 100, expected: true },
    { scenario: 'min < price < max', price: 50, expected: true },
  ])('should return $expected if $scenario', ({ price, expected }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(expected);
  });
});

//test cases for isValidUsername
describe('isValidUsername', () => {
  // Test cases go here
  const minLength = 5;
  const maxLength = 15;
  it('should return false if username is too short', () => {
    expect(isValidUsername('J'.repeat(minLength - 1))).toBe(false);
  });
  it('should return false if username is too long', () => {
    expect(isValidUsername('J'.repeat(maxLength + 1))).toBe(false);
  });
  it('should return true if username is within the range', () => {
    expect(isValidUsername('J'.repeat(minLength + 1))).toBe(true);
    expect(isValidUsername('J'.repeat(maxLength - 1))).toBe(true);
  });
  it('should return true if username is on the boundary', () => {
    expect(isValidUsername('J'.repeat(minLength))).toBe(true);
    expect(isValidUsername('J'.repeat(maxLength))).toBe(true);
  });
  it('should return false if username is empty', () => {
    expect(isValidUsername('')).toBe(false);
  });
  it('should return false if username is not a string', () => {
    expect(isValidUsername(123)).toBe(false);
  });
  it('should return false if username is null', () => {
    expect(isValidUsername(null)).toBe(false);
  });
});

//test cases for canDrive
describe('canDrive', () => {
  // Test cases go here

  // it("should return true if age is above legal driving age", () => {
  //   expect(canDrive(16, "US")).toBe(true);
  //   expect(canDrive(17, "UK")).toBe(true);
  // });
  // it("should return false if age is below legal driving age", () => {
  //   expect(canDrive(15, "US")).toBe(false);
  //   expect(canDrive(16, "UK")).toBe(false);
  // });
  // it("should return false if country code is invalid", () => {
  //   expect(canDrive(16, "INVALID")).toMatch(/invalid/i);
  // });

  //using parameterized test
  it.each([
    { age: 16, countryCode: 'US', expected: true },
    { age: 17, countryCode: 'UK', expected: true },
    { age: 15, countryCode: 'US', expected: false },
    { age: 16, countryCode: 'UK', expected: false },
    { age: 16, countryCode: 'INVALID', expected: 'Invalid country code' },
  ])(
    'should return $expected if age is $age and country code is $countryCode',
    ({ age, countryCode, expected }) => {
      expect(canDrive(age, countryCode)).toBe(expected);
    },
  );
});

//test cases for fetchData
describe('fetchData', () => {
  it('should return a promise that will resolve to an array of numbers', async () => {
    //first way
    try {
      const data = await fetchData();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      data.forEach((item) => {
        expect(typeof item).toBe('number');
      });
    } catch (error) {
      console.log(error);
      expect(error).toHaveProperty('reason');
      expect(error.reason).toMatch(/error/i);
    }

    //second way
    // fetchData().then((data) => {
    //   expect(Array.isArray(data)).toBe(true);
    //   expect(data.length).toBeGreaterThan(0);
    //   data.forEach((item) => {
    //     expect(typeof item).toBe("number");
    //   });
    // });
  });
});

//test cases for Stack class
describe('Stack', () => {
  let stack;
  beforeEach(() => {
    //runs before each test
    stack = new Stack();
  });
  it('should push items to the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.items).toEqual([1, 2, 3]);
  });
  it('should pop items from the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3); //last in first out
    expect(stack.size()).toBe(2); //size should be 2
    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(1);
    expect(stack.pop()).toBe(1);
    expect(stack.size()).toBe(0);
  });
  it('should return the top item of the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.peek()).toBe(3);
  });
  it('should return the size of the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.size()).toBe(3);
  });
  it('should return true if the stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });
  it('should return false if the stack is not empty', () => {
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });
  it('should clear the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
  });
  //handle error
  it('should throw an error if pop is called on an empty stack', () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });
  it('should throw an error if peek is called on an empty stack', () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });
});

//additional test cases

//test cases for createProduct
describe('createProduct', () => {
  it('should return success message if product is valid', () => {
    expect(createProduct({ name: 'Product', price: 10 })).toEqual({
      success: true,
      message: 'Product was successfully published',
    });
  });
  it('should return error message if product name is missing', () => {
    expect(createProduct({ price: 10 })).toEqual({
      success: false,
      error: { code: 'invalid_name', message: 'Name is missing' },
    });
  });
  it('should return error message if product price is missing', () => {
    expect(createProduct({ name: 'Product' })).toEqual({
      success: false,
      error: { code: 'invalid_price', message: 'Price is missing' },
    });
  });
});

//test cases for isStrongPassword
describe('isStrongPassword', () => {
  it('should return false if password is missing or less than 8 characters', () => {
    expect(isStrongPassword()).toBe(false);
    expect(isStrongPassword('1234567')).toBe(false);
  });
  it('should return true if password is strong', () => {
    //regex: (?=.*[a-z]) - at least one lowercase letter
    //regex: (?=.*[A-Z]) - at least one uppercase letter
    //regex: (?=.*[0-9]) - at least one number
    //length >= 8
    expect(isStrongPassword('Password1')).toBe(true);
  });
  it('should return false if password is missing lowercase letter', () => {
    expect(isStrongPassword('PASSWORD1')).toBe(false);
  });
  it('should return false if password is missing uppercase letter', () => {
    expect(isStrongPassword('password1')).toBe(false);
  });
  it('should return false if password is missing number', () => {
    expect(isStrongPassword('Password')).toBe(false);
  });
});
