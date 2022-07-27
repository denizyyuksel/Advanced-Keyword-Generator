<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <a-textarea v-model="inputText" placeholder="Type a text" :auto-size="{ minRows: 2, maxRows: 5 }"/>
            <br>
            <a-button
                type="primary" block
                @click="keywordGenerator"
            >
                <font-awesome-icon icon="thumbs-up"/>
            </a-button>
            <br>
            <div>
                <label class="typo__label">Select Grams To Display</label>
                <multiselect
                    v-model="value" :options="options"
                    :multiple="true"
                    :close-on-select="false" :clear-on-select="false"
                    :preserve-search="true" placeholder="Choose Grams"
                    label="name" track-by="name"
                    :preselect-first="true"
                >
                    <template #selection="{ values, isOpen }">
                        <span v-if="values.length &amp;&amp; !isOpen" class="multiselect__single">{{ values.length }} options selected</span>
                    </template>
                </multiselect>
                <div v-for="(value, name) in this.value" :key="name">
                    {{ value.name }}-Grams:
                    <div v-for="(val, index) in arr[name]" :key="index" class="tags">
                        <a-tag color="blue">
                            {{ val }}
                        </a-tag>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Multiselect from 'vue-multiselect';
    import Vue from 'vue';
    import 'ant-design-vue/dist/antd.css';
    Vue.component('multiselect', Multiselect);
    export default {
        name: 'ma-keyword-generator',
        components: { Multiselect },
        data: function (){
            return {
                inputText: '',
                value: [],
                arr: [],
                options: [
                    { name: 1 },
                    { name: 2 },
                    { name: 3 },
                    { name: 4 },
                    { name: 5 },
                    { name: 6 },
                    { name: 7 },
                    { name: 8 },
                    { name: 9 },
                    { name: 10 },
                ],
            };
        },
        methods: {
            keywordGenerator(){
                this.arr=[];
                this.inpText=this.inputText.split(' ');
                this.removeWhitespace();
                this.filterUnwantedWords();
                this.fillArray();
            },
            getGrams(len, n){//Function to generate keywords
                let str='';
                let array=[];
                for (let i=0; i<=len-n; i++) {
                    for (let j=i; j<i+n; j++){
                        str+=this.inpText[j]+' ';
                    }
                    array.push(str.slice(0, -1));
                    str='';
                }
                const unique = (value, index, self) => {//Make an array Unique
                    return self.indexOf(value) === index;
                };
                array = array.filter(unique);
                return array;
            },
            filterUnwantedWords(){
                this.inpText=this.inpText.filter(word => word !== 'is' && word !== 'an' && word !== 'the' && word !== 'of'&& word !== 'a'&& word !== 'and');
            },
            removeWhitespace(){
                this.inpText = this.inpText.filter(function(entry) {   //Remove white spaces
                    return entry.trim() !== '';
                });
            },
            fillArray(){
                let len=this.inpText.length;
                for (let i=0; i<this.value.length; i++){
                    this.arr[i]=this.getGrams(len,this.value[i].name);
                }
            },
        },
    };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.ma-header{
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto 35%;
}
.tags{
  display: inline-block;
  flex-direction: row;
  text-align: left;
}
</style>
