export default {
    email: 'Provided email is incorrect',
    length :(props, property) => 'Length of characters exceeds the allowed limit of ' + props.maxlength || property.maxlength,
    required: (props, property) => (props.label || (property && property.name ? property.name : '')) + ' field is a required field',
    regex: (props, property) => (props.label || (property && property.name ? property.name: '')) + ' is not in the correct format',
    min: (props, property) => (props.label || (property && property.name ? property.name : '')) + ' must be above ' + (props.min || (property && property.min !== undefined ? property.min : '')),
    max: (props, property) => (props.label || (property && property.name ? property.name : '')) + ' must be below ' + (props.max || (property && property.max !== undefined ? property.max : '')),
    phone: (props, property) => (props.label || (property && property.name ? property.name : '')) + ' format is incorrect',
    default: (props, property) => (props.label || (property && property.name ? property.name : '')) + ' is incorrect'
};
