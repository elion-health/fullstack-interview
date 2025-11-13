import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { HealthSystem } from "./HealthSystem";

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

  @ManyToMany(() => HealthSystem, (healthSystem) => healthSystem.vendors)
  healthSystems = new Collection<HealthSystem>(this);

  @Property({ type: "Date" })
  createdAt: Date = new Date();

  @Property({ type: "Date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
