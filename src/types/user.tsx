export interface User {
  ID: number;
  InfoID: number;
  _createguid: string,
  Info: {
    Name: string;
    DefaultPhone: {
      CountryCode: string;
      Description: string;
      Number: string;
    };
  };
}
