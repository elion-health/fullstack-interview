import { Migration } from '@mikro-orm/migrations';

export class Migration20251204220000 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "health_system" ("id" serial primary key, "name" varchar(255) not null, "location" varchar(255) not null, "description" text null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "email" varchar(255) not null, "name" varchar(255) not null, "role" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "vendor" ("id" serial primary key, "name" varchar(255) not null, "category" varchar(255) not null, "description" text null, "website" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "product" ("id" serial primary key, "name" varchar(255) not null, "description" text null, "category" varchar(255) null, "version" varchar(255) null, "vendor_id" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`alter table "product" add constraint "product_vendor_id_foreign" foreign key ("vendor_id") references "vendor" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "product" cascade;`);
    this.addSql(`drop table if exists "vendor" cascade;`);
    this.addSql(`drop table if exists "user" cascade;`);
    this.addSql(`drop table if exists "health_system" cascade;`);
  }

}
