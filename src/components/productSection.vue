<template>
    <section class="products">
        <b-container>
            <b-row>
                <b-col md="3">
                    <product-filter :ref="'filter'"
                                    :cityList="cityList"
                                    :productList="producData"
                                    :categoryList="categoryList"
                                    @setFilter="setFilter($event)">
                    </product-filter>
                </b-col>
                <b-col md="9">
                    <product-list :cityList="cityList"
                                  :productList="pageFiltered ? filteredData : producData"
                                  :categoryList="categoryList"
                                  @clearFilter="clearFilter()">
                    </product-list>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
    import productFilter from './productFilter'
    import productList from './productList'

    import cityData from '../data/city'
    import categoryData from '../data/category'
    import productData from '../data/data'

    export default {
        name: "productSection",
        data: () => ({
            cityList: [],
            categoryList: [],
            producData: [],
            filteredData: [],
            pageFiltered: false
        }),
        components: {
            productFilter,
            productList
        },
        computed: {},
        methods: {
            setFilter(evt) {
                this.filteredData = evt
                this.pageFiltered = true
            },
            clearFilter() {
                this.pageFiltered = false
                this.$refs.filter.categoryArr = []
                this.$refs.filter.selectedCity = ''
                this.$refs.filter.clearFilter()
            }
        },
        created() {
            this.cityList = cityData
            this.categoryList = categoryData
            this.producData = productData
        }
    }
</script>

<style scoped>
    .products {
        padding: 50px 0;
        font-family: 'Montserrat', sans-serif;
    }
</style>
