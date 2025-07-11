import { Button, CrmContext, Flex, hubspot, Text } from "@hubspot/ui-extensions";
import React, { useEffect, useState } from "react";
import ConnectedDeckView from "./components/ConnectedDeckView";
import CreateDealDeckModal from "./components/CreateDealDeckModal";
import NotIntegrated from "./components/NotIntegrated";
import { API_BASE_URL } from "./config";

interface IProps {
  actions: any;
  fetchProperties: any;
  context: CrmContext;
  addAlert: any;
}

const DealsCard = ({ actions, fetchProperties, context, addAlert }: IProps) => {
  const [currentDeal, setCurrentDeal] = useState<any>(null);
  const [ownerInfo, setOwnerInfo] = useState<any>();
  const [isConnected, setIsConnected] = useState(false);
  const [hasIntegrated, setHasIntegrated] = useState(false);
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    // Get the current deal ID from context
    const dealId = context?.crm?.objectId;

    if (dealId) {
      !currentDeal && fetchDealData(dealId);
      checkIfUserIsConnected();
    }
  }, [context?.crm?.objectId]);

  useEffect(() => {
    setOwnerInfo(context.user);
  }, [context?.user]);

  const fetchDealData = async (dealId: string | number) => {
    try {
      const deal = await fetchProperties(["dealname", "amount", "hubspot_owner_id", "associatedcompnyid"], dealId);
      setCurrentDeal({ id: dealId, ...deal });
    } catch (error) {
      console.error("Error", error);
    }
  };

  const checkIfUserIsConnected = async () => {
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
    } catch (error) {
      setHasIntegrated(false);
      console.error("An error occurred: ", error);
    }
  };

  return (
    <>
      {!hasIntegrated ? (
        <NotIntegrated />
      ) : isConnected ? (
        <ConnectedDeckView addAlert={addAlert} />
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
          {account && <Text>{JSON.stringify(account)}</Text>}
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
