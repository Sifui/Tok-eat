<template>
  <div>
    <md-dialog :md-active.sync="active">
        <md-dialog-title>Ajouter une Promotion</md-dialog-title>

        <md-dialog-content>
            <md-field>
                <label>Nom de la Promotion</label>
                <md-input v-model="promo.name" @change="isNameValid" type="text"></md-input>
            </md-field>
            <span class="error" v-show="this.promoError.name">3 à 45 caractères</span>
            <md-field>
                <label>Pourcentage de réduction</label>
                <md-input v-model="promo.percent" @change="ispercentValid" type="number" min="1" max="99"></md-input>
            </md-field>
            <span class="error" v-show="this.promoError.percent">le Pourcentage doit être entre 0 et 100</span>
            <md-datepicker v-model="promo.date">
                <label>Choisissez une date</label>
            </md-datepicker>


        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="md-primary" @click="reset">Retour</md-button>
            <md-button class="md-primary" @click="createPromo" :disabled="isDisabledPromo">Confirmer</md-button>
        </md-dialog-actions>
    </md-dialog>

    <!--<md-button class="md-primary md-raised" @click="active = true">+ Ajouter une offre</md-button>-->
    <md-button class="md-primary md-raised" @click="active = true">Ajouter une Promotion</md-button>
  </div>
</template>

<script>
    import format from 'date-fns/format'
    export default {
    name: 'CreatePromo',
    data(){
        let dateFormat = this.$material.locale.dateFormat || 'yyyy-MM-dd'
        let now = new Date()
        return{
            active: false,
            promo:{
                name:null,
                percent:null,
                date: format(now, dateFormat),
            },
            promoError:{
                name:false,
                percent:null,
                date:null,
            }
        }
    },
    methods:{
        isNameValid(){
          if (this.promo.name.length > 2 && this.promo.name.length < 46) {
            this.promoError.name = false;
          } else {
            this.promoError.name = true;
          }
        },
        ispercentValid(){
            this.promo.percent = parseInt(this.promo.percent)
            if (this.promo.percent > 0 && this.promo.percent < 100) {
            this.promoError.percent = false;
          } else {
            this.promoError.percent = true;
          }
        },
        createPromo()
        {
            this.$emit('createPromo',this.promo)
            this.reset()
        },
        reset()
        {
            this.active = false
            this.promo.name = null
            this.promo.percent = null
            this.promoError = {
                name:false,
                percent:null,
                date:null
            }
        },
    },
    computed:{
      isDisabledPromo() {
        return !this.promo.name ||
        this.promoError.name ||
        !this.promo.percent ||
        this.promoError.percent
        ? true
        : false;
      },
    },
}
</script>

<style lang="scss" scoped>
  .error {
    color: red;
  }

</style>