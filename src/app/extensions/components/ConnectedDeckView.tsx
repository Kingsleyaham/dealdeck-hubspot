import { Box, Button, Dropdown, Flex, Heading, Icon, Text } from "@hubspot/ui-extensions";
import React from "react";

interface IProps {
  addAlert: any;
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

const ConnectedDeckView = ({ addAlert }: IProps) => {
  const handleCopyShareLink = () => {
    setTimeout(() => {
      addAlert({
        type: "success",
        message: "Share Link Copied Successfully",
      });
    }, 500);
  };

  return (
    <Flex direction="column" gap="sm">
      <Flex direction="row" gap="xs" align="center" alignSelf="center">
        <Heading>DealDeck</Heading>
        <Button size="xs" variant="transparent" href={"https://www.dealdeck.ai/"}>
          View DealDeck
        </Button>
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
            Sales proposal for Google
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
            14 (5h 24m 15s)
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
            Jun 4, 2025 at 14:32 GMT
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
            Milad Saleh
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
