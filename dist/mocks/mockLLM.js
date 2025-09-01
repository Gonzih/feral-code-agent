"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockLLM = void 0;
class MockLLM {
    constructor() {
        this.taskContext = '';
    }
    async generate(prompt) {
        // Extract task context from the prompt
        if (prompt.includes('Create a TypeScript function that calculates the factorial')) {
            this.taskContext = 'factorial';
        }
        else if (prompt.includes('Create a React functional component') || prompt.includes('counter')) {
            this.taskContext = 'react';
        }
        else if (prompt.includes('Create an Express.js API endpoint') || prompt.includes('user registration')) {
            this.taskContext = 'api';
        }
        if (prompt.includes('planning agent')) {
            if (this.taskContext === 'factorial') {
                return `Plan for factorial function:
1. Create TypeScript function with proper typing
2. Add input validation for negative numbers
3. Add input validation for non-integers
4. Implement factorial calculation (iterative approach)
5. Add comprehensive error handling
6. Return result with proper type annotation`;
            }
            else if (this.taskContext === 'react') {
                return `Plan for React counter component:
1. Create functional component with TypeScript
2. Add useState hook for counter state
3. Implement increment and decrement functions
4. Add onClick event handlers to buttons
5. Return JSX with proper structure
6. Add TypeScript interfaces for props`;
            }
            else if (this.taskContext === 'api') {
                return `Plan for Express API endpoint:
1. Set up Express router
2. Create POST route for user registration
3. Add input validation middleware
4. Implement request body validation
5. Add error handling and responses
6. Return proper HTTP status codes`;
            }
        }
        if (prompt.includes('coding agent')) {
            if (this.taskContext === 'factorial') {
                return `function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Factorial is only defined for integers');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}`;
            }
            else if (this.taskContext === 'react') {
                return `import React, { useState } from 'react';

interface CounterProps {
  initialValue?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Counter;`;
            }
            else if (this.taskContext === 'api') {
                return `import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

interface UserRegistrationRequest {
  email: string;
  password: string;
  name: string;
}

router.post('/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').notEmpty().trim().escape(),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name }: UserRegistrationRequest = req.body;

      // User registration logic here
      // const user = await createUser({ email, password, name });

      res.status(201).json({
        message: 'User registered successfully',
        user: { email, name }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;`;
            }
        }
        if (prompt.includes('testing agent')) {
            if (this.taskContext === 'factorial') {
                return `Test cases for factorial function:
- factorial(0) should return 1
- factorial(1) should return 1
- factorial(5) should return 120
- factorial(-1) should throw error
- factorial(1.5) should throw error
- factorial(10) should return 3628800`;
            }
            else if (this.taskContext === 'react') {
                return `Test cases for React Counter component:
- Initial render shows count 0
- Clicking increment increases count by 1
- Clicking decrement decreases count by 1
- Props initialValue sets starting count
- Buttons have proper onClick handlers`;
            }
            else if (this.taskContext === 'api') {
                return `Test cases for API endpoint:
- POST /register with valid data returns 201
- POST /register with invalid email returns 400
- POST /register with short password returns 400
- POST /register with missing name returns 400
- Server error returns 500 with error message`;
            }
        }
        if (prompt.includes('debugger agent')) {
            if (this.taskContext === 'factorial') {
                return `Debugged factorial function:
function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Factorial is only defined for integers');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
// Fixed: Added proper error handling and type checking`;
            }
            else if (this.taskContext === 'react') {
                return `Debugged React Counter component:
import React, { useState } from 'react';

interface CounterProps {
  initialValue?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Counter;
// Fixed: Added proper TypeScript types and React.FC interface`;
            }
            else if (this.taskContext === 'api') {
                return `Debugged API endpoint:
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

interface UserRegistrationRequest {
  email: string;
  password: string;
  name: string;
}

router.post('/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').notEmpty().trim().escape(),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name }: UserRegistrationRequest = req.body;

      // User registration logic here
      // const user = await createUser({ email, password, name });

      res.status(201).json({
        message: 'User registered successfully',
        user: { email, name }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
// Fixed: Added proper error handling and validation`;
            }
        }
        if (prompt.includes('optimization agent')) {
            if (this.taskContext === 'factorial') {
                return `Optimized factorial function:
function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Factorial is only defined for integers');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  // Iterative approach for better performance and stack safety
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
// Optimization: Used iterative instead of recursive for large numbers`;
            }
            else if (this.taskContext === 'react') {
                return `Optimized React Counter component:
import React, { useState, useCallback } from 'react';

interface CounterProps {
  initialValue?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => setCount(prev => prev + 1), []);
  const decrement = useCallback(() => setCount(prev => prev - 1), []);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Counter;
// Optimization: Added useCallback for event handlers to prevent unnecessary re-renders`;
            }
            else if (this.taskContext === 'api') {
                return `Optimized API endpoint:
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

interface UserRegistrationRequest {
  email: string;
  password: string;
  name: string;
}

const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').notEmpty().trim().escape(),
];

router.post('/register', validateRegistration, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name }: UserRegistrationRequest = req.body;

  try {
    // User registration logic here
    // const user = await createUser({ email, password, name });

    res.status(201).json({
      message: 'User registered successfully',
      user: { email, name }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
// Optimization: Extracted validation middleware for reusability`;
            }
        }
        if (prompt.includes('security agent')) {
            if (this.taskContext === 'factorial') {
                return `Secured factorial function:
function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Factorial is only defined for integers');
  }
  if (n > 170) {
    throw new Error('Input too large, would cause overflow');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    if (result > Number.MAX_SAFE_INTEGER / i) {
      throw new Error('Result would exceed maximum safe integer');
    }
    result *= i;
  }
  return result;
}
// Security: Added overflow protection and input bounds checking`;
            }
            else if (this.taskContext === 'react') {
                return `Secured React Counter component:
import React, { useState, useCallback } from 'react';

interface CounterProps {
  initialValue?: number;
  maxValue?: number;
  minValue?: number;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  maxValue = 100,
  minValue = -100
}) => {
  const [count, setCount] = useState<number>(Math.max(minValue, Math.min(maxValue, initialValue)));

  const increment = useCallback(() => {
    setCount(prev => Math.min(maxValue, prev + 1));
  }, [maxValue]);

  const decrement = useCallback(() => {
    setCount(prev => Math.max(minValue, prev - 1));
  }, [minValue]);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={decrement} disabled={count <= minValue}>-</button>
      <button onClick={increment} disabled={count >= maxValue}>+</button>
    </div>
  );
};

export default Counter;
// Security: Added bounds checking and disabled buttons at limits`;
            }
            else if (this.taskContext === 'api') {
                return `Secured API endpoint:
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many registration attempts, please try again later.'
});

interface UserRegistrationRequest {
  email: string;
  password: string;
  name: string;
}

const validateRegistration = [
  body('email').isEmail().normalizeEmail().isLength({ max: 254 }),
  body('password').isLength({ min: 8, max: 128 }),
  body('name').notEmpty().trim().escape().isLength({ min: 1, max: 100 }),
];

router.post('/register', registrationLimiter, validateRegistration, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name }: UserRegistrationRequest = req.body;

  try {
    // Check if user already exists
    // const existingUser = await findUserByEmail(email);
    // if (existingUser) {
    //   return res.status(409).json({ error: 'User already exists' });
    // }

    // Hash password before storing
    // const hashedPassword = await bcrypt.hash(password, 12);

    // User registration logic here
    // const user = await createUser({ email, hashedPassword, name });

    res.status(201).json({
      message: 'User registered successfully',
      user: { email, name }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
// Security: Added rate limiting, input length validation, and password hashing preparation`;
            }
        }
        if (prompt.includes('documentation agent')) {
            if (this.taskContext === 'factorial') {
                return `/**
 * Calculates the factorial of a given number
 * @param n - The number to calculate factorial for (must be non-negative integer)
 * @returns The factorial of n
 * @throws Error if n is negative or not an integer
 * @throws Error if result would exceed maximum safe integer
 * @example
 * factorial(5) // returns 120
 * factorial(0) // returns 1
 */
function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Factorial is only defined for integers');
  }
  if (n > 170) {
    throw new Error('Input too large, would cause overflow');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    if (result > Number.MAX_SAFE_INTEGER / i) {
      throw new Error('Result would exceed maximum safe integer');
    }
    result *= i;
  }
  return result;
}`;
            }
            else if (this.taskContext === 'react') {
                return `/**
 * Counter Component - A simple counter with increment/decrement functionality
 * @param initialValue - The initial count value (default: 0)
 * @param maxValue - Maximum allowed count value (default: 100)
 * @param minValue - Minimum allowed count value (default: -100)
 */
import React, { useState, useCallback } from 'react';

interface CounterProps {
  initialValue?: number;
  maxValue?: number;
  minValue?: number;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  maxValue = 100,
  minValue = -100
}) => {
  const [count, setCount] = useState<number>(Math.max(minValue, Math.min(maxValue, initialValue)));

  const increment = useCallback(() => {
    setCount(prev => Math.min(maxValue, prev + 1));
  }, [maxValue]);

  const decrement = useCallback(() => {
    setCount(prev => Math.max(minValue, prev - 1));
  }, [minValue]);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={decrement} disabled={count <= minValue}>-</button>
      <button onClick={increment} disabled={count >= maxValue}>+</button>
    </div>
  );
};

export default Counter;`;
            }
            else if (this.taskContext === 'api') {
                return `/**
 * User Registration API Endpoint
 * POST /register
 *
 * Registers a new user with email, password, and name validation
 *
 * Request Body:
 * - email: string (valid email address)
 * - password: string (minimum 8 characters)
 * - name: string (non-empty, sanitized)
 *
 * Response:
 * 201: User registered successfully
 * 400: Validation errors
 * 409: User already exists
 * 429: Rate limit exceeded
 * 500: Internal server error
 */
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many registration attempts, please try again later.'
});

interface UserRegistrationRequest {
  email: string;
  password: string;
  name: string;
}

const validateRegistration = [
  body('email').isEmail().normalizeEmail().isLength({ max: 254 }),
  body('password').isLength({ min: 8, max: 128 }),
  body('name').notEmpty().trim().escape().isLength({ min: 1, max: 100 }),
];

router.post('/register', registrationLimiter, validateRegistration, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name }: UserRegistrationRequest = req.body;

  try {
    // Check if user already exists
    // const existingUser = await findUserByEmail(email);
    // if (existingUser) {
    //   return res.status(409).json({ error: 'User already exists' });
    // }

    // Hash password before storing
    // const hashedPassword = await bcrypt.hash(password, 12);

    // User registration logic here
    // const user = await createUser({ email, hashedPassword, name });

    res.status(201).json({
      message: 'User registered successfully',
      user: { email, name }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;`;
            }
        }
        if (prompt.includes('review agent')) {
            if (this.taskContext === 'factorial') {
                return `Reviewed factorial function - EXCELLENT quality:

✅ TypeScript syntax: Proper function declaration with type annotations
✅ Error handling: Comprehensive validation for negative numbers and non-integers
✅ Security: Overflow protection and bounds checking
✅ Performance: Iterative implementation for efficiency
✅ Documentation: JSDoc comments with examples
✅ Code quality: Clean, readable, well-structured

function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Factorial is only defined for integers');
  }
  if (n > 170) {
    throw new Error('Input too large, would cause overflow');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    if (result > Number.MAX_SAFE_INTEGER / i) {
      throw new Error('Result would exceed maximum safe integer');
    }
    result *= i;
  }
  return result;
}

Rating: 5/5 - Production ready with excellent error handling and security measures.`;
            }
            else if (this.taskContext === 'react') {
                return `Reviewed React component - EXCELLENT quality:

✅ React best practices: Functional component with hooks
✅ TypeScript integration: Proper type annotations
✅ State management: useState for counter state
✅ Event handling: onClick handlers for increment/decrement
✅ JSX structure: Clean, semantic markup
✅ Accessibility: Proper button elements
✅ Performance: useCallback for event handlers
✅ Security: Bounds checking and disabled states

import React, { useState, useCallback } from 'react';

interface CounterProps {
  initialValue?: number;
  maxValue?: number;
  minValue?: number;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  maxValue = 100,
  minValue = -100
}) => {
  const [count, setCount] = useState<number>(Math.max(minValue, Math.min(maxValue, initialValue)));

  const increment = useCallback(() => {
    setCount(prev => Math.min(maxValue, prev + 1));
  }, [maxValue]);

  const decrement = useCallback(() => {
    setCount(prev => Math.max(minValue, prev - 1));
  }, [minValue]);

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={decrement} disabled={count <= minValue}>-</button>
      <button onClick={increment} disabled={count >= maxValue}>+</button>
    </div>
  );
};

export default Counter;

Rating: 5/5 - Production-ready React component with excellent TypeScript integration and security features.`;
            }
            else if (this.taskContext === 'api') {
                return `Reviewed API endpoint - EXCELLENT quality:

✅ Express.js setup: Proper router configuration
✅ Input validation: Request body validation with express-validator
✅ Error handling: Try-catch blocks and proper error responses
✅ Security: Rate limiting, input sanitization, and validation
✅ TypeScript: Full type safety for requests and responses
✅ RESTful design: Proper HTTP status codes
✅ Documentation: Comprehensive JSDoc comments
✅ Performance: Extracted validation middleware

import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many registration attempts, please try again later.'
});

interface UserRegistrationRequest {
  email: string;
  password: string;
  name: string;
}

const validateRegistration = [
  body('email').isEmail().normalizeEmail().isLength({ max: 254 }),
  body('password').isLength({ min: 8, max: 128 }),
  body('name').notEmpty().trim().escape().isLength({ min: 1, max: 100 }),
];

router.post('/register', registrationLimiter, validateRegistration, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name }: UserRegistrationRequest = req.body;

  try {
    // Check if user already exists
    // const existingUser = await findUserByEmail(email);
    // if (existingUser) {
    //   return res.status(409).json({ error: 'User already exists' });
    // }

    // Hash password before storing
    // const hashedPassword = await bcrypt.hash(password, 12);

    // User registration logic here
    // const user = await createUser({ email, hashedPassword, name });

    res.status(201).json({
      message: 'User registered successfully',
      user: { email, name }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

Rating: 5/5 - Secure, well-validated API endpoint with comprehensive error handling and rate limiting.`;
            }
        }
        return `Mock response for: ${prompt}`;
    }
}
exports.MockLLM = MockLLM;
//# sourceMappingURL=mockLLM.js.map