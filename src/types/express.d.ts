
import * as express from 'express';


declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: "user" | "serviceProvider" | "shopOwner" | "admin";
        name: string;
        email?: string;
        phone?: string;
        imageURL?: string;
      };
    }
  }
}