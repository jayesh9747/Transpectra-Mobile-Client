import * as Yup from 'yup';

const RegisterValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').label('Name'),
    mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Mobile number is not valid').required('Mobile No is required').label('Mobile No'),
    email: Yup.string().email('Enter a valid email').required('Email is required').label('Email'),
    company: Yup.string().required('Company is required').label('Company'),
    customer_type: Yup.string().oneOf(['corporate', 'export', 'retailer', 'wholesaler']).required('Customer Type is required').label('Customer Type'),
    // gst_no: Yup.string().trim().matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, 'Invalid GST No.').required('GST No is required').label('GST No'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
        .required('Password is required')
        .label('Password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
        .label('Confirm Password'),
    address: Yup.string().required('Address is required').label('Address'),
    dob: Yup.date().max(new Date(), 'Date of Birth cannot be in the future').label('Date of Birth'),
    pin_code: Yup.string()
        .matches(/^[1-9][0-9]{5}$/, 'Pincode must be exactly 6 digits and cannot start with 0')
        .required('Pincode is required')
        .label('Pincode'),
});

export default RegisterValidationSchema;
