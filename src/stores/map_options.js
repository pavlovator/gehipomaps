import { defineStore } from 'pinia'

export const useMapOptionsStore = defineStore('map-options', {
    state: () => ({
        checked_options: {
            pol_opt1_nato: {
                name:"nato_members",
                checked:false,
                file:"./data/nato.csv"
            },
            pol_opt2_brics: {
                name:"brics_members",
                checked:false,
                file:"./data/brics.csv"
            },
            pol_opt3_common_wealth: {
                name:"common_wealth_members",
                checked:false,
                file:"./data/common_wealth.csv"
            },
            rel_opt1_islam: {
                name:"islam",
                checked:false
            },
            rel_opt2_christianity: {
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