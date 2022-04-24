import * as yup from 'yup';

export const registerSchema = yup
    .object({
        email: yup.string().email().required(),
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
        name: yup.string().min(2).max(40).required(),
    })
    .required();
