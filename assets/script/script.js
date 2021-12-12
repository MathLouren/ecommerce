const vm = new Vue({
    el:"#app",
    data:{
        produtos:[],
        produto:false,
    },
    filters:{
        numeroPreco(valor){
           return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })   
        }
    },
    methods:{
        fetchProdutos(){
            fetch("assets/api/produtos.json").then( r => r.json()).then(r =>{
                this.produtos = r;
            })
        },
        puxarProdutos(id){
            fetch(`http://127.0.0.1:5500/assets/api/produtos/${id}/dados.json`).then((r)=>{
               return r.json()
            }).then((r)=>{
                console.log(r)
            })
        }
    },
    created(){
        this.fetchProdutos();
    }
})