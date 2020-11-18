<script>
import userServices from "../services/userServices";
export default {
    name: 'Logout',
    data(){
        return{};
    },
    methods: {
        Logout: function(){
            userServices.logout();
            this.$router.push({ path: "/" });
        }
    }
}
</script>