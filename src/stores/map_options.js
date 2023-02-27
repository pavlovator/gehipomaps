import { defineStore } from 'pinia'

export const useMapOptionsStore = defineStore('map-options', {
    state: () => ({
        checked_options: {
            option1: {
                name:"nato_members",
                checked:false
            },
            option2: {
                name:"asian_whatever",
                checked:false
            },
            option3: {
                name:"islam",
                checked:false
            },
            option4: {
                name:"christianity",
                checked:false
            }
        }
    }),
    getters: {
        getOptions: (state) => state.checked_options
    },
    actions: {
        checkOption(option_id){
            this.checked_options[option_id].checked = ! this.checked_options[option_id].checked
        }
    }
})