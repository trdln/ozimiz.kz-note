import type { JwtPayload } from 'jwt-decode';

export {};
declare global {
  export namespace Types {
    export namespace Note {
      export type Self = {
        id: string;
        createdAt: string;
        content: string;
        title: string;
        userId: string;
      };
    }
    export namespace Utils {
      export type JwtToken = JwtPayload & {
        azp: string;
        email: string;
        email_verified: boolean;
        name: string;
        picture: string;
        given_name: string;
        family_name: string;
      };
    }
  }
}
