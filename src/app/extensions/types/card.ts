export interface ITemplates {
  label: string;
  value: string;
}

export interface IDeal {
  id: number;
  dealname: string;
  amount: string;
  hubspot_owner_id: string;
  associatedcompnyid: string | null;
}

export interface IDealDeck {}

export interface IDeckView {
  id: string;
  name: string;
  dealDeckOwner: string;
  lastEngagement: string;
  numberOfViews: string;
}

export interface IDealDeckData {
  id: string;
  name: string;
  dealDeckOwner: string;
  lastEngagement: null | string | Date;
  numberOfViews: string;
}
