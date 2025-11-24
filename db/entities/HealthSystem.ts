import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

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

  @Property({ type: "Date" })
  createdAt: Date = new Date();

  @Property({ type: "Date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
