import { Button, CrmContext, Flex, hubspot, Text } from "@hubspot/ui-extensions";
import React, { useEffect, useState } from "react";
import CreateDealDeckModal from "./components/CreateDealDeckModal";

interface IProps {
  actions: any;
  fetchProperties: any;
  context: CrmContext;
}

const DealsCard = ({ actions, fetchProperties, context }: IProps) => {
  const [currentDeal, setCurrentDeal] = useState<any>(null);
  const [ownerInfo, setOwnerInfo] = useState<any>();

  console.log("actions", actions);
  console.log("context", context);

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

  useEffect(() => {
    console.log("current deal", currentDeal);
  }, [currentDeal]);

  return (
    <Flex direction="column" align="center" gap="medium">
      <Text variant="bodytext">Create a Dealdeck from inside Hubspot to manage your deals</Text>
      <Button
        variant="secondary"
        type="button"
        size="sm"
        overlay={<CreateDealDeckModal actions={actions} deal={currentDeal?.dealname} />}
      >
        Create Deck
      </Button>
    </Flex>
  );
};

hubspot.extend(({ actions, context }) => (
  <DealsCard
    actions={actions}
    fetchProperties={(actions as any).fetchCrmObjectProperties}
    context={context as CrmContext}
  />
));
