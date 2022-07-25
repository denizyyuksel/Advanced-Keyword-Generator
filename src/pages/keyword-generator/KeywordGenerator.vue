<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <span>Keyword Generator</span>
            <br>
            <input v-model="inputText" placeholder="Type a text">
            <button @click="subfunction">
                Generate Keywords
            </button>
            <br>
            <span>1-gram:{{ gram1 }}</span>
            <span>2-gram:{{ gram2 }}</span>
            <span>3-gram:{{ gram3 }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ma-keyword-generator',
        data: function (){

            return {
                inputText: '',
                gram1: '',
                gram2: '',
                gram3: '',
            };
        },

        methods: {
            subfunction(){
                this.result=this.inputText.split(' ');
                this.result = this.result.filter(function(entry) {   //Remove white spaces
                    return entry.trim() !== '';
                });
                let len=this.result.length;
                this.gram1=this.fonc(len,1);
                this.gram2=this.fonc(len,2);
                this.gram3=this.fonc(len,3);
            },
            fonc(len,n){                //Function to generate keywords
                let str='';
                let ark=[];
                for (let i=0; i<=len-n; i++) {
                    for (let j=i; j<i+n; j++){
                        str+=this.result[j]+' ';
                    }
                    ark.push(str.slice(0, -1));
                    str='';
                }
                const unique = (value, index, self) => {     //Make an array Unique
                    return self.indexOf(value) === index;
                };
                ark = ark.filter(unique);
                return ark.join(', ');
            },
        },

    };


</script>
<style>
ma-keyword-generator{
}
.ma-header{
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto 40%;
}
</style>
