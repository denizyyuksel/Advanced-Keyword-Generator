<template>
    <div class=" space-y-8 max-w mx-auto text-center md:max-w-2xl">
        <div class="flex justify-center center space-x-7 space-y-3.5 w-auto">
            <div class="item w-80 h-32 space-y-8">
                <a-textarea
                    v-model="inputText" placeholder="Type a text"
                    :auto-size="{ minRows: 6, maxRows: 8 }"
                />
                <br>
                <div class="flex justify-between items-baseline space-x-7 space-y-3.5 w-auto">
                    <a-button
                        type="primary"
                        @click="keywordGenerator"
                    >
                        Count
                    </a-button>
                    <div v-if="totalCharacter">
                        Total Character: <span class="font-sans text-xl">{{ totalCharacter }}</span>
                    </div>
                </div>
            </div>
            <div class="item w-80 h-15">
                <a-table
                    bordered
                    :columns="columns"
                    :data-source="tableData"
                />
            </div>
        </div>
    </div>
</template>
<script>
    const columns = [{
        title: 'Keyword',
        dataIndex: 'keyword',
        key: 'keyword',
        width: '60%',
    },{
        title: 'Count',
        dataIndex: 'count',
        key: 'count',
    },{
        title: 'Density',
        dataIndex: 'density',
        key: 'density',
        customRender: countDensityGenerator => Number(countDensityGenerator.toFixed(1)) + '%',
    },
    ];
    export default {
        name: 'ma-keyword-generator',
        props: {
            static: {
                type: String,default: '',
            },
        },
        data: function (){
            return {
                columns,
                inputText: this.static,
                arr: [],
                totalCharacter: '',
                tableData: {} ,
                inputWords: [],
            };
        },
        methods: {
            keywordGenerator(){
                this.totalCharacter='';
                this.arr=[];
                this.totalCharacter=this.inputText.trim().length;
                this.inputWords=this.inputText.toLowerCase().split(' ');
                this.removeWhitespace();
                this.filterUnwantedWords();
                this.fillArray();
                this.tableData=this.countDensityGenerator(this.arr);
            },
            countDensityGenerator(text){
                let resultData = [];
                let word ={};
                let totalLength =text.length;
                text.forEach(function(w) {
                    if (!word[w]) {
                        word[w] = 0;
                        resultData.push(
                            {
                                keyword: w,
                                count: 0,
                                density: 0,
                            }
                        );
                    }
                    word[w] += 1;
                    resultData.find((o, i) => {
                        if (o.keyword === w) {
                            resultData[i].count+=1;
                            resultData[i].density=(resultData[i].count/totalLength)*100;
                            return true; // stop searching
                        }
                    });
                });
                resultData = resultData.filter(function (e) {// For Display more than 1
                    return e.count > 1;
                });
                for (let i=0; i<resultData.length; i++) {// Grouping keywords which have same count
                    for (let j=i+1; j<resultData.length; j++){
                        if (resultData[i].count===resultData[j].count) {
                            resultData[i].keyword+=', '+resultData[j].keyword;
                            resultData[j].count=null;
                        }
                    }
                }
                resultData = resultData.filter(function (e) {// For Display more than 1
                    return e.count > 1;
                });
                resultData.sort(function(a, b){// Sorted according to count by descending order
                    return b.count-a.count;
                });
                return resultData;
            },
            getGrams(len, n){//Function to generate keywords
                let str='';
                let array=[];
                for (let i=0; i<=len-n; i++) {
                    for (let j=i; j<i+n; j++){
                        str+=this.inputWords[j]+' ';
                    }
                    array.push(str.slice(0, -1));
                    str='';
                }
                return array;
            },
            filterUnwantedWords(){
                const unwantedWords = ['is', 'an', 'the', 'of', 'a', 'and'];
                this.inputWords=this.inputWords.filter(word => !unwantedWords.includes(word));
            },
            removeWhitespace(){
                this.inputWords = this.inputWords.filter(function(entry) {   //Remove white spaces
                    return entry.trim() !== '';
                });
            },
            fillArray(){
                let len=this.inputWords.length;
                for (let i=0; i<1; i++){
                    this.arr=this.getGrams(len,1);
                }
            },
        },
    };
</script>
<style scoped>
.ant-btn.ant-btn-primary,.ant-btn-primary:hover {
  @apply bg-red-500;
  @apply border-none;
}
.ant-table-thead > tr > th{
  @apply bg-red-500 ;
}
</style>
