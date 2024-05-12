export interface User {
  ID: number;
  InfoID: number;
  Info: {
    Name: string;
    DefaultPhone: {
      CountryCode: string;
      Description: string;
      Number: string;
    };
  };
}
