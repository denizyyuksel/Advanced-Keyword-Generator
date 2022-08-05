<template>
    <div class=" text-blue-500 text-center mt-8 space-y-10 pb-8 leading-10 font-bold text-xl">
        <router-link to="/keyword-generator">
            Keyword Generator
        </router-link>
        <br>
        <router-link :to="{name: 'count-word', params:{static:'It is a default value please enter new value !!! Our Keyword Counter tool lets you count how many times keywords are repeated in any text, and also calculates the density of these keywords ! It displays keywords which count more than 1'}}">
            Count Density
        </router-link>
    </div>
</template>

<style>
</style>
