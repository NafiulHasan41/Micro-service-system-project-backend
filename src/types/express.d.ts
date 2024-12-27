
import * as express from 'express';


declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: "user"  | "admin";
        name: string;
        email?: string;
        phone?: string;
        imageURL?: string;
      };
    }
  }
}