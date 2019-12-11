let arr = document.getElementById('card');
let div;
let bonus;
let app = new Vue({
    el: '#app',
    data: {
        equation: false,
        success: false,
        firstDigit: '',
        secondDigit: '',
        totalDigit: '',
        points: 0.0,
        factorClick: {
            price: 5,
            click: 1,
        },
        autoClick: {
            price: 10,
            click: 0.0,
        },
        time: 0,
    },
    methods: {
        addPoint() {
            this.points += this.factorClick.click;
        },
        bustFactorClick() {
            if (this.points >= this.factorClick.price) {
                this.points -= this.factorClick.price;
                this.factorClick.click += 1;
                this.factorClick.price += 10;
            }
        },
        bustAutoClick() {
            if (this.points >= this.autoClick.price) {
                this.points -= this.autoClick.price;
                this.autoClick.price += 15;
                this.autoClick.click += 0.1;
                this.autoClick.click = parseFloat(this.autoClick.click.toFixed(2));
            }
        },
        startTimer() {
            setInterval(() => {
                this.Counter();
            }, 100);
            setInterval(() => {
                this.localStorageSetItems();
            }, 1000);
            setInterval(() => {
                this.superBust();
            }, 20000)
        },

        Counter() {
            this.points = parseFloat((+this.points + +(this.autoClick.click / 10)).toFixed(2));
        },

        ShowForm() {
            this.equation = true;
            this.firstDigit = (Math.random() * 50).toFixed(0);
            this.secondDigit = (Math.random() * 50).toFixed(0);
        },

        HiddenForm() {
            this.equation = false;
        },
        SuccessMessage() {
            this.success = true;
            setTimeout(() => {
                this.success = false;
            }, 1500);
        },

        superBust() {
            let rand = (Math.random() * 10).toFixed(0);
            if (rand == 1) {
                this.ShowForm();
                bonus = setInterval(() => {
                    this.CheckDigit();
                }, 100);
                setTimeout(() => {
                    this.HiddenForm();
                }, 5500)
            }
        },

        CheckDigit() {
            if (this.amount == this.totalDigit) {
                clearInterval(bonus);
                this.Bust();
                this.HiddenForm();
                this.SuccessMessage();
            }
        },

        localStorageSetItems() {
            localStorage.setItem('points', this.points);
            localStorage.setItem('factorClickPrice', this.factorClick.price);
            localStorage.setItem('factorClickClick', this.factorClick.click);
            localStorage.setItem('autoClickPrice', this.autoClick.price);
            localStorage.setItem('autoClickClick', this.autoClick.click);
        },

        Bust() {
            this.factorClick.click += 10;
            this.autoClick.click += 5;
            setTimeout(() => {
                this.StandardValues();
                this.HiddenForm();
            }, 15000)
        },

        StandardValues() {
            this.factorClick.click -= 10;
            this.autoClick.click -= 5;
            this.autoClick.click = parseFloat(this.autoClick.click.toFixed(2));
            this.totalDigit = '';
        },
    },
    created() {
        this.points = localStorage.getItem('points');
        parseFloat(this.points);
        if (localStorage.getItem('factorClickPrice')) {
            this.factorClick.price = localStorage.getItem('factorClickPrice');
            this.factorClick.price = parseFloat(this.factorClick.price);
        }

        if (localStorage.getItem('factorClickClick')) {
            this.factorClick.click = localStorage.getItem('factorClickClick');
            this.factorClick.click = parseFloat(this.factorClick.click);
        }

        if (localStorage.getItem('autoClickPrice')) {
            this.autoClick.price = localStorage.getItem('autoClickPrice');
            this.autoClick.price = parseFloat(this.autoClick.price);
        }

        if (localStorage.getItem('autoClickClick')) {
            this.autoClick.click = localStorage.getItem('autoClickClick');
            this.autoClick.click = parseFloat(this.autoClick.click);
        }
    },
    computed:
        {
            amount: function () {
                return +this.firstDigit + +this.secondDigit;
            }
        },
});
app.startTimer();

