<template>
    <div>
        <div>
            <span> Keyword Generator </span>
        </div>
        <div>
            <span> Application Description </span>
            <input
                v-model="description" placeholder="enter app description"
                type="textarea"
            >
        </div>
        <div>
            <button @click="generate">
                Generate
            </button>
        </div>
        <div v-for="(word, index) in keywords" :key="index">
            <span>
                {{ index + 1 }}-gram:
            </span>
            <span>
                {{ word }}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                description: '',
                keywords: [],
            };

        },
        methods: {
            generate(){
                const words = this.description.toLowerCase().split(' ');
                let result = [];
                for (let i = 0; i < words.length; i++) {
                    const end = Math.min(words.length, i + 3);
                    for (let j = i + 1; j <= end; j++) {
                        result.push(words.slice(i, j).join(' '));
                    }
                }
                result = [...new Set(result)];
                const newArr = [
                    '', '', '',
                ];
                result.forEach((x) => {
                    switch (x.split(' ').length){
                        case 1:
                            newArr[0] += x + ', ';
                            break;
                        case 2:
                            newArr[1] += x + ', ';
                            break;
                        case 3:
                            newArr[2] += x + ', ';
                            break;
                    }
                } );
                this.keywords = newArr;
                this.description = '';
            },

        },
    };
</script>
