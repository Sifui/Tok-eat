<template>
  <div>
    <md-dialog :md-active.sync="active">
        <md-dialog-title>Ajouter une offre</md-dialog-title>

        <md-dialog-content>
            <div v-if="offer.image">
                <img
                    class="offer-image"
                    v-bind:src="offer.image"
                    alt="offer-image"
                />
            </div>

            <div v-else>
                <img class="offer-image" src="./../../assets/defaultOffer.png">
            </div>

            <md-field>
                <label class="profil-input-image-label" for="profil-input-image">Photo du profil</label>
                <md-file
                    type="file"
                    id="offer-input-image"
                    ref="file"
                    name="offer-input-image"
                    accept="image/x-png,image/gif,image/jpeg,image/tiff"
                    @change="onFileChange(offer, $event)"
                />
            </md-field>

            <md-field>
                <label>Nom de l'offre</label>
                <md-input v-model="offer.name" @change="isNameValid" type="text"></md-input>
            </md-field>
            <span class="error" v-show="this.offerError.name">3 à 45 caractères</span>

            <md-field> 
                <label>Prix</label>
                <md-input v-model="offer.price" @change="isPriceValid" type="number" min="0" max="9999"></md-input>
            </md-field>
            <span class="error" v-show="this.offerError.price">Prix invalide</span>
            
            <md-field>
                <label>Déscription</label>
                <md-textarea v-model="offer.description" @change="isDescriptionValid" type="text"></md-textarea>
            </md-field>
            <span class="error" v-show="this.offerError.description">3 à 500 caractères</span>

        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="md-primary" @click="reset">Retour</md-button>
            <md-button class="md-primary" :disabled="isDisabledOffer" @click="createOffer">Confirmer</md-button>
        </md-dialog-actions>
    </md-dialog>

    <!--<md-button class="md-primary md-raised" @click="active = true">+ Ajouter une offre</md-button>-->
    <div class="sortable" @click="active = true">
        + Ajouter un offre
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateOffer',
    props:
    {
        category:Object
    },
    data(){
        return{
            active: false,
            offer:{
                name:null,
                price:null,
                description:null,
                image:null,
                idPromo:null,
                idCategory:null
            },
            offerError:{
                name:false,
                price:false,
                description:false,
                image:false,
                idPromo:false
            }
        }
    },
    computed:{
      isDisabledOffer() {
        return !this.offer.name ||
        !this.offer.price ||
        !this.offer.description ||
        this.offerError.name ||
        this.offerError.price ||
        this.offerError.description
        ? true
        : false;
      }
    },
    methods:{
        isNameValid(){
            if (this.offer.name.length > 2 && this.offer.name.length < 46) {
                this.offerError.name = false;
            } else {
                this.offerError.name = true;
            }
        },
        isPriceValid(){
            if (this.offer.price > 0 && this.offer.price < 9999) {
                this.offerError.price = false;
            } else {
                this.offerError.price = true;
            }
        },
        isDescriptionValid(){
            if (this.offer.description.length > 2 && this.offer.description.length < 501) {
                this.offerError.description = false;
            } else {
                this.offerError.description = true;
                }
        },
        createOffer()
        {
          this.offer.idCategory = this.category.id
          this.$emit('createOffer',this.offer)
          this.reset()
        },
        onFileChange(offer, event)
        {
            var file = event.target.files[0];
            if(!file)
            {
                return
            }
            this.createImage(offer, file)
        },
        createImage(offer, file)
        {
            var reader = new FileReader();

            reader.onload = (e) => {
                offer.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        reset()
        {
            this.active = false,
            this.offer = {
                name:null,
                price:null,
                description:null,
                image:null,
                idPromo:null,
                idCategory:null
            },
            this.offerError = {
                name:false,
                price:false,
                description:false,
                image:false,
                idPromo:false
            }
        }
    } 
}
</script>

<style lang="scss" scoped>
    .error {
        color: red;
    };
    .offer-image{
        display:     block;
        width:       225px;
        height:      225px;
    }
</style>