<template>
    <div class="filter_Wrap">
        <div class="fileter filter__dropdown">
            <h4>City</h4>
            <div class="select_wrap">
                <select v-model="selectedCity">
                    <option value=""  hidden>Select city</option>
                    <option v-for="(city, key) in cityList" :value="city.id">{{ city.name }}</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="10px" height="10px" viewBox="0 0 30.727 30.727" style="enable-background:new 0 0 30.727 30.727;" xml:space="preserve">
                    <g>
                        <path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0   l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"/>
                    </g>
                </svg>
            </div>
        </div>
        <div class="fileter filter__checkbox">
            <h4>Categories</h4>
            <label v-for="category in categoryList" :for="`productCategory${category.id}`" class="cbox">{{ category.name }}
                <input :id="`productCategory${category.id}`" :value="category.id" type="checkbox" v-model="categoryArr">
                <span class="checkmark"></span>
            </label>
        </div>
        <div class="fileter filter__slider">
            <h4>Price</h4>
            <section class="range-slider">
                <input
                       step="1"
                       type="range"
                       v-model="priceArr.price[0]"
                       v-on:mousemove="dragLine"
                       v-on:touchmove="dragLine"
                       :min="0"
                       :max="getMaxPrice()"
                       ref="inputMin">
                <input
                       step="1"
                       type="range"
                       v-model="priceArr.price[1]"
                       v-on:mousemove="dragLine"
                       v-on:touchmove="dragLine"
                       :min="0"
                       :max="getMaxPrice()"
                       ref="inputMax">
                <div ref="inputLine" class="range-slider__line"></div>
            </section>
            <div class="filter__slider_data">
                <span class="slider_price">{{ `$${priceArr.price[0]}` }}</span>
                <span class="slider_price">{{ `$${priceArr.price[1]}` }}</span>
                <button class="btn_filter" @click="setFilter">Filter</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "productFilter",
        data: () => ({
            priceArr: [],
            categoryArr: [],
            selectedCity: '',
            filterData: {},
            events: []
        }),
        props: [
            'cityList',
            'categoryList',
            'productList'
        ],
        methods: {
            getMaxPrice() {
                return Math.max(...this.productList.map(p => p.price));
            },
            setPriceArr(){
                let min = 0
                let max = this.getMaxPrice()
                this.$set(this.priceArr, 'price', [min, max])
                let inLine = this.$refs.inputLine
                if (inLine) {
                    inLine.style.left = 0
                    inLine.style.width = 100 + '%'
                }
            },
            dragLine(){
                let inMin = parseInt(this.$refs.inputMin.value, 10)
                let inMax = parseInt(this.$refs.inputMax.value, 10)
                let tmp
                if(inMin > inMax){
                    tmp = inMin
                    inMin = inMax
                    inMax = tmp
                    let min = this.priceArr.price[1]
                    let max = this.priceArr.price[0]
                    this.$set(this.priceArr, 'price', [min, max])
                }
                let maximum = parseInt(this.$refs.inputMin.max, 10)
                let minimum = parseInt(this.$refs.inputMin.min, 10)
                let inLine = this.$refs.inputLine
                let inLinePosition = ((maximum - minimum) - (maximum - inMin)) / ((maximum - minimum) * 0.01)
                let inLineWidth = ((maximum - minimum) - (maximum - inMax)) / ((maximum - minimum) * 0.01)
                inLine.style.left = inLinePosition + '%'
                inLine.style.width = inLineWidth - inLinePosition + '%'
            },
            setFilter() {
                this.filterData = this.productList.filter(price => this.priceArr.price[0] <= price.price && this.priceArr.price[1] >= price.price)
                if (this.categoryArr.length > 0) {
                    this.filterData = this.filterData.filter(category => this.categoryArr.includes(category.category))
                }
                if (this.selectedCity) {
                    this.filterData = this.filterData.filter(category => this.selectedCity === category.city)
                }
                this.$emit('setFilter', this.filterData)

                this.updateLocalStorage()

            },
            updateLocalStorage () {
                localStorage.setItem('price', JSON.stringify(this.priceArr.price))
                localStorage.setItem('category', JSON.stringify(this.categoryArr))
                localStorage.setItem('city', JSON.stringify(this.selectedCity))
            },
            clearFilter() {
                this.updateLocalStorage()
                this.setPriceArr()
            },
            getLocalStorageData() {
                let price = JSON.parse(localStorage.getItem('price'))
                price ? this.priceArr.price = price : null
                let category = JSON.parse(localStorage.getItem('category'))
                category ? this.categoryArr = category : null
                let city = JSON.parse(localStorage.getItem('city'))
                city ? this.selectedCity = city : null
                this.setFilter()
            }
        },
        created() {
            this.setPriceArr()
            this.getLocalStorageData()
        }
    }
</script>

<style scoped lang="scss">
    .filter_Wrap{
        .fileter{
            margin-bottom: 60px;
        }
        h4 {
            font-size: 18px;
            font-weight: bold;
            font-family: 'Montserrat', sans-serif;
            margin-bottom: 30px;
            text-transform: uppercase;
        }
        .filter__dropdown {
            .select_wrap{
                position: relative;
                select {
                    height: 40px;
                    padding: 10px 15px;
                    border: 1px solid #e9e9e9;
                    font-size: 15px;
                    font-family: 'Raleway', sans-serif;
                    font-weight: 500;
                    width: 100%;
                    color: #4c505b;
                    outline: none;
                    cursor: pointer;
                    line-height: 1.3;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                }
                svg {
                    position: absolute;
                    right: 20px;
                    top: 16px;
                }
            }
        }
        .filter__checkbox {
            font-size: 15px;
            font-family: 'Raleway', sans-serif;
            font-weight: 500;
            color: #4c505b;

            .cbox {
                display: block;
                position: relative;
                cursor: pointer;
                padding-left: 25px;
                margin-bottom: 20px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                }
                &:last-child {
                    margin-bottom: 0;
                }
            }
            .checkmark {
                position: absolute;
                top: 0;
                left: 0;
                height: 16px;
                width: 16px;
                /*background-color: #eee;*/
                border: 1px solid #e9e9e9;
            }
            .cbox:hover input ~ .checkmark {
                background-color: transparent;
                border: 1px solid #4bc7ff;
            }
            .cbox input:checked ~ .checkmark {
                background-color: transparent;
                border: 1px solid #4bc7ff;
            }
            .checkmark:after {
                content: "";
                position: absolute;
                display: none;
            }
            .cbox input:checked ~ .checkmark:after {
                display: block;
            }
            .cbox .checkmark:after {
                left: 5px;
                top: 0px;
                width: 5px;
                height: 10px;
                border: solid #4bc7ff;
                border-width: 0 1px 1px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        }

        input[type=range] {
            -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
            width: 100%; /* Specific width is required for Firefox. */
            background: transparent; /* Otherwise white in Chrome */
        }

        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
        }

        input[type=range]:focus {
            outline: none;
        }

        input[type=range]::-ms-track {
            width: 100%;
            cursor: pointer;
            background: transparent;
            border-color: transparent;
            color: transparent;
        }

        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 11px;
            height: 11px;
            top: -5px;
            background-color: #fff;
            border-radius: 50%;
            border: solid 2px #1cb8ff;
            position: relative;
            z-index: 2;
            cursor: pointer;
        }

        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 2px;
            background: #d6d9e1;
            border-radius: 2px;
        }
        .range-slider {
            position: relative;
            width: 100%;
            height: 30px;
            margin-bottom: 20px;
            .range-slider__line{
                width: 100%;
                height: 2px;
                background-color: #1cb8ff;
                position: absolute;
                top: 23px;
            }
        }
        .range-slider input {
            pointer-events: none;
            position: absolute;
            overflow: hidden;
            left: 0;
            top: 15px;
            width: 100%;
            outline: none;
            height: 18px;
            margin: 0;
            padding: 0;
        }
        .range-slider input::-webkit-slider-thumb {
            pointer-events: all;
            position: relative;
            z-index: 1;
            outline: 0;
        }
        .filter__slider {
            .slider_price {
                font-size: 16px;
                font-family: 'Montserrat', sans-serif;
                font-weight: 500;
            }
            .filter__slider_data{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .btn_filter{
                font-size: 14px;
                font-family: 'Montserrat', sans-serif;
                font-weight: 500;
                text-transform: uppercase;
                background-color: #1cb8ff;
                color: #fff;
                border: 1px solid #1cb8ff;
                padding: 10px 30px;
                transition: all .3s;
                cursor: pointer;
                height: 36px;
                &:hover {
                    background-color: #fff;
                    color: #1cb8ff;
                }
            }
        }
    }
</style>
