
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface ApiUrlFormProps {
  baseUrl: string;
  setBaseUrl: (url: string) => void;
}

const ApiUrlForm: React.FC<ApiUrlFormProps> = ({ baseUrl, setBaseUrl }) => {
  const [inputUrl, setInputUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let url = inputUrl.trim();
    
    // Remove trailing slash if present
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    
    if (!url) {
      toast.error("Por favor, digite uma URL válida");
      return;
    }
    
    // Check if the URL has a valid format
    try {
      new URL(url);
      setBaseUrl(url);
      toast.success("URL da API configurada com sucesso");
    } catch (err) {
      toast.error("URL inválida. Por favor, inclua o protocolo (http:// ou https://)");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurar URL da API</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <Input 
            placeholder="Informe a URL base da API (ex: https://api.example.com)"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Salvar</Button>
        </form>
        {baseUrl && (
          <div className="mt-3 text-sm text-muted-foreground">
            URL Base Atual: <span className="font-medium text-foreground">{baseUrl}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiUrlForm;
