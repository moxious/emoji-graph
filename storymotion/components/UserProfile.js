import { useAuth, withAuth } from 'use-auth0-hooks';

// https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/
const UserProfile = withAuth(({ auth }) => {
    const { user } = auth;
    

    // const lock = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN, {
    //     auth: {
    //       params: {
    //         scope: 'openid email',
    //       },
    //       responseType: 'token id_token',
    //     },
    //   });

    return (
      <div>
        <h1>Profile</h1>
        <p>This is the profile page.</p>
        <pre>{JSON.stringify(user || { }, null, 2)}</pre>
      </div>
    );
  });

export default UserProfile;
