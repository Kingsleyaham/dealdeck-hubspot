import { Button, Flex, Form, Input, Modal, ModalBody, ModalFooter, Select } from "@hubspot/ui-extensions";
import React, { useEffect, useState } from "react";
import { ICustomerInfo } from "../types/customer";

interface IProps {
  actions: any;
  customer?: ICustomerInfo;
}

const options = [
  { label: "My Template", value: "my Template" },
  { label: "New Template", value: "new template" },
  { label: "Base Template", value: "base template" },
  { label: "Kingsley Template", value: "kingsley template" },
];

const CreateDealDeckModal = ({ actions, customer }: IProps) => {
  const [template, setTemplate] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [customerErrorMsg, setCustomerErrorMsg] = useState("");
  const [websiteErrorMsg, setWebsiteErrorMsg] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [customerValid, setCustomerValid] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [website, setWebsite] = useState("");
  const [websiteValid, setWebsiteValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("customer", customer);
    setCustomerName(`${customer?.firstName} ${customer?.lastName}`);
  }, [customer]);

  useEffect(() => {
    if (website && customerName && template) {
      setFormIsValid(true);
      return;
    }

    setFormIsValid(false);
  }, [website, customerName, template]);

  return (
    <Modal id="create-dealdeck-modal" title="Create a DealDeck" width="md">
      <ModalBody>
        <Flex direction="column">
          <Form>
            <Input
              label="Customer name"
              name="customerName"
              placeholder="Enter customer name"
              required
              validationMessage={customerErrorMsg}
              error={!customerValid}
              onChange={(value) => {
                setCustomerName(value);
              }}
              onInput={(value) => {
                if (value === "") {
                  setCustomerErrorMsg("Customer Name is required");
                  setCustomerValid(false);
                } else {
                  setValidationMessage("");
                  setCustomerValid(true);
                }
              }}
              value={customerName}
            ></Input>
            <Input
              label="Customer website"
              name="website"
              placeholder="Enter customer website"
              required
              validationMessage={websiteErrorMsg}
              error={!websiteValid}
              onChange={(value) => {
                setWebsite(value);
              }}
              onInput={(value) => {
                if (value === "") {
                  setWebsiteErrorMsg("Customer Name is required");
                  setWebsiteValid(false);
                } else {
                  setWebsiteErrorMsg("");
                  setWebsiteValid(true);
                }
              }}
              value={website}
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
