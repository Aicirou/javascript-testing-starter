import { it, expect, describe, vi } from 'vitest';
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  submitOrder,
  signUp,
  login,
  isOnline,
  getDiscount,
} from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { sendEmail } from '../src/libs/email';
import security from '../src/libs/security';

//Hoisting the mock function
vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');
vi.mock('../src/libs/email', async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

describe('test mocking', () => {
  it('test case 1', () => {
    const greet = vi.fn();
    //greet.mockReturnValue("Hello world");
    //greet.mockReturnValueOnce("Hello world");
    //greet.mockResolvedValue("Hello world");
    //greet.mockRejectedValue("Hello world");
    //greet.mockImplementation(() => "Hello world");
    greet.mockImplementationOnce((name) => `Hello ${name}`);
    expect(greet('world')).toBe('Hello world');
  });
  it('test case 2', () => {
    //create a mock for the following function
    //sendText(message) {}
    //call the mock function
    //assert the mock function was called
    //assert that the result is "ok"

    const sendText = vi.fn();
    sendText.mockReturnValue('ok');
    const result = sendText('hello');
    expect(sendText).toHaveBeenCalledWith('hello');
    expect(result).toBe('ok');
  });
});

//test cases for getPriceInCurrency function
describe('getPriceInCurrency', () => {
  it('should return price in target currency', () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);
    const price = getPriceInCurrency(10, 'AUD');
    expect(price).toBe(15);
  });
});

//test cases for getShippingInfo function
describe('getShippingInfo', () => {
  it('should return shipping unavailable', () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);
    const info = getShippingInfo('US');
    expect(info).toMatch(/unavailable/i);
  });
  it('should return shipping info', () => {
    vi.mocked(getShippingQuote).mockReturnValue({
      cost: 10,
      estimatedDays: 2,
    });
    const info = getShippingInfo('US');
    expect(info).toMatch(/shipping cost: \$10 \(2 days\)/i);
  });
});

//lesson: Interaction testing
//test cases for renderPage function
describe('renderPage', () => {
  it('should return correct content', async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });
  it('should call analytics', async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
  //   it("should track page view", async () => {
  //     const trackPageView = vi.fn();
  //     await vi.require("../src/mocking", {
  //       "./libs/analytics": { trackPageView },
  //     });
  //     await vi.require("../src/mocking").renderPage();
  //     expect(trackPageView).toHaveBeenCalledWith("/home");
  //   });
});

//exercise
//test cases for submitOrder function
describe('submitOrder', () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: '1234' };

  it('should charge the customer', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it('should return payment success', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true });
  });

  it('should return payment error', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'failed' });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: false, error: 'payment_error' });
  });
});

//lesson: Partial mocking
//test cases for signUp function
describe('signUp', () => {
  // beforeEach(() => {
  //   sendEmail.mockClear();
  //   // vi.clearAllMocks();
  // });
  const email = 'name@domain.com';
  it('should return false for invalid email', async () => {
    const result = await signUp('invalid@domain');
    expect(result).toBe(false);
  });
  it('should return true for valid email', async () => {
    const result = await signUp(email);
    expect(result).toBe(true);
  });
  it('should send welcome email if vaild email', async () => {
    await signUp(email);
    expect(sendEmail).toHaveBeenCalledOnce();
    // console.log(sendEmail.mock.calls);
    const [to, message] = sendEmail.mock.calls[0];
    expect(to).toBe(email);
    expect(message).toMatch(/welcome/i);
  });
});

//lesson: Spying on functions
//test cases for login function
describe('login', () => {
  const email = 'name@domain.com';
  it('should email the one-time login code', async () => {
    const spy = vi.spyOn(security, 'generateCode');

    await login(email);

    const securityCode = spy.mock.results[0].value.toString();
    expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
  });
});

//lesson: Mocking dates
//test cases for isOnline function
describe('isOnline', () => {
  it('should return false if current hour is outside of available hours', () => {
    vi.setSystemTime('2024-01-01 07:59');
    expect(isOnline()).toBe(false);

    vi.setSystemTime('2024-01-01 20:01');
    expect(isOnline()).toBe(false);
  });
  it('should return true if current hour is within available hours', () => {
    vi.setSystemTime('2024-01-01 08:00');
    expect(isOnline()).toBe(true);

    vi.setSystemTime('2024-01-01 19:59');
    expect(isOnline()).toBe(true);
  });
});

//exercise
//test cases for getDiscount function
describe('getDiscount', () => {
  it('should return 0.2 for Christmas day', () => {
    vi.setSystemTime('2024-12-25 00:01');
    expect(getDiscount()).toBe(0.2);

    vi.setSystemTime('2024-12-25 23:59');
    expect(getDiscount()).toBe(0.2);
  });
  it('should return 0 for other days', () => {
    vi.setSystemTime('2024-12-24 23:59');
    expect(getDiscount()).toBe(0);

    vi.setSystemTime('2024-12-26 00:01');
    expect(getDiscount()).toBe(0);
  });
});
