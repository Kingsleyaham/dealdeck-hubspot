import { Button, Flex, Text } from "@hubspot/ui-extensions";
import React from "react";

const DealsCard = () => {
  return (
    <Flex direction="column" align="center" gap="medium">
      <Text>Create a Dealdeck from inside Hubspot</Text>
      <Button variant="secondary" type="button" size="md">
        Create Deck
      </Button>
    </Flex>
  );
};

export default DealsCard;
