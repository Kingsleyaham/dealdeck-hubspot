import { Button, CrmContext, Flex, hubspot, LoadingSpinner, logger, Text } from "@hubspot/ui-extensions";
import React, { useEffect, useState } from "react";
import ConnectedDeckView from "./components/ConnectedDeckView";
import CreateDealDeckModal from "./components/CreateDealDeckModal";
import NotIntegrated from "./components/NotIntegrated";
import { API_BASE_URL } from "./config";
import { IDealDeckData } from "./types/card";

interface IProps {
  actions: any;
  fetchProperties: any;
  context: CrmContext;
  addAlert: any;
}

const DealsCard = ({ actions, fetchProperties, context, addAlert }: IProps) => {
  const [currentDeal, setCurrentDeal] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hasIntegrated, setHasIntegrated] = useState(false);
  const [account, setAccount] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [deckData, setDeckData] = useState<IDealDeckData | null>(null);

  useEffect(() => {
    // Get the current deal ID from context
    const dealId = context?.crm?.objectId;

    if (dealId) {
      !currentDeal && fetchDealData(dealId);
      checkIfUserIsConnected(dealId);
    }
  }, [context?.crm?.objectId]);

  const fetchDealData = async (dealId: string | number) => {
    try {
      const deal = await fetchProperties(["dealname", "amount", "hubspot_owner_id", "associatedcompnyid"], dealId);
      setCurrentDeal({ id: dealId, ...deal });
    } catch (error) {
      console.error("Error", error);
    }
  };

  const checkIfUserIsConnected = async (dealId: number) => {
    const url = `${API_BASE_URL}/inward/api/hubspot/account`;
    try {
      const response = await hubspot.fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setHasIntegrated(true);
      setAccount(data);

      const dealDeckData = await fetchDealDeckData(dealId);
      setDeckData(dealDeckData);

      setIsFetching(false);
    } catch (error) {
      setHasIntegrated(false);
      setIsFetching(false);
      logger.error(error);
      console.error("An error occurred: ", error);
    }
  };

  const fetchDealDeckData = async (dealId: number) => {
    const url = `${API_BASE_URL}/inward/api/hubspot/deck/view`;
    try {
      const response = await hubspot.fetch(url, {
        method: "POST",
        body: {
          dealId,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setIsConnected(true);

      return data as IDealDeckData;
    } catch (error) {
      logger.error(`An Error occurred ${error}`);
      throw error;
    }
  };

  if (isFetching) {
    return (
      <Flex align="center" justify="center">
        <LoadingSpinner label="Loading..." size="medium" />
      </Flex>
    );
  }

  return (
    <>
      {!hasIntegrated ? (
        <NotIntegrated />
      ) : isConnected ? (
        <ConnectedDeckView addAlert={addAlert} deckData={deckData} />
      ) : (
        <Flex direction="column" align="center" gap="medium">
          <Text variant="bodytext">Create a shared DealDeck for your prospect and link it to this record</Text>
          <Button
            variant="primary"
            type="button"
            size="sm"
            overlay={<CreateDealDeckModal actions={actions} deal={currentDeal} setIsConnected={setIsConnected} />}
          >
            Create DealDeck
          </Button>
          <Text>{currentDeal.id}</Text>
        </Flex>
      )}
    </>
  );
};

hubspot.extend(({ actions, context }) => (
  <DealsCard
    actions={actions}
    fetchProperties={(actions as any).fetchCrmObjectProperties}
    context={context as CrmContext}
    addAlert={(actions as any).addAlert}
  />
));
