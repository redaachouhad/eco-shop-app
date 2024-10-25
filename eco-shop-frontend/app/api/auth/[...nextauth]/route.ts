import { jwtDecode } from "jwt-decode";
import { AuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import KeycloakProvider from "next-auth/providers/keycloak";

const fctRoles = (lista: string[]) => {
  const foundAdmin = Array.from(lista).includes("admin");
  const foundCustomer = Array.from(lista).includes("customer");
  if (foundAdmin) {
    return "admin";
  }
  if (foundCustomer) {
    return "customer";
  }
};

async function requestRefreshOfAccessToken(token: JWT) {
  const body = new URLSearchParams();
  // Construction du corps de la demande avec les paramètres requis
  body.append("client_id", process.env.KEYCLOAK_CLIENT_ID!);
  body.append("client_secret", process.env.KEYCLOAK_CLIENT_SECRET!);
  body.append("grant_type", "refresh_token");
  body.append("refresh_token", token.refreshToken as string);

  const response = await fetch(
    (process.env.KEYCLOAK_ISSUER_DOCKER as string) +
      "/protocol/openid-connect/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body,
      cache: "no-store",
    }
  );
  return response;
}

const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      name: "keycloak",
      wellKnown: undefined,
      jwks_endpoint:
        `${process.env.KEYCLOAK_ISSUER_DOCKER}/protocol/openid-connect/certs` as string,
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER as string,
      authorization: {
        params: {
          scope: "openid email profile",
        },
        url: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/auth` as string,
      },
      token:
        `${process.env.KEYCLOAK_ISSUER_DOCKER}/protocol/openid-connect/token` as string,
      userinfo:
        `${process.env.KEYCLOAK_ISSUER_DOCKER}/protocol/openid-connect/userinfo` as string,
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 30,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.decoded = jwtDecode(account.access_token as string);
        token.idToken = account.id_token;
        token.provider = account.provider;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.error = "";
        // console.log(token);
        return token;
      }

      console.log(Date.now());
      console.log((token.expiresAt! as number) * 1000);
      console.log((token.expiresAt! as number) * 1000 - Date.now());
      if (Date.now() < (token.expiresAt! as number) * 1000 - 60 * 1000) {
        return token;
      } else {
        try {
          const response = await requestRefreshOfAccessToken(token);
          const tokens: TokenSet = await response.json();
          if (!response.ok) throw tokens;
          const updatedToken: JWT = {
            ...token, // Keep the previous token properties
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(
              Date.now() / 1000 + (tokens.expires_in as number)
            ),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          };
          return updatedToken;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        idToken: token.idToken as string,
        accessToken: token.accessToken as string,
        error: token.error as string,
        roles: fctRoles((token?.decoded as any)?.realm_access?.roles) as string,
      };
    },
  },
  events: {
    // implementing signout of keycloak to finish the user session in the keycloak
    async signOut(message) {
      if (message?.token?.provider === "keycloak") {
        let path = `${
          process.env.KEYCLOAK_ISSUER_DOCKER
        }/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(
          process.env.NEXTAUTH_URL as string
        )}`;
        const idToken: string = message?.token?.idToken as string;
        if (idToken) {
          path = path + `&id_token_hint=${idToken}`;
        } else {
          path = path + `&client_id=${process.env.KEYCLOAK_CLIENT_ID}`;
        }

        try {
          const response = await fetch(path, { method: "GET" });
        } catch (error) {
          console.log("error in signout");
        }
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
