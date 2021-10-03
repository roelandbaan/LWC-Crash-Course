import { LightningElement, track, api, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import fetchShoes from "@salesforce/apex/ShoeFetcher.fetchShoes";

export default class SneakerFilters extends LightningElement {

    @wire(CurrentPageReference) pageRef;
    @track size = 12;
    @track mPrice = 500;
    @track typeArray = [ 'Sneakers', 'Running', 'Boots'];
    @api listOShoes;
   
    
    connectedCallback(){ 
        fetchShoes({maxPrice:this.mPrice, selectedTypes:this.typeArray, shoeSize:this.size}).then(result => {
            // console.log(result);
            this.listOShoes = result;
            fireEvent(this.pageRef ,'passEvent', this.listOShoes);

        })
    }


    // doesnt do anything (yet)
    passData() {
        passableData = this.listOShoes;
        console.log(passableData);
        return passableData;
    }

    get Types() {
        return [
            { label: 'Sneakers', value: 'Sneakers' },
            { label: 'Running', value: 'Running' },
            { label: 'Boots', value: 'Boots' },
        ];
    }


    get selectedValues() {
        return this.value.join(' ');
        
    }


    handleSizeSliderChange(event) {

        this.size = event.target.value;
        // console.log('size',this.size);
        fetchShoes({maxPrice:this.mPrice, selectedTypes:this.typeArray, shoeSize:this.size}).then(result => {
            this.listOShoes = result;
            fireEvent(this.pageRef ,'passEvent', this.listOShoes);

        })
    }

    handlePriceSliderChange(event) {
        this.mPrice = event.target.value;
        // console.log('price',this.mPrice);
        fetchShoes({maxPrice:this.mPrice, selectedTypes:this.typeArray, shoeSize:this.size}).then(result => {
            this.listOShoes = result;
            fireEvent(this.pageRef ,'passEvent', this.listOShoes);

        })
 
    }


    handleCheckboxChange(event) {

       this.typeArray = event.detail.value;
       fetchShoes({maxPrice:this.mPrice, selectedTypes:this.typeArray, shoeSize:this.size}).then(result => {
        this.listOShoes = result;
        fireEvent(this.pageRef ,'passEvent', this.listOShoes);

    })
        

    }



}

