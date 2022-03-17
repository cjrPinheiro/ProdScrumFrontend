import { SocialNetwork } from "./social-network";
export interface EventObj {
  id: number;
  place: string;
  date?: Date;
  theme: string;
  maxPeople: number;
  imageURL: string;
  phone: string;
  email: string;
  socialNetworks: SocialNetwork[];
}
