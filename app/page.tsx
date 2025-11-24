"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Vendor {
  id: number;
  name: string;
  category: string;
  description?: string;
  website?: string;
  createdAt: string;
}

interface HealthSystem {
  id: number;
  name: string;
  location: string;
  description?: string;
  createdAt: string;
}

export default function Home() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [healthSystems, setHealthSystems] = useState<HealthSystem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/vendors").then((res) => res.json()),
      fetch("/api/health-systems").then((res) => res.json()),
    ])
      .then(([vendorsResult, healthSystemsResult]) => {
        setVendors(vendorsResult.data);
        setHealthSystems(healthSystemsResult.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Elion AI Research Assistant</h1>
        <p className="text-muted-foreground">
          Intelligence platform for Health IT leaders
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Healthcare Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          {vendors.length === 0 ? (
            <p className="text-muted-foreground">
              No vendors found. Run <code>npm run db:seed</code> to add sample
              data.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow
                    key={vendor.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">
                      <Link
                        href={`/vendors/${vendor.id}`}
                        className="text-primary hover:underline"
                      >
                        {vendor.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{vendor.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {vendor.description || "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health Systems Directory</CardTitle>
        </CardHeader>
        <CardContent>
          {healthSystems.length === 0 ? (
            <p className="text-muted-foreground">
              No health systems found. Run <code>npm run db:seed</code> to add
              sample data.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {healthSystems.map((system) => (
                  <TableRow
                    key={system.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">
                      <Link
                        href={`/health-systems/${system.id}`}
                        className="text-primary hover:underline"
                      >
                        {system.name}
                      </Link>
                    </TableCell>
                    <TableCell>{system.location}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {system.description || "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
