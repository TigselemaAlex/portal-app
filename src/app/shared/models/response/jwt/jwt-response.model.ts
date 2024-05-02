export interface JwtResponse {
  token: string;
  fullName: string;
  id: number;
  authorities: [
    {
      authority: string;
    }
  ];
}
