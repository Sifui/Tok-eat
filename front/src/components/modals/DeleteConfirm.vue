<template>
  <div>
    <div v-if="deleteType==='category'">
        <md-dialog-confirm
            :md-active.sync="active"
            md-title="Supprimer une categorie"
            :md-content= "mdContent"
            md-confirm-text="Confirmer"
            md-cancel-text="Retour"
            @md-cancel="active=false"
            @md-confirm="deleteCategory" 
        />
        <md-button class="md-primary md-raised" @click="active=true">Supprimer</md-button>
    </div>
    <div v-if="deleteType==='offer'">
        <md-dialog-confirm
            :md-active.sync="active"
            md-title="Supprimer une offre"
            :md-content= "mdContent"
            md-confirm-text="Confirmer"
            md-cancel-text="Retour"
            @md-cancel="active=false"
            @md-confirm="deleteOffer" 
        />
        <md-button class="md-primary md-raised" @click="active=true">Supprimer</md-button>
    </div>

    <div v-if="deleteType==='promo'">
        <md-dialog-confirm
            :md-active.sync="active"
            md-title="Supprimer une promotion"
            :md-content= "mdContent"
            md-confirm-text="Confirmer"
            md-cancel-text="Retour"
            @md-cancel="active=false"
            @md-confirm="deletePromo" 
        />
        <md-button class="md-primary md-raised" @click="active=true">Supprimer</md-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Delete',
    props:
    {
        deleteType:String,
        data:Object
    },
    data(){
        return{
            active: false,
        }
    },
    methods:{
        deleteCategory()
        {
          this.$emit('deleteCategory',this.data)
          this.reset()
        },
        deleteOffer()
        {
          this.$emit('deleteOffer',this.data)
          this.reset()
        },
        deletePromo()
        {
          this.$emit('deletePromo',this.data)
          this.reset()
        },
        reset()
        {
            this.active = false
        }
    },
    computed: {
        mdContent: {
            get: function() {
                if(this.deleteType === "category")
                {
                    return `Voulez-vous vraiment retirer ${this.data.name} de vos categories?`
                }
                else if(this.deleteType === "offer")
                {
                    return `Voulez-vous vraiment retirer ${this.data.name} de vos offres?`
                }
                else if(this.deleteType === "promo")
                {
                    return `Voulez-vous vraiment retirer ${this.data.name} de vos promotions?`
                }
                else
                {
                    return false
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  .error {
    color: red;
  }
</style>