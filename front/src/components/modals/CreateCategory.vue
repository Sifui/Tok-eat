<template>
  <div>
    <md-dialog :md-active.sync="active">
        <md-dialog-title>Ajouter une categorie</md-dialog-title>

        <md-dialog-content>
            <md-field>
                <label>Nom de la categorie</label>
                <md-input v-model="category.name" @change="isNameValid" type="text"></md-input>
            </md-field>
            <span class="error" v-show="this.categoryError.name">3 à 45 caractères</span>
        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="md-primary" @click="reset">Retour</md-button>
            <md-button class="md-primary" @click="createCategory" :disabled="isDisabledCategory">Confirmer</md-button>
        </md-dialog-actions>
    </md-dialog>

    <!--<md-button class="md-primary md-raised" @click="active = true">+ Ajouter une offre</md-button>-->
    <md-button class="md-primary md-raised" @click="active = true">Ajouter une categorie</md-button>
  </div>
</template>

<script>
  export default {
    name: 'CreateCategory',
    data(){
        return{
            active: false,
            category:{
                name:null
            },
            categoryError:{
                name:false,
            }
        }
    },
    methods:{
        isNameValid(){
          if (this.category.name.length > 2 && this.category.name.length < 46) {
            this.categoryError.name = false;
          } else {
            this.categoryError.name = true;
          }
        },
        createCategory()
        {
            this.$emit('createCategory',this.category)
            this.reset()
        },
        reset()
        {
            this.active = false,
            this.category = {
                name:null
            },
            this.categoryError = {
                name:false,
            }
        }
    },
    computed:{
      isDisabledCategory() {
        return !this.category.name ||
        this.categoryError.name
        ? true
        : false;
      }
    },
}
</script>

<style lang="scss" scoped>
  .error {
    color: red;
  }

</style>