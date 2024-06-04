import Pokemon from "./pokemon.js";
import { random, generateLog,  countBtn } from "./utils.js";

class Game {
	getPokemons = async () => {
		const responce = await fetch('https://raw.githubusercontent.com/Ruzimurod11/pokemons/main/db.json');
		const body = await responce.json();
		return body;
	}

	start = async () => {

		const pokemons = await this.getPokemons();
		const player1 = new Pokemon ({
			selectors: 'player1',
			...pokemons[random(16) - 1 ],
		});
		const player2 = new Pokemon ({
			selectors: 'player2',
			...pokemons[random(16) - 1 ],
		});
		
		const $control = document.querySelector('.control');
		
		player1.attacks.forEach(item => {
			const $btn = document.createElement('button');
			$btn.classList.add('button');
			$btn.innerText = item.name;
			const btnCount = countBtn(item.maxCount, $btn);
			function createEl(tag) {
				const $logs = document.querySelector(tag);
				$logs.innerHTML = `<p>${generateLog(player1, player2)}</p>`
			}

			document.getElementById('refresh').addEventListener('click', () => {
				window.location.reload(true);
			})
		
			$btn.addEventListener('click', () => {
				btnCount();
				player1.changeHP(random(item.maxDamage, item.minDamage), createEl('#logs'))
				
				player2.changeHP(random(item.maxDamage, item.minDamage));
				
			})
			$control.appendChild($btn);
		})
	}
}


const game = new Game();
game.start();




