
import * as express from 'express';


declare global {
  namespace Express {
    interface Request {
      user?: {
        role: "user" | "serviceProvider" | "shopOwner" | "admin";
        name: string;
        email?: string;
        phone?: string;
        imageURL?: string;
      };
    }
  }
}