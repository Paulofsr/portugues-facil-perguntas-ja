
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">API Crypto Client</h1>
      <p className="text-lg mb-8">
        Bem-vindo ao cliente de API para a coleção Crypto. Este aplicativo permite interagir com os endpoints da API de forma intuitiva.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cliente de API</CardTitle>
            <CardDescription>
              Interface para interagir com os endpoints da API Crypto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Ferramenta para realizar requisições GET e POST para os diferentes endpoints da API.
              Configure a URL base e comece a explorar e testar a API.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/api-client">
              <Button>Acessar Cliente</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sobre</CardTitle>
            <CardDescription>
              Informações sobre o projeto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Esta aplicação foi desenvolvida para facilitar o acesso e teste dos endpoints da API Crypto.
              Utilize as diferentes seções para acessar os grupos de endpoints: Prices, Config, Stats e Orders.
            </p>
            <p className="mt-4">
              Para começar, acesse o Cliente de API e configure a URL base da API.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
