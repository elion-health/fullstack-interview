import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  type Rel,
} from "@mikro-orm/core";
import { Vendor } from "./Vendor";

@Entity()
export class Product {
  @PrimaryKey({ type: "number" })
  id!: number;

  @Property({ type: "string" })
  name!: string;

  @Property({ type: "text", nullable: true })
  description?: string;

  @Property({ type: "string", nullable: true })
  category?: string; // e.g., "Clinical Module", "Analytics Platform", "API Service", etc.

  @Property({ type: "string", nullable: true })
  version?: string;

  @ManyToOne(() => Vendor)
  vendor!: Rel<Vendor>;

  @Property({ type: "Date" })
  createdAt: Date = new Date();

  @Property({ type: "Date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
