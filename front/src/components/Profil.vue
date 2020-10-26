<template>
  <div id="profilPage">
      <label for="name">Nom:</label>
       <input type="text" v-model="name" id="name"/>
       
       <label for="firstName">Nom:</label>
       <input type="text" v-model="firstName" id="firstName"/>
       
      <label for="adresse">Adresse:</label>
       <input type="text" name="" v-model="address" id="address">
       <input type="email" v-model="email" id="email"/>
       <input type="password" v-model="password" id="password"/>
       <input type="tel" v-model="phone" id="phone" pattern="[0,9]{10}"/>
  </div>
</template>

<script>
export default {
    name:'Profil',
    props:{},
    data(){
        return {
            name:'',
            firstName:'',
            email:'',

        }
    }
}
</script>

<style>

</style>