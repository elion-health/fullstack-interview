import "reflect-metadata";
import { MikroORM, RequestContext } from "@mikro-orm/core";
import config from "./config";

let orm: MikroORM | null = null;

export async function getORM() {
  if (!orm) {
    orm = await MikroORM.init(config);
  }
  return orm;
}

export async function getEM() {
  const ormInstance = await getORM();
  return ormInstance.em.fork();
}

// Helper for API routes to ensure proper request context
export async function withORM<T>(handler: (em: any) => Promise<T>): Promise<T> {
  const ormInstance = await getORM();
  return RequestContext.create(ormInstance.em, () =>
    handler(ormInstance.em.fork()),
  );
}
