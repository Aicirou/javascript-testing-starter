import { it, expect, describe } from 'vitest';
import { calculateDiscount } from '../src/main';
//test cases for calculateDiscount
describe('calculateDiscount', () => {
  // Test cases go here
  it('should return discounted price if given valid code', () => {
    // Test goes here
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10, 'INVALID')).toBe(10);
  });
});
