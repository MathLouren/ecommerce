const vm = new Vue({
    el:"#app",
    data:{
        produtos:[],
        produto:false,
        carrinho:[],
        mensagemAlerta:"Item adicionado",
        alertaAtivo: false,
        carrinhoAtivo: false
    },
    filters:{
        numeroPreco(valor){
           return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })   
        }
    },
    computed:{
        carrinhoTotal(){
            let total = 0;
            if(this.carrinho.length){
                this.carrinho.forEach((item)=>{
                    total += +item.preco;
                })
            }
            return total
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
            if(target === currentTarget) {
                this.produto = false;
            }
        },
        cliqueForaCarrinho({target, currentTarget}){
            if(target === currentTarget) {
                this.carrinhoAtivo = false;
            }
        },
        adicionarItem(){
            this.produto.estoque--;
            const {id,nome,preco} = this.produto;
            this.carrinho.push({id,nome,preco})
            this.alerta(`${nome} foi adicionado ao carrinho`)
        },
        removerItem(index){
            this.carrinho.splice(index, 1)
        },
        checarLocalStorage(){
            if(window.localStorage.carrinho){
                this.carrinho = JSON.parse(window.localStorage.carrinho)
            }
        },
        compararEstoque(){
            const itens = this.carrinho.filter(({id}) => id === this.produto.id)
            this.produto.estoque -=  itens.length;
        },
        alerta(msg){
            this.mensagemAlerta = msg
            this.alertaAtivo = true;
            setTimeout(()=>{
                this.alertaAtivo = false
            },1000)
        },
        router(){
            const hash = document.location.hash;
            if(hash){
                this.puxarProdutos(hash.replace("#",""))
            }
        }
    },
    watch:{
        produto(){
            document.title = this.produto.nome || "Sneakers";
            const hash = this.produto.id || "";
            history.pushState(null, null, `#${hash}`);
            if(this.produto){
            this.compararEstoque();
            }
        },
        carrinho(){
            window.localStorage.carrinho = JSON.stringify(this.carrinho)
        }
    },
    created(){
        this.router();
        this.fetchProdutos();
        this.checarLocalStorage();
    }
})