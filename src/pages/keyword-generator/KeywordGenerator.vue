<template>
    <div class="keywords-generator-wrapper">
        <div class="header">
            <span>Keyword Generator</span>
        </div>
        <div class="form-input">
            <span class="input-text">Application Description</span>
            <el-input
                v-model="description"
                placeholder="enter app description"
                type="textarea"
                rows="5"
            />
        </div>
        <div class="form-input">
            <span class="input-text">Filter Words</span>
            <el-input
                v-model.trim="filterWords"
                placeholder="enter unwanted words by putting , between words like is, a, an, the"
                type="textarea"
                rows="2"
            />
        </div>
        <div class="form-checkbox">
            <el-checkbox-group v-model="grams">
                <el-checkbox
                    v-for="i in 10" :key="i + '-gram'"
                    :label="i"
                    class="input-text"
                >
                    {{ i }}-gram
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="button">
            <el-button
                type="success"
                :disabled="isDisabled"
                @click="generateKeywords"
            >
                Generate
                <font-awesome-icon :icon="['fas', 'check']"/>
            </el-button>
        </div>
        <div v-if="words.length !== 0" class="generator-result">
            <div
                v-for="i in sortedGrams"
                :key="i"
                class="result-element"
            >
                <span class="result-element-header">
                    {{ i }}-gram
                </span>
                <li v-for="(word, index) in keywords[i]" :key="index">
                    {{ word }}
                </li>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ma-keyword-generator-page',
        data(){
            return {
                description: '',
                keywords: [],
                words: [],
                grams: [],
                nGrams: [],
                filterWords: '',
            };
        },
        computed: {
            sortedGrams() { // sorts the selected grams in ascending order
                return this.nGrams.slice().sort(function(a, b){
                    return a-b;
                });
            },
            isDisabled() { // prevents to generate keywords before entering description and selecting grams
                return this.description === '' || this.grams.length === 0;
            },
        },
        methods: {
            generateKeywords(){ // this method generates keywords
                this.words = [];
                const filterWordsArr = this.filterWords.toLowerCase().split(','); // splits unwanted words by comma
                this.words = this.description.toLowerCase().split(' '); // splits description into words
                this.words = this.words.filter(word => !filterWordsArr.includes(word) ); // removing unwanted words from keywords
                const ngrams = {};
                for (let i = 1; i <= 10; ++i) {
                    ngrams[i] = new Set();
                    for (let j = 0; j <= this.words.length - i; ++j) {
                        ngrams[i].add(this.words.slice(j, j+i).join(' '));
                    }
                }  // this words are grouped into n-gram keywords where n is from 1 to 10
                this.keywords = ngrams;
                this.description = ''; // description is cleared when keywords are shown
                this.filterWords = '';
                this.nGrams = this.grams;
            },
        },
        watch: {
            isDisabled(newValue){
                if (newValue){
                    this.grams = [];
                }
            },
        },
    };
</script>

<style>
.keywords-generator-wrapper {
  display: flex;
  flex-direction: column;
  align-content: space-between;
}
.form-input {
  display: flex;
  flex-direction: column;
  margin: 5px 50px;
  padding: 5px;
}
.input-text {
  font-family: "Arial",serif;
  font-size: 15px;
  margin-bottom: 5px;
}
.form-checkbox {
  display: flex;
  justify-content: center;
  margin: 5px;
  padding: 5px;
}
.header {
  margin: 10px;
  padding: 5px;
  display: flex;
  justify-content: center;
  font-family: "Arial",serif;
  font-size: 20px;
}
.button {
  margin: 15px;
  padding: 15px;
  display: flex;
  justify-content: center;
}
.generator-result {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 5px;
  padding: 5px;
}
.result-element {
  margin: 10px 15px;
  padding: 5px;
  font-family: "Arial",serif;
  font-size: 15px;
}
.result-element-header {
  display: flex;
  text-decoration: underline;
  margin-bottom: 5px;
  justify-content: center;
  font-family: "Arial",serif;
  font-size: 20px;
}
</style>
