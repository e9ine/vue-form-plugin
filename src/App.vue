<template>
    <div id="app">
        <FieldFor type="Text" :value.sync="name" label="Name" display-mode="EDIT"></FieldFor>
        <FieldFor type="Textarea" :value.sync="description" label="Description" display-mode="EDIT"></FieldFor>
        <FieldFor type="Number" :value.sync="age" label="Age" display-mode="EDIT"></FieldFor>
        <FieldFor type="Boolean" :value.sync="bool" label="Yes" display-mode="EDIT"></FieldFor>
        <FieldFor type="Phone" :value.sync="phone" label="Phone" display-mode="EDIT"></FieldFor>
        <FieldFor type="Select" :value.sync="gender" :select-from="genders" label="Gender" display-mode="EDIT"></FieldFor>
        <FieldFor type="Date" :value.sync="birthDate" label="Birth Date" display-mode="EDIT"></FieldFor>
        <FormFor :data="address" :model="Address" display-mode="EDIT">
            <FieldFor field="Line1"></FieldFor>
            <FieldFor field="Line2"></FieldFor>
        </FormFor>
    </div>
</template>

<script>
import Address from './models/Address';
export default {
    name: 'App',
    data() {
        return {
            name: 'Sharvilak',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
            age: 26,
            bool: true,
            phone: undefined,
            gender: 'Male',
            genders: ['Male', 'Female'],
            birthDate: new Date(),
            address: new Address(),
            Address
        };
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 32px;
}
</style>
