
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApiUrlForm from "@/components/ApiUrlForm";
import PricesSection from "@/components/PricesSection";
import ConfigSection from "@/components/ConfigSection";
import StatsSection from "@/components/StatsSection";
import OrdersSection from "@/components/OrdersSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

export type ApiResponse = {
  data: any;
  status: number;
  statusText: string;
  headers: Record<string, string>;
};

const ApiClient: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("prices");
  const [loading, setLoading] = useState<boolean>(false);
  const [lastResponse, setLastResponse] = useState<ApiResponse | null>(null);

  const handleApiCall = async (
    method: string,
    endpoint: string,
    body?: object
  ) => {
    if (!baseUrl) {
      toast.error("Por favor, defina a URL da API primeiro");
      return null;
    }

    setLoading(true);
    const url = `${baseUrl}${endpoint}`;

    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      const apiResponse: ApiResponse = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      };

      setLastResponse(apiResponse);
      
      if (response.ok) {
        toast.success(`${method} ${endpoint} - Sucesso (${response.status})`);
      } else {
        toast.error(`${method} ${endpoint} - Erro (${response.status})`);
      }

      return apiResponse;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(`Erro ao acessar ${url}: ${errorMessage}`);
      
      setLastResponse({
        data: { error: errorMessage },
        status: 0,
        statusText: "Network Error",
        headers: {},
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">API Crypto Client</h1>
      
      <ApiUrlForm baseUrl={baseUrl} setBaseUrl={setBaseUrl} />
      
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-6"
      >
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="prices">Prices</TabsTrigger>
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="prices">
          <PricesSection handleApiCall={handleApiCall} loading={loading} />
        </TabsContent>

        <TabsContent value="config">
          <ConfigSection handleApiCall={handleApiCall} loading={loading} />
        </TabsContent>

        <TabsContent value="stats">
          <StatsSection handleApiCall={handleApiCall} loading={loading} />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersSection handleApiCall={handleApiCall} loading={loading} />
        </TabsContent>
      </Tabs>

      {lastResponse && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Última Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto max-h-96">
              <div className="mb-2">
                <span className="font-bold">Status:</span> {lastResponse.status} {lastResponse.statusText}
              </div>
              <div className="mb-4">
                <span className="font-bold">Headers:</span>
                <pre className="text-xs mt-1">
                  {JSON.stringify(lastResponse.headers, null, 2)}
                </pre>
              </div>
              <div>
                <span className="font-bold">Resposta:</span>
                <pre className="text-xs mt-1 overflow-auto">
                  {typeof lastResponse.data === "string" 
                    ? lastResponse.data 
                    : JSON.stringify(lastResponse.data, null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApiClient;
