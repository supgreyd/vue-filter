<template>
    <div>
        <b-row v-if="productList.length > 0">
            <b-col md="4" v-for="product in productList">
                <div class="product_wrap">
                    <div class="product__img_wrap">
                        <img src="../assets/productStatick.jpg" alt="">
                        <span class="product__city">{{ getValue(product.city, 'cityList') }}</span>
                    </div>
                    <div class="product__content_wrap clearfix">
                        <p class="product__name">{{ product.name }}</p>
                        <span class="product__category">{{ getValue(product.category, 'categoryList') }}</span>
                        <span class="product__price">{{ `$${product.price}` }}</span>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-row v-else>
            <div class="msg_error">
                <p>there is no items matching your filter</p>
                <button @click="$emit('clearFilter')">clear filter</button>
            </div>
        </b-row>
    </div>
</template>

<script>

    export default {
        name: "productList",
        data: () => ({

        }),
        props: [
            'cityList',
            'categoryList',
            'productList'
        ],
        methods: {
            getValue(val, type) {
                let value
                this[type].forEach(item => {
                    return item.id === val ? value = item.name : null
                })
                return value
            }
        }
    }
</script>

<style scoped lang="scss">
    .product_wrap {
        position: relative;
        margin-bottom: 30px;
        border: 1px solid #e9e9e9;
        cursor: pointer;
        transition: all .3s;
        .product__img_wrap {
            overflow: hidden;
            height: 180px;
            position: relative;
            img {
                height: 100%;
            }
            span {
                position: absolute;
                bottom: 20px;
                left: 20px;
                color: #fff;
                font-size: 13px;
                font-family: 'Raleway', sans-serif;
                font-weight: 500;
            }
            &:before {
                content: '';
                height: 100%;
                width: 100%;
                background: rgba(12, 12, 12, 0.2);
                position: absolute;
                transition: all .3s;
                background-image: linear-gradient(transparent, rgba(2, 2, 2, 0.6));
            }
        }
        .product__content_wrap {
            padding: 20px;
            .product__name {
                height: 65px;
                overflow: hidden;
                margin-bottom: 20px;
                line-height: 1.3;
            }
            .product__name, .product__price{
                font-size: 16px;
                font-family: 'Montserrat', sans-serif;
                font-weight: 500;
            }
            .product__category{
                font-family: 'Raleway', sans-serif;
                font-weight: 500;
                font-size: 13px;
                color: #898a8c;
            }
            .product__price {
                float: right;
            }
        }
        &:hover {
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
            .product__img_wrap:before {
                background-image: none;
                background-color: rgba(28, 184, 255, 0.6);
            }
        }
    }
    .msg_error {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        text-transform: uppercase;
        button{
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
</style>
