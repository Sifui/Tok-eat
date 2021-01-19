<template>
    <div>
        
    </div>
</template>
<script>
import userServices from "../services/userServices";
export default {
    name: 'Logout',
    data(){
        return{};
    },
    methods: {
        logout:  async function(){
            await userServices.logout();
            this.$router.push({ path: "/" });
            this.$store.commit('disconnectUser');
        }
    },
   async created()
    {
        await this.logout()
    }
}
</script>