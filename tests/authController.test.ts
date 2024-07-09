import request from 'supertest';
import express, { Application } from 'express';
import { register,login } from '../src/controllers/authController';
import { authenticateJWT } from '../src/middlewares/authMiddleware';
import session from 'express-session';
import jwt from  "jsonwebtoken"

const app: Application = express();
app.use(express.json());
app.use(session({
  secret: process.env.SECRET_KEY as string,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 2592000000 }
}));

app.post('/register', register);
app.post('/login', login);
app.get('/protected', authenticateJWT, (req, res) => {
  res.send('Protected route');
});

describe('Auth Controller', () => {
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe('test@example.com');
    });

    it('should return 500 if there is an error', async () => {
      const response = await request(app)
        .post('/register')
        .send({ email: 'invalid', password: 'password123' });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /login', () => {
    it('should authenticate a user and return a token', async () => {
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('should return 400 if credentials are invalid', async () => {
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /protected', () => {
    it('should allow access to protected route with valid token', async () => {
      const token = jwt.sign({ userId: 1 }, process.env.SECRET_KEY as string, { expiresIn: '1h' });

      const response = await request(app)
        .get('/protected')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.text).toBe('Protected route');
    });

    it('should deny access to protected route with invalid token', async () => {
      const response = await request(app)
        .get('/protected')
        .set('Authorization', 'Bearer invalidtoken');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });

    it('should deny access to protected route without token', async () => {
      const response = await request(app).get('/protected');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Access Denied');
    });
  });
});
