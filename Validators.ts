export const ValidatorsObj =  {
      required: {
        expression: /^(?!\s*$).+/,
        message: 'This field is required'
      },
      email: {
        expression: /\S+@\S+\.\S+/,
        message: 'Invalid email address'
      }
    }