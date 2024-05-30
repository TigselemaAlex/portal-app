export interface PenaltyTypeResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  canBeDeleted: boolean;
  active: boolean;
}
