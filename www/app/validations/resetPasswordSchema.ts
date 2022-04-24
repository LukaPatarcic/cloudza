import * as yup from 'yup';

export const resetPasswordSchema = yup
    .object({
        password: yup
            .string()
            .min(8)
            .matches(
                /^(?=.*[a-z])/,
                'Must contain at least one lowercase character'
            )
            .matches(
                /^(?=.*[A-Z])/,
                'Must contain at least one uppercase character'
            )
            .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
            .required(),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required(),
    })
    .required();
