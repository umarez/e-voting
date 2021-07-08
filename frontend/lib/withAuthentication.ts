export const withAuthentication =
  (getServerSidePropsFn: (arg0: { token: any; ctx: any }) => any) =>
  (ctx: { req: { cookies: { token: any } } }) => {
    const token = ctx.req.cookies?.token;
    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    return getServerSidePropsFn({ token, ctx });
  };
