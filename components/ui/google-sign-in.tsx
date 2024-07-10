import React, { useEffect } from 'react';
import { useSession } from '~/util/AuthProvider';

declare global {
  interface Window {
    google: any;
  }
}

const GoogleSignIn: React.FC = () => {
    const { supabase } = useSession();
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id: '651726555905-i97fpimv9cgcvjdc2chqb7i03l3p4vcj.apps.googleusercontent.com',
        callback: handleSignInWithGoogle,
        context: 'signin',
        ux_mode: 'popup',
        login_uri: 'https://zgigrcwoefxweeclxkwb.supabase.co/auth/v1/callback',
        itp_support: true,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        {
          type: 'standard',
          shape: 'pill',
          theme: 'outline',
          text: 'signin_with',
          size: 'large',
          logo_alignment: 'left',
        }
      );
    };

    if (window.google && window.google.accounts) {
      initializeGoogleSignIn();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    }
  }, []);

  const handleSignInWithGoogle = async (response: any) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    });

    if (error) {
      console.error('Error signing in with Google:', error);
    } else {
      console.log('Signed in with Google:', data);
    }
  };

  return (
    <div>
      <div id="g_id_signin"></div>
    </div>
  );
};

export default GoogleSignIn;
