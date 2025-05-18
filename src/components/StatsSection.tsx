
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiResponse } from "@/pages/ApiClient";

interface StatsSectionProps {
  handleApiCall: (method: string, endpoint: string, body?: object) => Promise<ApiResponse | null>;
  loading: boolean;
}

const StatsSection: React.FC<StatsSectionProps> = ({ handleApiCall, loading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas</CardTitle>
        <CardDescription>Obtenha estatísticas da API</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => handleApiCall("GET", "/stats")}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Carregando..." : "Get Stats"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default StatsSection;
