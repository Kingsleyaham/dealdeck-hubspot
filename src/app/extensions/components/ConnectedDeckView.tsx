import { Box, Button, Dropdown, Flex, hubspot, Icon, Link, Text } from "@hubspot/ui-extensions";
import React from "react";
import { API_BASE_URL, CLIENT_BASE_URL } from "../config";
import { DECK_EDIT_URL, DECK_VIEW_URL } from "../constants";
import { IDealDeckData } from "../types/card";
import { toTitleCase } from "../utils/helper";

interface IProps {
  addAlert: any;
  deckData: IDealDeckData | null;
  fetchDealDeckData: (dealId: number) => Promise<void>;
  dealId: number;
  actions?: any;
}

const ConnectedDeckView = ({ addAlert, deckData, fetchDealDeckData, dealId, actions }: IProps) => {
  const handleCopyShareLink = async () => {
    const copyText = `${DECK_VIEW_URL}/${deckData?.id}?track=false`;

    await actions.copyTextToClipboard(copyText);

    setTimeout(() => {
      addAlert({
        type: "success",
        message: "Copied!",
      });
    }, 500);
  };

  const ddOptions = [
    {
      label: "Analytics",
      onClick: () => handleViewAnalytics(),
    },

    {
      label: "Delete",
      onClick: () => handleDeleteDeck(),
    },
  ];

  const handleDeleteDeck = async () => {
    const url = `${API_BASE_URL}/inward/api/hubspot/deck/delete`;
    try {
      const response = await hubspot.fetch(url, {
        method: "POST",
        body: { dealId },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      fetchDealDeckData(dealId);

      addAlert({
        type: "success",
        message: "DealDeck deleted successfully",
      });
    } catch (error) {
      addAlert({
        type: "danger",
        message: "Error deleting DealDeck",
      });
      console.error("An error occurred: ", error);
    }
  };

  const handleViewAnalytics = async () => {
    const token = (await fetchAnalyticsAuth())?.apiKey;
    const encodeDeckTitle = encodeURIComponent(deckData?.name ?? "");
    const iframeUrl = `${CLIENT_BASE_URL}/int/analytics/${deckData?.id}?deckId=${deckData?.id}&apiKey=${token}&deckTitle=${encodeDeckTitle}`;

    // window.open(url, "_blank");
    actions.openIframeModal({
      uri: iframeUrl,
      height: 1000,
      width: 1200,
      title: "DealDeck Analytics",
      flush: true,
    });
  };

  const fetchAnalyticsAuth = async () => {
    const url = `${API_BASE_URL}/inward/api/hubspot/token/get`;
    try {
      const response = await hubspot.fetch(url, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as { apiKey: string; organizationId: string; expiresInMinutes: number };

      return data;
    } catch (error) {
      addAlert({
        type: "danger",
        message: "Error occurred authenticating analytics view",
      });
      console.error("An error occurred: ", error);
    }
  };

  return (
    <Flex direction="column" gap="sm">
      <Flex direction="row" gap="xs" align="center" alignSelf="center" justify="start">
        <Link href={`${DECK_VIEW_URL}/${deckData?.id}?track=false`}>View DealDeck&nbsp;</Link>
        <Link href={`${DECK_EDIT_URL}/${deckData?.id}`}>Edit DealDeck&nbsp;</Link>
      </Flex>
      <Box>
        <Box>
          <Flex direction="row" gap="xs" align="center">
            <Icon name="text" size="sm" />
            <Text format={{ fontWeight: "bold" }} variant="microcopy">
              DealDeck title
            </Text>
          </Flex>
          <Text format={{ fontWeight: "regular" }} variant="microcopy">
            {deckData?.name}
          </Text>
        </Box>
        <Box>
          <Flex direction="row" gap="xs" align="center">
            <Icon name="reports" size="sm" />
            <Text format={{ fontWeight: "bold" }} variant="bodytext">
              Number of views
            </Text>
          </Flex>
          <Text format={{ fontWeight: "regular" }} variant="microcopy">
            {deckData?.numberOfViews}
            {/* (5h 24m 15s) */}
          </Text>
        </Box>
        <Box>
          <Flex direction="row" gap="xs" align="center">
            <Icon name="rss" size="sm" />
            <Text format={{ fontWeight: "bold" }} variant="bodytext">
              Last engagement
            </Text>
          </Flex>
          <Text format={{ fontWeight: "regular" }} variant="microcopy">
            {deckData?.lastEngagement ? new Date(deckData?.lastEngagement).toLocaleString() : "N/A"}
          </Text>
        </Box>
        <Box>
          <Flex direction="row" gap="xs" align="center">
            <Icon name="contact" size="sm" />
            <Text format={{ fontWeight: "bold" }} variant="bodytext">
              DealDeck Owner
            </Text>
          </Flex>
          <Text format={{ fontWeight: "regular" }} variant="microcopy">
            {toTitleCase(deckData?.dealDeckOwner!)}
          </Text>
        </Box>
      </Box>
      <Flex direction="row" gap="xs">
        <Button size="sm" variant="primary" onClick={handleCopyShareLink}>
          Copy share link
        </Button>
        <Dropdown options={ddOptions} variant="secondary" buttonSize="md" buttonText="More" />
      </Flex>
    </Flex>
  );
};

export default ConnectedDeckView;
