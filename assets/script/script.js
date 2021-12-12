const vm = new Vue({
    el:"#app",
    data:{
        produtos:[],
        produto:false,
        carrinhoTotal:0
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
              this.produto = r;
            })
        },
        abrirModal(id){
            this.puxarProdutos(id)
            window.scrollTo({
                top:0,
                behavior:"smooth"
            })
        },
        fecharModal({target, currentTarget}){
            if(target === currentTarget) this.produto = false
        }
    },
    created(){
        this.fetchProdutos();
    }
})