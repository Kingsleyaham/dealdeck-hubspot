import {
  Button,
  Flex,
  Form,
  hubspot,
  Input,
  LoadingButton,
  logger,
  Modal,
  ModalBody,
  ModalFooter,
  Select,
} from "@hubspot/ui-extensions";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { IDeal, ITemplates } from "../types/card";

interface IProps {
  actions: any;
  deal?: IDeal;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
}

const CreateDealDeckModal = ({ actions, deal, setIsConnected }: IProps) => {
  const [template, setTemplate] = useState<string | null>(null);
  const [tempErrorMsg, setTempErrorMsg] = useState("");
  const [dealErrorMsg, setDealErrorMsg] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [dealValid, setDealValid] = useState(true);
  const [dealName, setDealName] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [templates, setTemplates] = useState<ITemplates[]>([]);

  useEffect(() => {
    setDealName(deal?.dealname!);
  }, [deal]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${API_BASE_URL}/inward/api/hubspot/templates`;

      try {
        const response = await hubspot.fetch(url, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setTemplates(data.map((elem: any) => ({ label: elem.name, value: elem.id })));
      } catch (error) {
        setTempErrorMsg("Error fetching templates");
        console.error("An error occurred: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dealName && template) {
      setFormIsValid(true);
      return;
    }

    setFormIsValid(false);
  }, [dealName, template]);

  const handleSubmit = async () => {
    const url = `${API_BASE_URL}/inward/api/hubspot/deck/create`;
    setIsSubmitting(true);

    try {
      const response = await hubspot.fetch(url, {
        method: "POST",
        body: {
          dealId: deal?.id,
          templateId: template,
        },
      });

      if (!response.ok) {
        const data = await response.json();

        if (data.status === "PRECONDITION_FAILED" && data.errorCode === "VALIDATION_ERROR") {
          throw new Error(data.message);
        }

        throw new Error("An Error Occurred creating deck");
      }

      const data = await response.json();

      actions.addAlert({
        type: "success",
        message: "DealDeck created successfully",
      });

      setTimeout(() => {
        actions.closeOverlay("create-dealdeck-modal");
      }, 1000);
    } catch (err: any) {
      actions.addAlert({
        type: "danger",
        message: err.message,
      });
      logger.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  setTempErrorMsg("");
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
              validationMessage={tempErrorMsg}
              value={template!}
              onChange={(value: any) => {
                setTemplate(value);
                if (!value) {
                  setTempErrorMsg("Field is required");
                  setIsValid(false);
                } else {
                  setIsValid(true);
                }
              }}
              options={templates}
            />
          </Form>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => actions.closeOverlay("create-dealdeck-modal")}>Cancel</Button>
        <LoadingButton
          variant={isSubmitting ? "secondary" : "primary"}
          type="submit"
          disabled={!formIsValid}
          onClick={handleSubmit}
          loading={isSubmitting}
        >
          Save
        </LoadingButton>
      </ModalFooter>
    </Modal>
  );
};

export default CreateDealDeckModal;
