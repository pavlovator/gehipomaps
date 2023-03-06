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
            pol_opt4_eu: {
                name:"european_union_members",
                checked:false,
                file:"./data/eu.csv"
            },
            pol_opt5_asean: {
                name:"association_of_southeast_asian_nations_members",
                checked:false,
                file:"./data/asean.csv"
            },
            pol_opt6_sco: {
                name:"shanghai_cooperation_organisation_members",
                checked:false,
                file:"./data/sco.csv"
            },
            pol_opt7_oas: {
                name:"organization_of_american_states_members",
                checked:false,
                file:"./data/oas.csv"
            },
            pol_opt8_arab_league: {
                name:"arab_league_members",
                checked:false,
                file:"./data/arab_league.csv"
            },
            pol_opt9_united_nations: {
                name:"united_nations_members",
                checked:false,
                file:"./data/un.csv"
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