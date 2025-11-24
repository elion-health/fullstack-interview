import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import config from "./config";
import { User } from "./entities/User";
import { HealthSystem } from "./entities/HealthSystem";
import { Vendor } from "./entities/Vendor";
import { Product } from "./entities/Product";

async function seed() {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();

  console.log("🌱 Seeding database...");

  // Clear existing data (order matters due to relationships)
  await em.nativeDelete(User, {});
  await em.nativeDelete(HealthSystem, {});
  await em.nativeDelete(Product, {});
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

  // Seed Products for each vendor
  const productsData = [
    // Epic Systems products
    {
      vendorName: "Epic Systems",
      products: [
        {
          name: "EpicCare",
          category: "Clinical Module",
          description: "Ambulatory EHR for outpatient care",
          version: "2024.1",
        },
        {
          name: "Hyperspace",
          category: "User Interface",
          description: "Unified user interface for Epic applications",
          version: "2024.1",
        },
        {
          name: "MyChart",
          category: "Patient Portal",
          description: "Patient engagement and communication platform",
          version: "2024.1",
        },
        {
          name: "Cogito",
          category: "Analytics",
          description: "Operational analytics and reporting",
          version: "2024.1",
        },
      ],
    },
    // Cerner products
    {
      vendorName: "Cerner (Oracle Health)",
      products: [
        {
          name: "PowerChart",
          category: "Clinical Module",
          description: "Clinical documentation and charting",
          version: "2023.5",
        },
        {
          name: "Millennium",
          category: "Platform",
          description: "Core EHR platform",
          version: "2023.5",
        },
        {
          name: "HealtheIntent",
          category: "Population Health",
          description: "Cloud-based population health management",
          version: "2023.5",
        },
      ],
    },
    // Meditech products
    {
      vendorName: "Meditech",
      products: [
        {
          name: "Expanse",
          category: "Platform",
          description: "Web-based EHR platform",
          version: "6.1",
        },
        {
          name: "Patient and Consumer Health Portal",
          category: "Patient Portal",
          description: "Patient engagement solution",
          version: "6.1",
        },
      ],
    },
    // Health Catalyst products
    {
      vendorName: "Health Catalyst",
      products: [
        {
          name: "Data Operating System (DOS)",
          category: "Data Platform",
          description: "Healthcare data warehouse and analytics platform",
          version: "8.2",
        },
        {
          name: "Population Builder",
          category: "Analytics",
          description: "Patient cohort identification and management",
          version: "8.2",
        },
        {
          name: "Healthcare.AI",
          category: "AI/ML Platform",
          description: "Machine learning and predictive analytics",
          version: "3.1",
        },
      ],
    },
    // Tableau Healthcare products
    {
      vendorName: "Tableau Healthcare",
      products: [
        {
          name: "Tableau Desktop",
          category: "Analytics",
          description: "Visual analytics authoring tool",
          version: "2024.2",
        },
        {
          name: "Tableau Server",
          category: "Platform",
          description: "Enterprise analytics platform",
          version: "2024.2",
        },
        {
          name: "Healthcare Analytics Accelerators",
          category: "Templates",
          description: "Pre-built healthcare dashboards and templates",
          version: "2024.1",
        },
      ],
    },
    // Teladoc Health products
    {
      vendorName: "Teladoc Health",
      products: [
        {
          name: "General Medical",
          category: "Virtual Care",
          description: "24/7 general medical virtual visits",
          version: "5.0",
        },
        {
          name: "Mental Health",
          category: "Behavioral Health",
          description: "Virtual therapy and psychiatry services",
          version: "5.0",
        },
        {
          name: "Chronic Care",
          category: "Care Management",
          description: "Remote monitoring for chronic conditions",
          version: "5.0",
        },
      ],
    },
    // Amwell products
    {
      vendorName: "Amwell",
      products: [
        {
          name: "Amwell Platform",
          category: "Telehealth Platform",
          description: "Comprehensive telehealth solution",
          version: "2024",
        },
        {
          name: "Converge",
          category: "Integration",
          description: "EHR integration and workflow embedding",
          version: "2024",
        },
        {
          name: "Automated Care Programs",
          category: "Care Management",
          description: "AI-powered automated care pathways",
          version: "2024",
        },
      ],
    },
    // Change Healthcare products
    {
      vendorName: "Change Healthcare",
      products: [
        {
          name: "Revenue Cycle Management",
          category: "Revenue Cycle",
          description: "End-to-end revenue cycle automation",
          version: "2023.4",
        },
        {
          name: "Payment Integrity",
          category: "Claims Management",
          description: "Claims editing and validation",
          version: "2023.4",
        },
        {
          name: "Intelligent Healthcare Network",
          category: "Platform",
          description: "Cloud-based healthcare transaction platform",
          version: "2023.4",
        },
      ],
    },
  ];

  let totalProducts = 0;
  for (const vendorProducts of productsData) {
    const vendor = vendors.find((v) => v.name === vendorProducts.vendorName);
    if (vendor) {
      for (const productData of vendorProducts.products) {
        const product = em.create(Product, {
          ...productData,
          vendor,
        });
        em.persist(product);
        totalProducts++;
      }
    }
  }

  console.log(
    `✓ Created ${totalProducts} products across ${vendors.length} vendors`,
  );

  // Seed Health Systems
  const healthSystemsData = [
    {
      name: "Massachusetts General Hospital",
      location: "Boston, MA",
      description:
        "Leading academic medical center and teaching hospital of Harvard Medical School",
    },
    {
      name: "Cleveland Clinic",
      location: "Cleveland, OH",
      description:
        "Nonprofit multispecialty academic medical center with integrated hospital care",
    },
    {
      name: "Mayo Clinic",
      location: "Rochester, MN",
      description:
        "Nonprofit American academic medical center focused on integrated health care, education, and research",
    },
    {
      name: "Johns Hopkins Hospital",
      location: "Baltimore, MD",
      description:
        "Teaching hospital and biomedical research facility of Johns Hopkins University",
    },
    {
      name: "UCSF Medical Center",
      location: "San Francisco, CA",
      description:
        "Research and teaching hospital that serves as the academic medical center of the University of California",
    },
  ];

  for (const systemData of healthSystemsData) {
    const system = em.create(HealthSystem, systemData as any);
    em.persist(system);
  }

  console.log(`✓ Created ${healthSystemsData.length} health systems`);

  await em.flush();

  console.log("✅ Database seeded successfully!");

  await orm.close();
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
