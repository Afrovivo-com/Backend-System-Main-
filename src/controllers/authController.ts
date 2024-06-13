import { Request, Response } from "express";
import { registerUser, authenticateUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  try {
    const user = await registerUser(email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  try {
    const { token, user } = await authenticateUser(email, password);
    res.json({ token, user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
