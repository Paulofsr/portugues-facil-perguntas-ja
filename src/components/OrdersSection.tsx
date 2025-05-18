
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiResponse } from "@/pages/ApiClient";

interface OrdersSectionProps {
  handleApiCall: (method: string, endpoint: string, body?: object) => Promise<ApiResponse | null>;
  loading: boolean;
}

const OrdersSection: React.FC<OrdersSectionProps> = ({ handleApiCall, loading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ordens</CardTitle>
        <CardDescription>Obtenha informações sobre ordens</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => handleApiCall("GET", "/orders")}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Carregando..." : "Get Orders"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrdersSection;
