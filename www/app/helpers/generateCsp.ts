import crypto from 'crypto';

import { v4 } from 'uuid';

export const generateCsp = (): [csp: string, nonce: string] => {
    const production = process.env.NODE_ENV === 'production';

    const hash = crypto.createHash('sha256');
    hash.update(v4());
    const nonce = hash.digest('base64');

    let csp = ``;
    csp += `default-src 'self';`;
    csp += `base-uri 'self';`;
    csp += `style-src https://fonts.googleapis.com 'unsafe-inline';`;
    csp += `script-src https://js.stripe.com https://checkout.stripe.com 'nonce-${nonce}' 'self' ${
        production ? '' : "'unsafe-eval'"
    };`;
    csp += `connect-src ${process.env.NEXT_PUBLIC_API_URL} *.stripe.com ${
        !production ? `'self';` : ';'
    }`;
    csp += `frame-src *.stripe.com *.stripe.network;`;
    csp += `font-src https://fonts.gstatic.com 'self';`;

    return [csp, nonce];
};
