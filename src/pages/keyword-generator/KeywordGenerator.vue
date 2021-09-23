<template>
    <div>
        <div>
            <span>Keyword Generator</span>
        </div>
        <div>
            <span>Application Description</span>
            <input
                v-model="description"
                placeholder="enter app description"
                type="textarea"
            >
        </div>
        <div>
            <button @click="generateKeywords">
                Generate
            </button>
        </div>
        <div v-if="words.length !== 0">
            <div v-for="i in 3" :key="i">
                <span>
                    {{ i }}-gram:
                </span>
                <div v-for="(word, index) in keywords[i]" :key="index">
                    <div>
                        {{ word }}
                    </div>
                </div>
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
            };
        },
        methods: {
            generateKeywords(){ // this method generates keywords
                this.words = [];
                // splits text into words
                this.words = this.description.toLowerCase().split(' ');
                // this words are grouped into n-gram keywords where n is 1, 2 and 3
                const ngrams = {};
                for (let i = 1; i <= 3; ++i) {
                    ngrams[i] = new Set();
                    for (let j = 0; j <= this.words.length - i; ++j) {
                        ngrams[i].add(this.words.slice(j, j+i).join(' '));
                    }
                }
                this.keywords = ngrams;
                this.description = ''; // description is cleared when keywords are shown
            },
        },
    };
</script>
