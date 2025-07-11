import { Button, EmptyState, Text } from "@hubspot/ui-extensions";
import React from "react";

const NotIntegrated = () => {
  return (
    <EmptyState title="Kindly integrate hubspot to DealDeck" layout="vertical" reverseOrder={true} imageWidth={100}>
      <Text>Kindly visit DealDeck and connect to Hubspot</Text>
      <Button size="sm" variant="primary" href="https://dev.d1i8gtw7s4jtl.amplifyapp.com/en/app/integrations">
        Connect To DealDeck
      </Button>
    </EmptyState>
  );
};

export default NotIntegrated;
