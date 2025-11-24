"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HealthSystem {
  id: number;
  name: string;
  location: string;
  description?: string;
  createdAt: string;
}

export default function HealthSystemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [healthSystem, setHealthSystem] = useState<HealthSystem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/health-systems/${params.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Health system not found");
        }
        return res.json();
      })
      .then((result) => {
        setHealthSystem(result.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !healthSystem) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {error || "Health system not found"}
            </p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="mb-4"
        >
          ← Back to Directory
        </Button>
        <h1 className="text-3xl font-bold mb-2">{healthSystem.name}</h1>
        <p className="text-lg text-muted-foreground">{healthSystem.location}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {healthSystem.description || "No description available"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products & Vendors</CardTitle>
          <CardDescription>
            Products and vendors used by this health system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            I'm sure some cool products should go here...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
