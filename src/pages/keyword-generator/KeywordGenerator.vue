<template>
    <div class=" space-y-8 max-w-md mx-auto text-center overflow-hidden md:max-w-2xl">
        <a-textarea v-model="inputText" placeholder="Type a text" :auto-size="{ minRows: 2, maxRows: 5 }"/>
        <br>
        <a-button
            class="text-blue-500"
            type="primary" block
            @click="keywordGenerator"
        >
            <font-awesome-icon icon="thumbs-up"/>
        </a-button>
        <br>
        <label>Select Grams To Display</label>
        <a-select
            v-model="value"
            mode="tags"
            allow-clear
            style="width: 100%"
            placeholder="Choose Grams"
        >
            <a-select-option v-for="i in 10" :key="(i).toString()">
                {{ i }}
            </a-select-option>
        </a-select>
        <div v-for="(value, name) in this.value" :key="name">
            {{ value }}-Grams:
            <div v-for="(val, index) in arr[name]" :key="index" class="inline-block">
                <a-tag color="blue">
                    {{ val }}
                </a-tag>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function (){
            return {
                inputText: '',
                value: [],
                arr: [],
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
                    this.arr[i]=this.getGrams(len,parseInt(this.value[i]));
                }
            },
        },
    };
</script>
<style>
</style>
