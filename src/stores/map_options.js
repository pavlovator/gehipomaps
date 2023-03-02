import { defineStore } from 'pinia'

export const useMapOptionsStore = defineStore('map-options', {
    state: () => ({
        checked_options: {
            opt1_nato: {
                name:"nato_members",
                checked:false,
                file:"./data/nato.csv"
            },
            opt2_brics: {
                name:"brics_members",
                checked:false,
                file:"./data/brics.csv"
            },
            opt3_islam: {
                name:"islam",
                checked:false
            },
            opt4_christianity: {
                name:"christianity",
                checked:false
            }
        }
    }),
    getters: {
        getOptions: (state) => state.checked_options,
        getChecked: (state) => (checked_option) => state[checked_option].checked
    },
    actions: {
        checkOption(option_id){
            this.checked_options[option_id].checked = ! this.checked_options[option_id].checked
        }
    }
})