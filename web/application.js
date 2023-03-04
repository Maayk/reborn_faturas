Vue.use(VueMask.VueMaskPlugin);

new Vue({
     el: '#app',
         data: {
              header: 'Fatura',
              rginput: 'Digite o RG',
              descricao: 'Envie uma fatura para alguem',
              digiterg: 'Digite o RG',
              digiteid: 'ID da Pessoa',
              valorfatura: 'Valor da Fatura',
              titulofatura: 'Titulo/Motivo',
              aberto:'none',
              rgex: 'Ex WQF77810',
              idex: 'Ex 20',
              valorex: 'Ex 2000',
              motivoex: 'Ex Tratamento Médico',
              enviando: false,
              msgsucesso: 'Coloque os dados corretos acima!',
              valorFatura: null
         },
         methods: {
               onSubmit: function() {
                    var playerId = this.$refs.playerId.value
                    var valor = this.valorFatura
                    var titulo = this.$refs.titulo.value
                    // Mostra carregamento
                    this.enviando = true;
                    // 5 segundos
                    setTimeout(() => {
                         this.enviando = false;
                         EnviaFatura(playerId,valor,titulo);
                         this.msgsucesso = 'Fatura enviada para [' + playerId +'] no valor de $'+ valor +' Dolares'
                    }, 2000)
               },
               resetValores : function(event){
                    this.valorFatura = null
                    event.target.reset()
               },
               validar(evt) {
               var theEvent = evt || window.event;
                    // Colar algo
                    if (theEvent.type === 'paste') {
                         key = event.clipboardData.getData('text/plain');
                    } else {
                    // Manipular tecla pressionada
                         var key = theEvent.keyCode || theEvent.which;
                         key = String.fromCharCode(key);
                    }
                    var regex = /[0-9]|\./;
                    if( !regex.test(key) ) {
                    theEvent.returnValue = false;
                    if(theEvent.preventDefault) theEvent.preventDefault();
                    }
               }
         },
         mounted() {
             window.addEventListener( 'message', (event) => {
               var dados = event.data

               if ( dados.desativar != 'flex' ){
                    this.aberto = 'none'
                    //console.log('entrei na condição');
                    this.msgsucesso = 'Coloque os dados corretos acima!'
                    return
               }
               this.aberto = dados.desativar
             })
         },
         destroyed(){

         }
 });

 $("#fecharfatura").click(function(){
     $.post('http://reborn_faturas/fechar-faturas', JSON.stringify({}));2
});

function EnviaFatura(id,valor,titulo) {
     //console.log(id,valor,titulo);
     if(id && valor && titulo != '?'){
          //console.log('entrei qui?');
          $.post("http://reborn_faturas/fatura-dados", JSON.stringify({
               id: id,
               valor: valor,
               titulo: titulo
           }));
     }
}