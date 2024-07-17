class Selectors {
	constructor(name) {
		this.elHP = document.getElementById(`health-${name}`);
		this.elProgressbar = document.getElementById(`progressbar-${name}`);
		this.elName = document.getElementById(`name-${name}`);
		this.elImg = document.getElementById(`img-${name}`);
	}
}

class Pokemon extends Selectors {
	constructor({ name, img, id, hp, type, selectors, attacks = [] }) {
		super(selectors);
		this.name = name;
		this.img = img;
		this.id = id;
		this.hp = {
			current: hp,
			total: hp,
		};
		this.type = type;
		this.attacks = attacks;

		this.renderHP();
	}

	changeHP = (count, cb) => {
		function createLose(tag, name) {
			const $lose = document.querySelector(tag);
			$lose.classList.add("block");
			$lose.classList.remove("none");
			$lose.innerHTML = `<p> ${name} проиграл</p>`;
		}

		this.hp.current -= count;
		if (this.hp.current <= 0) {
			this.hp.current = 0;
			createLose("#lose", this.name);
			document.querySelectorAll(".control button").forEach((item) => {
				item.disabled = true;
			});

			document.getElementById("refresh").addEventListener("click", () => {
				window.location.reload(true);
			});
		}
		this.renderHP();
		cb && cb(count);
	};

	renderHP = () => {
		this.renderHPLife();
		this.renderProgressbarHP();
		this.renderName();
		this.renderImage();
	};

	renderHPLife = () => {
		const {
			elHP,
			hp: { current, total },
		} = this;

		elHP.innerText = current + " / " + total;
	};

	renderProgressbarHP = () => {
		const {
			hp: { current, total },
			elProgressbar,
		} = this;
		const procent = current / (total / 100);
		elProgressbar.style.width = procent + "%";
	};

	renderName = () => {
		const { elName, name } = this;
		elName.innerText = name;
	};

	renderImage = () => {
		const { elImg, img } = this;
		elImg.src = img;
	};
}

export default Pokemon;
