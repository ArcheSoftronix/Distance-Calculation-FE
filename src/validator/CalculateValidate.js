// validation for input field 
export const userFormValidator = {
    // validation for Source zipcode
    fromZipCode: {
        required: {
            value: true,
            message: "Please Enter Source Zipcode",
        },
        custom: {
            isValid: (value) =>
                value && value.length >= 5 && value.length <= 10 ? true : false,
            message: "Source Zipcode must be 5 digits",
        },
    },

    
    // validation for destination zipcode
    toZipCode: {
        required: {
            value: true,
            message: "Please Enter Destination Zipcode",
        },
        custom: {
            isValid: (value) =>
                value && value.length >= 5 && value.length <= 10 ? true : false,
            message: "Destination Zipcode must be 5 digits",
        },
    },
}
