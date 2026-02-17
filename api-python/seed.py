import asyncio
from datetime import datetime, timezone

from sqlalchemy import delete

from app.database import async_session
from app.models.health_system import HealthSystem
from app.models.product import Product
from app.models.user import User
from app.models.vendor import Vendor


async def seed():
    now = datetime.now(timezone.utc)
    async with async_session() as session:
        print("Seeding database...")

        # Clear existing data (order matters due to foreign keys)
        await session.execute(delete(Product))
        await session.execute(delete(User))
        await session.execute(delete(HealthSystem))
        await session.execute(delete(Vendor))
        await session.flush()

        # Seed Users
        users_data = [
            {"email": "john.smith@massgenhospital.org", "name": "John Smith", "role": "CIO"},
            {"email": "sarah.johnson@clevelandclinic.org", "name": "Sarah Johnson", "role": "CMIO"},
            {"email": "michael.chen@mayoclinic.org", "name": "Michael Chen", "role": "IT Director"},
            {"email": "emily.davis@jhmi.edu", "name": "Emily Davis", "role": "VP of Health IT"},
        ]
        for u in users_data:
            session.add(User(**u, created_at=now, updated_at=now))
        print(f"  Created {len(users_data)} users")

        # Seed Vendors
        vendors_data = [
            {"name": "Epic Systems", "category": "EHR", "description": "Leading electronic health records system", "website": "https://www.epic.com"},
            {"name": "Cerner (Oracle Health)", "category": "EHR", "description": "Enterprise healthcare IT solutions", "website": "https://www.oracle.com/health/"},
            {"name": "Meditech", "category": "EHR", "description": "Healthcare information systems", "website": "https://www.meditech.com"},
            {"name": "Health Catalyst", "category": "Analytics", "description": "Data and analytics platform for healthcare", "website": "https://www.healthcatalyst.com"},
            {"name": "Tableau Healthcare", "category": "Analytics", "description": "Visual analytics for healthcare data", "website": "https://www.tableau.com"},
            {"name": "Teladoc Health", "category": "Telehealth", "description": "Virtual healthcare services", "website": "https://www.teladochealth.com"},
            {"name": "Amwell", "category": "Telehealth", "description": "Telehealth platform for virtual care", "website": "https://www.amwell.com"},
            {"name": "Change Healthcare", "category": "Revenue Cycle", "description": "Revenue cycle management solutions", "website": "https://www.changehealthcare.com"},
        ]
        vendors = {}
        for v in vendors_data:
            vendor = Vendor(**v, created_at=now, updated_at=now)
            session.add(vendor)
            vendors[v["name"]] = vendor
        await session.flush()  # flush to get vendor IDs
        print(f"  Created {len(vendors_data)} vendors")

        # Seed Products
        products_data = [
            ("Epic Systems", [
                {"name": "EpicCare", "category": "Clinical Module", "description": "Ambulatory EHR for outpatient care", "version": "2024.1"},
                {"name": "Hyperspace", "category": "User Interface", "description": "Unified user interface for Epic applications", "version": "2024.1"},
                {"name": "MyChart", "category": "Patient Portal", "description": "Patient engagement and communication platform", "version": "2024.1"},
                {"name": "Cogito", "category": "Analytics", "description": "Operational analytics and reporting", "version": "2024.1"},
            ]),
            ("Cerner (Oracle Health)", [
                {"name": "PowerChart", "category": "Clinical Module", "description": "Clinical documentation and charting", "version": "2023.5"},
                {"name": "Millennium", "category": "Platform", "description": "Core EHR platform", "version": "2023.5"},
                {"name": "HealtheIntent", "category": "Population Health", "description": "Cloud-based population health management", "version": "2023.5"},
            ]),
            ("Meditech", [
                {"name": "Expanse", "category": "Platform", "description": "Web-based EHR platform", "version": "6.1"},
                {"name": "Patient and Consumer Health Portal", "category": "Patient Portal", "description": "Patient engagement solution", "version": "6.1"},
            ]),
            ("Health Catalyst", [
                {"name": "Data Operating System (DOS)", "category": "Data Platform", "description": "Healthcare data warehouse and analytics platform", "version": "8.2"},
                {"name": "Population Builder", "category": "Analytics", "description": "Patient cohort identification and management", "version": "8.2"},
                {"name": "Healthcare.AI", "category": "AI/ML Platform", "description": "Machine learning and predictive analytics", "version": "3.1"},
            ]),
            ("Tableau Healthcare", [
                {"name": "Tableau Desktop", "category": "Analytics", "description": "Visual analytics authoring tool", "version": "2024.2"},
                {"name": "Tableau Server", "category": "Platform", "description": "Enterprise analytics platform", "version": "2024.2"},
                {"name": "Healthcare Analytics Accelerators", "category": "Templates", "description": "Pre-built healthcare dashboards and templates", "version": "2024.1"},
            ]),
            ("Teladoc Health", [
                {"name": "General Medical", "category": "Virtual Care", "description": "24/7 general medical virtual visits", "version": "5.0"},
                {"name": "Mental Health", "category": "Behavioral Health", "description": "Virtual therapy and psychiatry services", "version": "5.0"},
                {"name": "Chronic Care", "category": "Care Management", "description": "Remote monitoring for chronic conditions", "version": "5.0"},
            ]),
            ("Amwell", [
                {"name": "Amwell Platform", "category": "Telehealth Platform", "description": "Comprehensive telehealth solution", "version": "2024"},
                {"name": "Converge", "category": "Integration", "description": "EHR integration and workflow embedding", "version": "2024"},
                {"name": "Automated Care Programs", "category": "Care Management", "description": "AI-powered automated care pathways", "version": "2024"},
            ]),
            ("Change Healthcare", [
                {"name": "Revenue Cycle Management", "category": "Revenue Cycle", "description": "End-to-end revenue cycle automation", "version": "2023.4"},
                {"name": "Payment Integrity", "category": "Claims Management", "description": "Claims editing and validation", "version": "2023.4"},
                {"name": "Intelligent Healthcare Network", "category": "Platform", "description": "Cloud-based healthcare transaction platform", "version": "2023.4"},
            ]),
        ]

        total_products = 0
        for vendor_name, products in products_data:
            vendor = vendors[vendor_name]
            for p in products:
                session.add(Product(**p, vendor_id=vendor.id, created_at=now, updated_at=now))
                total_products += 1
        print(f"  Created {total_products} products across {len(vendors)} vendors")

        # Seed Health Systems
        health_systems_data = [
            {"name": "Massachusetts General Hospital", "location": "Boston, MA", "description": "Leading academic medical center and teaching hospital of Harvard Medical School"},
            {"name": "Cleveland Clinic", "location": "Cleveland, OH", "description": "Nonprofit multispecialty academic medical center with integrated hospital care"},
            {"name": "Mayo Clinic", "location": "Rochester, MN", "description": "Nonprofit American academic medical center focused on integrated health care, education, and research"},
            {"name": "Johns Hopkins Hospital", "location": "Baltimore, MD", "description": "Teaching hospital and biomedical research facility of Johns Hopkins University"},
            {"name": "UCSF Medical Center", "location": "San Francisco, CA", "description": "Research and teaching hospital that serves as the academic medical center of the University of California"},
        ]
        for hs in health_systems_data:
            session.add(HealthSystem(**hs, created_at=now, updated_at=now))
        print(f"  Created {len(health_systems_data)} health systems")

        await session.commit()

    print("Database seeded successfully!")


if __name__ == "__main__":
    asyncio.run(seed())
