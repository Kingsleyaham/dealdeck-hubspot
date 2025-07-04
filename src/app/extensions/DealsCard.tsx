import { Button, CrmContext, Flex, hubspot, Text } from "@hubspot/ui-extensions";
import React, { useEffect, useState } from "react";
import ConnectedDeckView from "./components/ConnectedDeckView";
import CreateDealDeckModal from "./components/CreateDealDeckModal";

interface IProps {
  actions: any;
  fetchProperties: any;
  context: CrmContext;
  addAlert: any;
}

const DealsCard = ({ actions, fetchProperties, context, addAlert }: IProps) => {
  const [currentDeal, setCurrentDeal] = useState<any>(null);
  const [ownerInfo, setOwnerInfo] = useState<any>();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Get the current deal ID from context
    const dealId = context?.crm?.objectId;

    if (dealId && !currentDeal) {
      fetchDealData(dealId);
    }
  }, [context?.crm?.objectId]);

  useEffect(() => {
    setOwnerInfo(context.user);
  }, [context?.user]);

  const fetchDealData = async (dealId: string | number) => {
    try {
      const deal = await fetchProperties(["dealname", "amount", "hubspot_owner_id", "associatedcompanyid"], dealId);
      setCurrentDeal({ id: dealId, ...deal });
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      {isConnected ? (
        <ConnectedDeckView addAlert={addAlert} />
      ) : (
        <Flex direction="column" align="center" gap="medium">
          <Text variant="bodytext">Create a shared DealDeck for your prospect and link it to this record</Text>
          <Button
            variant="primary"
            type="button"
            size="sm"
            overlay={
              <CreateDealDeckModal actions={actions} deal={currentDeal?.dealname} setIsConnected={setIsConnected} />
            }
          >
            Create DealDeck
          </Button>
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
