export enum EventTypes {
  fetchedLead = "fetchedLead",
  connectionSent = "connectionSent",
}

export type EventPayload = LeadFetchedEventType | ConnectionSend;
export type LeadFetchedEventType = {
  type: EventTypes.fetchedLead;
  data: {
    leads: any[];
    userId: string;
  };
};
export type ConnectionSend = {
  type: EventTypes.connectionSent;
  data: {};
};

export type Lead = {
  id: string;
  trackingId: string;
  name: string;
  occupation?: string;
  profilePicture: string;
  publicIdentifier: string;
  connectionDegree?: string;
};
