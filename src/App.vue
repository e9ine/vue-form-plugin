<template>
    <div id="app">
        <FieldFor type="Text" :value.sync="name" display-mode="VIEW">
            <template v-slot:label>
                <div style="color: red">Custom Label</div>
            </template>
            <template v-slot:view>
                <p style="color: black; font-style: italic">This is custom slot for view mode</p>
            </template>
        </FieldFor>
        <FieldFor type="Textarea" :value.sync="description" label="Description" display-mode="EDIT" :maxlength="30" :show-validation-indicators="true"></FieldFor>
        <FieldFor type="Number" prepend="£" :value.sync="age" label="Age" display-mode="EDIT"></FieldFor>
        <FieldFor type="Boolean" :value.sync="bool" label="Yes" display-mode="EDIT"></FieldFor>
        <FieldFor type="Phone" :value.sync="phone" label="Phone" display-mode="EDIT" :show-validation-indicators="true"></FieldFor>
        <FieldFor type="Select" :value.sync="gender" :select-from="genders" label="Gender" display-mode="EDIT"></FieldFor>
        <FieldFor type="Date" :value.sync="birthDate" label="Birth Date" display-mode="EDIT"></FieldFor>
        <FieldFor type="MultiSelect" :multiple="true" :value.sync="vitamin" label="Vitamin" display-mode="EDIT" :select-from="vitamins" :show-avatar="true" avatar-prop="ImageUrl" :required="true" :show-validation-indicators="true"></FieldFor>
        <FieldFor type="Text" :value.sync="email" label="email" display-mode="EDIT" :email="true" :show-validation-indicators="true"></FieldFor>

        <h3>FormFor Level 1</h3>
        <br />
        <br />
        <FormFor :data="project" display-mode="EDIT" ref="form1">
            <p v-if="$refs.form1">Invalid : {{ $refs.form1.invalid }}</p>
            <p v-if="$refs.form1">{{ $refs.form1.errors }}</p>
            <br />
            <FieldFor field="Name" :required="true" :show-validation-indicators="true" custom-class="form-control-icon" :custom-style="{ 'background-image': 'url(' + require('@/assets/images/datepicker.svg') + ')' }"></FieldFor>
            <FieldFor field="Description"></FieldFor>
            <h3>FormFor Level 2</h3>
            <FormFor :data="project.Address" display-mode="EDIT" ref="form2">
                <!-- This is tracked separately as it has a different reference -->
                <FieldFor field="Line1"></FieldFor>
                <FieldFor field="Line2"></FieldFor>
                <h3>FormFor Level 3</h3>
                <FormFor :data="project.Address.Location" display-mode="EDIT">
                    <!-- This is tracked with First Form-For as both share same reference -->
                    <FieldFor field="Longitude" :show-validation-indicators="true"></FieldFor>
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
                },
                {
                    _id: '3',
                    Name: 'Apple',
                    Description: 'An Apple is a juicy stone fruit produced from numerous species of tropical trees.',
                    Vitamin: 'C',
                    ImageUrl: 'https://befreshcorp.net/wp-content/uploads/2017/07/product-packshot-mango.jpg'
                }
            ],
            vitamin: '',
            email: ''
        };
    },
    mounted() {
        console.log(this.$refs.form1);
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 32px;
}
</style>
