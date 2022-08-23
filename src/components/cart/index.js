import React from 'react'
import { Tabs } from './tabs'
import { ProductsContainer } from './products-container'

export function Cart() {
    return (
        <section>
            <Tabs />
            <ProductsContainer />
        </section>
    )
}
