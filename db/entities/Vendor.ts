import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Product } from "./Product";

@Entity()
export class Vendor {
  @PrimaryKey({ type: "number" })
  id!: number;

  @Property({ type: "string" })
  name!: string;

  @Property({ type: "string" })
  category!: string; // e.g., "EHR", "Analytics", "Telehealth", "Revenue Cycle"

  @Property({ type: "text", nullable: true })
  description?: string;

  @Property({ type: "string", nullable: true })
  website?: string;

  @OneToMany(
    () => Product,
    (product) => product.vendor,
  )
  products = new Collection<Product>(this);

  @Property({ type: "Date" })
  createdAt: Date = new Date();

  @Property({ type: "Date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
