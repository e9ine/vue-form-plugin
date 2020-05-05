export default {
    email: 'Provided email is incorrect',
    length :(props, property) => 'Length of characters exceeds the allowed limit of ' + property.maxlength,
    required: (props, property) => (props.label ?? property.name) + ' field is a required field',
    regex: (props, property) => (props.label ?? property.name) + ' is not in the correct format',
    min: (props, property) => (props.label ?? property.name) + ' must be above ' + (props.min ?? property?.min),
    max: (props, property) => (props.label ?? property.name) + ' must be below ' + (props.max ?? property?.max),
    default: (props, property) => (props.label ?? property.name) + ' is incorrect'
};
