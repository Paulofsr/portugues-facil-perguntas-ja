
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiResponse } from "@/pages/ApiClient";

interface PricesSectionProps {
  handleApiCall: (method: string, endpoint: string, body?: object) => Promise<ApiResponse | null>;
  loading: boolean;
}

const PricesSection: React.FC<PricesSectionProps> = ({ handleApiCall, loading }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Informações da API</CardTitle>
          <CardDescription>Obtenha informações gerais da API</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => handleApiCall("GET", "")}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Carregando..." : "Get Root"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preços</CardTitle>
          <CardDescription>Obtenha informações de preços</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => handleApiCall("GET", "/prices")}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Carregando..." : "Get Prices"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricesSection;
