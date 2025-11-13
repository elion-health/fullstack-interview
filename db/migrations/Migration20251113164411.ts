import { Migration } from '@mikro-orm/migrations';

export class Migration20251113164411 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "health_system" ("id" serial primary key, "name" varchar(255) not null, "location" varchar(255) not null, "description" text null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "email" varchar(255) not null, "name" varchar(255) not null, "role" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "vendor" ("id" serial primary key, "name" varchar(255) not null, "category" varchar(255) not null, "description" text null, "website" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "health_system_vendors" ("health_system_id" int not null, "vendor_id" int not null, constraint "health_system_vendors_pkey" primary key ("health_system_id", "vendor_id"));`);

    this.addSql(`alter table "health_system_vendors" add constraint "health_system_vendors_health_system_id_foreign" foreign key ("health_system_id") references "health_system" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "health_system_vendors" add constraint "health_system_vendors_vendor_id_foreign" foreign key ("vendor_id") references "vendor" ("id") on update cascade on delete cascade;`);
  }

}
