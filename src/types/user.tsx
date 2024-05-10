export default interface User {
  ID: number;
  Info: {
    Name: string;
    DefaultPhone: { Number: string };
  };
}
