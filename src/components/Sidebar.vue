<template>
    <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="logo">
			<img src="../assets/world.png" alt="Earth"> 
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="toggleMenu">
				<span class="material-icons">keyboard_double_arrow_right</span>
			</button>
		</div>

		<h3>Menu</h3>
        <div class="menu" v-for="option in sidebar_options" v-bind:key="option.id">
            <div class="button" @click="toggleSubmenu(option)">
				<span class="material-icons">{{option.icon_name}}</span>
				<span class="text">{{ option.text }}</span>
            </div>
            <SideOptions v-if="option.show" :suboptions_id="option.id" />
        </div>

	</aside>
</template>

<script>
import { ref } from 'vue'
import SideOptions from './SideOptions.vue'

export default {
    name: 'App-Sidebar',
    components:{
        SideOptions
    },
    data(){
        return {
            sidebar_options: [
                {
                    id:0,
                    icon_name:'gavel',
                    text:'Political',
                    show:false
                },
                {
                    id:1,
                    icon_name:'church',
                    text:'Religion',
                    show:false
                },
                {
                    id:2,
                    icon_name:'terrain',
                    text:'Terrain',
                    show:false
                },
                {
                    id:3,
                    icon_name:'translate',
                    text:'Language',
                    show:false
                }
            ],
            is_expanded: ref(localStorage.getItem("is_expanded") === "true")
        }
    },
    methods:{
        toggleMenu(){
            this.is_expanded = !this.is_expanded
            localStorage.setItem("is_expanded", this.is_expanded)
        },
        toggleSubmenu(menuItem) {
            console.log(menuItem.show)
            menuItem.show = !menuItem.show
        }
    }
}
</script>

<style lang="scss" scoped>
aside {
	display: flex;
	flex-direction: column;
	background-color: var(--dark);
	color: var(--light);
	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;
	transition: 0.2s ease-in-out;
	.flex {
		flex: 1 1 0%;
	}
	.logo {
		margin-bottom: 1rem;
		img {
			width: 2rem;
		}
	}
	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;
		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;
		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}
			
			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}
	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}
	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}
	.menu {
		margin: 0 -1rem;
        .button {
			display: flex;
			align-items: center;
			text-decoration: none;
			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;
			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			.text {
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			&:hover {
				background-color: var(--dark-alt);
				.material-icons, .text {
					color: var(--primary);
				}
			}
		}
	}
	&.is-expanded {
		width: var(--sidebar-width);
		.menu-toggle-wrap {
			top: -3rem;
			
			.menu-toggle {
				transform: rotate(-180deg);
			}
		}
		h3, .button .text {
			opacity: 1;
		}
		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}
	}
	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}
</style>