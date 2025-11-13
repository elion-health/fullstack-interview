import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Vendor } from "./Vendor";

@Entity()
export class HealthSystem {
  @PrimaryKey({ type: "number" })
  id!: number;

  @Property({ type: "string" })
  name!: string;

  @Property({ type: "string" })
  location!: string; // e.g., "Boston, MA"

  @Property({ type: "text", nullable: true })
  description?: string;

  @ManyToMany(() => Vendor, (vendor) => vendor.healthSystems, { owner: true })
  vendors = new Collection<Vendor>(this);

  @Property({ type: "Date" })
  createdAt: Date = new Date();

  @Property({ type: "Date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
