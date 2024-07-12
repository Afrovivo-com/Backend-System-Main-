import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { registerUser, authenticateUser } from "../src/services/authService";

dotenv.config();

jest.mock('@prisma/client', () => {
  const PrismaClient = jest.fn().mockImplementation(() => {
    return {
      user: {
        create: jest.fn(),
        findUnique: jest.fn()
      }
    }
  });
  return { PrismaClient };
});
const mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;

describe('Auth Service', () => {
  const secretKey = process.env.SECRET_KEY as string;
  if (!secretKey) throw new Error("No secret key found. Please define SECRET_KEY environment variable.");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should hash the password and create a new user', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 18);

      const createdUser = {
        id: 1,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        verificationStatus: false // or true depending on your application logic
      };
      (mockPrisma.user.create as jest.MockedFunction<typeof mockPrisma.user.create>).mockResolvedValue(createdUser);

      const user = await registerUser(email, password);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 18);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: { email, password: hashedPassword } });
      expect(user).toEqual(createdUser);
    });
  });

  describe('authenticateUser', () => {
    it('should authenticate the user and return a token', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 18);

      const foundUser = {
        id: 1,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        verificationStatus: false // or true depending on your application logic
      };
      (mockPrisma.user.findUnique as jest.MockedFunction<typeof mockPrisma.user.findUnique>).mockResolvedValue(foundUser);

      const result = await authenticateUser(email, password);

      const token = jwt.sign({ userId: 1 }, secretKey, { expiresIn: '1h' });

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toEqual({ token, user: foundUser });
    });

    it('should throw an error if email is invalid', async () => {
      const email = 'invalid@example.com';
      const password = 'password123';

      (mockPrisma.user.findUnique as jest.MockedFunction<typeof mockPrisma.user.findUnique>).mockResolvedValue(null);

      await expect(authenticateUser(email, password)).rejects.toThrow('Invalid email and password');
    });

    it('should throw an error if password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const hashedPassword = await bcrypt.hash('password123', 18);

      const foundUser = {
        id: 1,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        verificationStatus: false // or true depending on your application logic
      };
      (mockPrisma.user.findUnique as jest.MockedFunction<typeof mockPrisma.user.findUnique>).mockResolvedValue(foundUser);

      await expect(authenticateUser(email, password)).rejects.toThrow('Invalid password');
    });
  });
});
