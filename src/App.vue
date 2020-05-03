<template>
    <div id="app">
        <FieldFor type="Text" :value.sync="name" label="Name" display-mode="EDIT"></FieldFor>
        <FieldFor type="Textarea" :value.sync="description" label="Description" display-mode="EDIT"></FieldFor>
        <FieldFor type="Number" :value.sync="age" label="Age" display-mode="EDIT"></FieldFor>
        <FieldFor type="Boolean" :value.sync="bool" label="Yes" display-mode="EDIT"></FieldFor>
        <FieldFor type="Phone" :value.sync="phone" label="Phone" display-mode="EDIT"></FieldFor>
        <FieldFor type="Select" :value.sync="gender" :select-from="genders" label="Gender" display-mode="EDIT"></FieldFor>
        <FieldFor type="Date" :value.sync="birthDate" label="Birth Date" display-mode="EDIT"></FieldFor>
        <FieldFor type="Select" :value.sync="vitamin" label="Vitamin" display-mode="EDIT" :select-from="vitamins" :show-avatar="true" avatar-prop="ImageUrl"></FieldFor>
        <h5>FormFor Level 1</h5>
        <FormFor :data="project" display-mode="EDIT" v-slot="form1">
            Invalid : {{ form1.invalid }}
            <FieldFor field="Name" :required="true"></FieldFor>
            <FieldFor field="Description"></FieldFor>
            <h5>FormFor Level 2</h5>
            <FormFor :data="project.Address" display-mode="EDIT" v-slot="form2">
                Invalid : {{ form2.invalid }}
                <FieldFor field="Line1"></FieldFor>
                <FieldFor field="Line2"></FieldFor>
                <h5>FormFor Level 3</h5>
                <FormFor :data="project.Address.Location" display-mode="EDIT" v-slot="form3">
                    Invalid : {{ form3.invalid }}
                    <FieldFor field="Longitude"></FieldFor>
                    <FieldFor field="Latitude"></FieldFor>
                </FormFor>
            </FormFor>
        </FormFor>
    </div>
</template>

<script>
import Address from './models/Address';
import Location from './models/Location';
import Project from './models/Project';
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
            project: new Project({
                Address: new Address({
                    Line1: 'Prescott Street',
                    Location: new Location()
                })
            }),
            vitamins: [
                {
                    _id: '2',
                    Name: 'Mango',
                    Description: 'A mango is a juicy stone fruit produced from numerous species of tropical trees.',
                    Vitamin: 'C',
                    ImageUrl: 'https://befreshcorp.net/wp-content/uploads/2017/07/product-packshot-mango.jpg'
                }
            ],
            vitamin: ''
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
