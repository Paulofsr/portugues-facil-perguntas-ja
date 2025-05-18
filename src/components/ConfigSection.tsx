
import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/pages/ApiClient";
import { ArrowDown, ArrowUp, Check, Send } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ConfigSectionProps {
  handleApiCall: (method: string, endpoint: string, body?: object) => Promise<ApiResponse | null>;
  loading: boolean;
}

type ConfigEndpoint = {
  name: string;
  endpoint: string;
  description: string;
};

const CONFIG_ENDPOINTS: ConfigEndpoint[] = [
  { name: "Sensitivity", endpoint: "/config/sensitivity", description: "Configuração de sensibilidade" },
  { name: "Verbose", endpoint: "/config/verbose", description: "Configuração de verbosidade" },
  { name: "Trend Threshold", endpoint: "/config/trend_threshold", description: "Limiar de tendência" },
  { name: "Quantidade Ativos", endpoint: "/config/quantidade_ativos", description: "Quantidade de ativos" },
  { name: "Accuracy", endpoint: "/config/accuracy", description: "Precisão" },
  { name: "Analysis Interval", endpoint: "/config/ANALYSIS_INTERVAL_SECONDS", description: "Intervalo de análise em segundos" },
  { name: "Interval Seconds", endpoint: "/config/INTERVAL_SECONDS", description: "Intervalo em segundos" },
  { name: "Moving Average Window", endpoint: "/config/MOVING_AVERAGE_WINDOW", description: "Janela de média móvel" },
  { name: "Moving Average Window EMA", endpoint: "/config/MOVING_AVERAGE_WINDOW_EMA", description: "Janela de média móvel EMA" },
  { name: "Start Order", endpoint: "/config/START_ORDER", description: "Ordem inicial" },
];

// Lista de configurações de operações de balance
const BALANCE_ENDPOINTS: ConfigEndpoint[] = [
  { name: "Last Position Action", endpoint: "/config/last_position_action", description: "Última ação de posição" },
  { name: "Start Day Position", endpoint: "/config/start_day_position", description: "Posição inicial do dia" },
  { name: "Last Position Price", endpoint: "/config/last_position_price", description: "Último preço de posição" },
  { name: "Order Purchased Total", endpoint: "/config/order_purchased_total", description: "Total comprado" },
  { name: "Quantity Buy", endpoint: "/config/qty_buy", description: "Quantidade para compra" },
  { name: "Order Sold Total", endpoint: "/config/order_sold_total", description: "Total vendido" },
  { name: "Quantity Sell", endpoint: "/config/qty_sell", description: "Quantidade para venda" },
  { name: "Day Balance", endpoint: "/config/day_balance", description: "Balanço diário" },
  { name: "Operations", endpoint: "/config/operations", description: "Operações" },
  { name: "Rate", endpoint: "/config/rate", description: "Taxa" },
  { name: "Bulge", endpoint: "/config/bulge", description: "Abaulamento" },
];

// Lista de outras configurações
const OTHER_ENDPOINTS: ConfigEndpoint[] = [
  { name: "Order Enable", endpoint: "/config/order_enable", description: "Habilitação de ordem" },
  { name: "Order Total", endpoint: "/config/order_total", description: "Total da ordem" },
  { name: "Order Execute Now", endpoint: "/config/order_execute_now", description: "Executar ordem agora" },
  { name: "Action Position", endpoint: "/config/action_position", description: "Posição de ação" },
  { name: "Last Position Value", endpoint: "/config/last_position_value", description: "Último valor de posição" },
];

const ConfigSection: React.FC<ConfigSectionProps> = ({ handleApiCall, loading }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [configValues, setConfigValues] = useState<Record<string, string>>({});

  const handleInputChange = (endpoint: string, value: string) => {
    setConfigValues({
      ...configValues,
      [endpoint]: value,
    });
  };

  const handleGetConfig = (endpoint: string) => {
    handleApiCall("GET", endpoint);
  };

  const handlePostConfig = (endpoint: string) => {
    const value = configValues[endpoint] || "";
    handleApiCall("POST", endpoint, { value });
  };

  const renderConfigItem = (item: ConfigEndpoint) => {
    return (
      <div key={item.endpoint} className="border-b py-4 last:border-b-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGetConfig(item.endpoint)}
                disabled={loading}
              >
                <Send className="h-4 w-4 mr-2" />
                GET
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Valor"
              value={configValues[item.endpoint] || ""}
              onChange={(e) => handleInputChange(item.endpoint, e.target.value)}
              disabled={loading}
            />
            <Button
              variant="default"
              size="sm"
              onClick={() => handlePostConfig(item.endpoint)}
              disabled={loading || !configValues[item.endpoint]}
            >
              <Check className="h-4 w-4 mr-2" />
              POST
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Collapsible 
        open={openSection === "general"} 
        onOpenChange={(open) => setOpenSection(open ? "general" : null)}
      >
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => setOpenSection(openSection === "general" ? null : "general")}>
            <div className="flex justify-between items-center">
              <CardTitle>Configurações Gerais</CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {openSection === "general" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              {CONFIG_ENDPOINTS.map(renderConfigItem)}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible 
        open={openSection === "balance"} 
        onOpenChange={(open) => setOpenSection(open ? "balance" : null)}
      >
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => setOpenSection(openSection === "balance" ? null : "balance")}>
            <div className="flex justify-between items-center">
              <CardTitle>Configurações de Balanço</CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {openSection === "balance" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              {BALANCE_ENDPOINTS.map(renderConfigItem)}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible 
        open={openSection === "other"} 
        onOpenChange={(open) => setOpenSection(open ? "other" : null)}
      >
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => setOpenSection(openSection === "other" ? null : "other")}>
            <div className="flex justify-between items-center">
              <CardTitle>Outras Configurações</CardTitle>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {openSection === "other" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              {OTHER_ENDPOINTS.map(renderConfigItem)}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default ConfigSection;
