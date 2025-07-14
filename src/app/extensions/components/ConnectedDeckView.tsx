import { Box, Button, Dropdown, Flex, Icon, Link, Text } from "@hubspot/ui-extensions";
import React from "react";
import { DECK_VIEW_URL } from "../constants";
import { IDealDeckData } from "../types/card";
import { copyToClipboard, toTitleCase } from "../utils/helper";

interface IProps {
  addAlert: any;
  deckData: IDealDeckData | null;
}

const ddOptions = [
  {
    label: "Analytics",
    onClick: () => console.log({ message: "Analytics button clicked" }),
  },
  {
    label: "Edit",
    onClick: () => console.log({ message: "Edit buttons clicked" }),
  },
  {
    label: "Delete",
    onClick: () => console.log({ message: "Delete button clicked" }),
  },
];

const ConnectedDeckView = ({ addAlert, deckData }: IProps) => {
  const handleCopyShareLink = async () => {
    const copyText = `${DECK_VIEW_URL}/${deckData?.id}?track=false`;

    copyToClipboard(copyText, (res) => {
      if (res.status === "success") {
        setTimeout(() => {
          addAlert({
            type: "success",
            message: res.message,
          });
        }, 500);
      }
      if (res.status === "error") {
        addAlert({
          type: "info",
          message: `Copy share link ${copyText}`,
        });
      }
    });
  };

  return (
    <Flex direction="column" gap="sm">
      <Flex direction="row" gap="xs" align="center" alignSelf="center" justify="start">
        <Link href={`${DECK_VIEW_URL}/${deckData?.id}?track=false`}>View DealDeck&nbsp;</Link>
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
        <Button size="sm" variant="secondary" onClick={handleCopyShareLink}>
          Copy share link
        </Button>
        <Dropdown options={ddOptions} variant="secondary" buttonSize="md" buttonText="More" />
      </Flex>
    </Flex>
  );
};

export default ConnectedDeckView;
