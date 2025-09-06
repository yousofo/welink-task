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

export interface IUser {
  token: string;
  data: {
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
