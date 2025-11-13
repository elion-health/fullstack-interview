import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import config from "./config";
import { User } from "./entities/User";
import { HealthSystem } from "./entities/HealthSystem";
import { Vendor } from "./entities/Vendor";

async function seed() {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();

  console.log("🌱 Seeding database...");

  // Clear existing data (order matters due to relationships)
  await em.nativeDelete(User, {});
  await em.nativeDelete(HealthSystem, {});
  await em.nativeDelete(Vendor, {});

  // Seed Users
  const users = [
    {
      email: "john.smith@massgenhospital.org",
      name: "John Smith",
      role: "CIO",
    },
    {
      email: "sarah.johnson@clevelandclinic.org",
      name: "Sarah Johnson",
      role: "CMIO",
    },
    {
      email: "michael.chen@mayoclinic.org",
      name: "Michael Chen",
      role: "IT Director",
    },
    {
      email: "emily.davis@jhmi.edu",
      name: "Emily Davis",
      role: "VP of Health IT",
    },
  ];

  for (const userData of users) {
    const user = em.create(User, userData as any);
    em.persist(user);
  }

  console.log(`✓ Created ${users.length} users`);

  // Seed Vendors
  const vendorsData = [
    {
      name: "Epic Systems",
      category: "EHR",
      description: "Leading electronic health records system",
      website: "https://www.epic.com",
    },
    {
      name: "Cerner (Oracle Health)",
      category: "EHR",
      description: "Enterprise healthcare IT solutions",
      website: "https://www.oracle.com/health/",
    },
    {
      name: "Meditech",
      category: "EHR",
      description: "Healthcare information systems",
      website: "https://www.meditech.com",
    },
    {
      name: "Health Catalyst",
      category: "Analytics",
      description: "Data and analytics platform for healthcare",
      website: "https://www.healthcatalyst.com",
    },
    {
      name: "Tableau Healthcare",
      category: "Analytics",
      description: "Visual analytics for healthcare data",
      website: "https://www.tableau.com",
    },
    {
      name: "Teladoc Health",
      category: "Telehealth",
      description: "Virtual healthcare services",
      website: "https://www.teladochealth.com",
    },
    {
      name: "Amwell",
      category: "Telehealth",
      description: "Telehealth platform for virtual care",
      website: "https://www.amwell.com",
    },
    {
      name: "Change Healthcare",
      category: "Revenue Cycle",
      description: "Revenue cycle management solutions",
      website: "https://www.changehealthcare.com",
    },
  ];

  const vendors: Vendor[] = [];
  for (const vendorData of vendorsData) {
    const vendor = em.create(Vendor, vendorData as any);
    em.persist(vendor);
    vendors.push(vendor);
  }

  console.log(`✓ Created ${vendors.length} vendors`);

  // Seed Health Systems with vendor relationships
  const healthSystemsData = [
    {
      name: "Massachusetts General Hospital",
      location: "Boston, MA",
      description:
        "Leading academic medical center and teaching hospital of Harvard Medical School",
      vendorNames: ["Epic Systems", "Health Catalyst", "Teladoc Health"],
    },
    {
      name: "Cleveland Clinic",
      location: "Cleveland, OH",
      description:
        "Nonprofit multispecialty academic medical center with integrated hospital care",
      vendorNames: ["Epic Systems", "Tableau Healthcare", "Amwell"],
    },
    {
      name: "Mayo Clinic",
      location: "Rochester, MN",
      description:
        "Nonprofit American academic medical center focused on integrated health care, education, and research",
      vendorNames: ["Epic Systems", "Health Catalyst", "Change Healthcare"],
    },
    {
      name: "Johns Hopkins Hospital",
      location: "Baltimore, MD",
      description:
        "Teaching hospital and biomedical research facility of Johns Hopkins University",
      vendorNames: ["Epic Systems", "Tableau Healthcare", "Teladoc Health"],
    },
    {
      name: "UCSF Medical Center",
      location: "San Francisco, CA",
      description:
        "Research and teaching hospital that serves as the academic medical center of the University of California",
      vendorNames: [
        "Cerner (Oracle Health)",
        "Health Catalyst",
        "Amwell",
        "Change Healthcare",
      ],
    },
  ];

  for (const systemData of healthSystemsData) {
    const { vendorNames, ...systemInfo } = systemData;
    const system = em.create(HealthSystem, systemInfo as any);

    // Add vendors to health system
    for (const vendorName of vendorNames) {
      const vendor = vendors.find((v) => v.name === vendorName);
      if (vendor) {
        system.vendors.add(vendor);
      }
    }

    em.persist(system);
  }

  console.log(
    `✓ Created ${healthSystemsData.length} health systems with vendor relationships`,
  );

  await em.flush();

  console.log("✅ Database seeded successfully!");

  await orm.close();
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
