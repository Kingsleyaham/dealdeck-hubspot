import { Button, Flex, Form, Input, Modal, ModalBody, ModalFooter, Select } from "@hubspot/ui-extensions";
import React, { useEffect, useState } from "react";
import { ICustomerInfo } from "../types/customer";

interface IProps {
  actions: any;
  customer?: ICustomerInfo;
  deal?: string;
}

const options = [
  { label: "My Template", value: "my Template" },
  { label: "New Template", value: "new template" },
  { label: "Base Template", value: "base template" },
  { label: "Kingsley Template", value: "kingsley template" },
];

const CreateDealDeckModal = ({ actions, customer, deal }: IProps) => {
  const [template, setTemplate] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [dealErrorMsg, setDealErrorMsg] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [dealValid, setDealValid] = useState(true);
  const [dealName, setDealName] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setDealName(deal!);
  }, [deal]);

  useEffect(() => {
    if (dealName && template) {
      setFormIsValid(true);
      return;
    }

    setFormIsValid(false);
  }, [dealName, template]);

  return (
    <Modal id="create-dealdeck-modal" title="Create a DealDeck" width="md">
      <ModalBody>
        <Flex direction="column">
          <Form>
            <Input
              label="Deal name"
              name="customerName"
              placeholder="Enter deal name"
              required
              validationMessage={dealErrorMsg}
              error={!dealValid}
              onChange={(value) => {
                setDealName(value);
              }}
              onInput={(value) => {
                if (value === "") {
                  setDealErrorMsg("Deal Name is required");
                  setDealValid(false);
                } else {
                  setValidationMessage("");
                  setDealValid(true);
                }
              }}
              value={dealName}
            ></Input>

            <Select
              label="Select Template"
              name="template"
              tooltip="Select a template from prebuilt templates"
              required={true}
              error={!isValid}
              validationMessage={validationMessage}
              value={template!}
              onChange={(value: any) => {
                setTemplate(value);
                if (!value) {
                  setValidationMessage("Field is required");
                  setIsValid(false);
                } else {
                  setIsValid(true);
                }
              }}
              options={options}
            />
          </Form>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => actions.closeOverlay("create-dealdeck-modal")}>Cancel</Button>
        <Button
          variant="primary"
          type="submit"
          disabled={!formIsValid}
          onClick={() => actions.closeOverlay("create-dealdeck-modal")}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateDealDeckModal;
