import { Request, Response } from "express";

export type Route = (request: Request, response: Response) => any;
