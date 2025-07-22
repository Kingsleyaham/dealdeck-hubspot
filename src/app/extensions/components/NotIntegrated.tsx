import { Button, EmptyState, Text } from "@hubspot/ui-extensions";
import React from "react";
import { CLIENT_BASE_URL } from "../config";

const NotIntegrated = () => {
  return (
    <EmptyState title="Kindly integrate hubspot to DealDeck" layout="vertical" reverseOrder={true} imageWidth={100}>
      <Text>Kindly visit DealDeck and connect to Hubspot</Text>
      <Button size="sm" variant="primary" href={`${CLIENT_BASE_URL}/integrations`}>
        Connect To DealDeck
      </Button>
    </EmptyState>
  );
};

export default NotIntegrated;
