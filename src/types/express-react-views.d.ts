// express-react-views.d.ts
declare module "express-react-views" {
  import { Request, Response, NextFunction } from "express";

  interface Options {
    beautify?: boolean;
    transformViews?: boolean;
  }

  export function createEngine(
    options?: Options
  ): (
    path: string,
    options: any,
    callback: (e: Error | null, rendered?: string) => void
  ) => void;
}
