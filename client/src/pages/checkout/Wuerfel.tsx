import React from "react";
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WuerfelCheckout() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-bold text-3xl md:text-4xl px--2 py-2 text-center mb-8">
          Checkout - Würfel
        </h1>
        
        <Card>
          <CardContent className="py-4">
            <p className="text-center py-4">
              Der Checkout-Bereich wird gerade überarbeitet.
            </p>
            <div className="flex justify-center mt-4">
              <Link href="/">
                <Button>Zurück zur Startseite</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
