'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Product {
  id: number;
  name: string;
  description?: string;
  category?: string;
  version?: string;
}

interface Vendor {
  id: number;
  name: string;
  category: string;
  description?: string;
  website?: string;
  products: Product[];
  createdAt: string;
}

export default function VendorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/vendors/${params.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Vendor not found');
        }
        return res.json();
      })
      .then((result) => {
        setVendor(result.data);
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

  if (error || !vendor) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {error || 'Vendor not found'}
            </p>
            <Button onClick={() => router.push('/')} className="mt-4">
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
          onClick={() => router.push('/')}
          className="mb-4"
        >
          ← Back to Home
        </Button>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{vendor.name}</h1>
          <Badge variant="secondary" className="text-base">
            {vendor.category}
          </Badge>
        </div>
        {vendor.website && (
          <a
            href={vendor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {vendor.website} →
          </a>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {vendor.description || 'No description available'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Products offered by {vendor.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {vendor.products.length === 0 ? (
            <p className="text-muted-foreground">
              No products found for this vendor.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendor.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      {product.category && (
                        <Badge variant="outline">{product.category}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.version || 'N/A'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.description || 'N/A'}
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
