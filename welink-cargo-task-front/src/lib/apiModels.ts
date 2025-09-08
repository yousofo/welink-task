export interface IZone {
  id: string;
  name: string;
  categoryId: string;
  gateIds: string[];
  totalSlots: number;
  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;
  rateNormal: number;
  rateSpecial: number;
  open: boolean;
}

export interface ICategory {
  id: string;
  name: string;
  rateNormal: number;
  rateSpecial: number;
}

export interface IGate {
  id: string;
  name: string;
  zoneIds: string[];
  location: string;
}

export interface IUserData {
  token: string;
  user: {
    id: any;
    userName: string;
    role: string;
  };
}

export interface IErrorResponse {
  status: string;
  message: string;
  errors: IError;
}

export interface IError {
  [key: string]: string[];
}

export interface ICheckInSuccessResponse {
  ticket: ITicket;
  zoneState: IZoneState;
}

export interface ITicket {
  id: string;
  type: string;
  zoneId: string;
  gateId: string;
  checkinAt: string;
  checkoutAt: any;
}

export interface IZoneState {
  id: string;
  name: string;
  categoryId: string;
  gateIds: string[];
  totalSlots: number;
  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;
  rateNormal: number;
  rateSpecial: number;
  open: boolean;
}

export interface ISubscription {
  id: string;
  userName: string;
  active: boolean;
  categories: string[];
  category: string;
  cars: ICar[];
  startsAt: string;
  expiresAt: string;
  currentCheckins: any[];
}

export interface ICar {
  plate: string;
  brand: string;
  model: string;
  color: string;
}
