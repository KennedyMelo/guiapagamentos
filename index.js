const express = require("express")
const MercadoPago = require("mercadopago")
const app = express()
const port = process.env.PORT || 80

MercadoPago.configure({
  sandbox: true,
  access_token: "TEST-8735344968718359-070422-2e688181664034fd6b21d23fb44a09d1-217050140"
})

app.get("/", (req, res) => {
  res.send("Olá mundo!")
})

app.get("/pagar", async (req, res) => {
  //tabela Pagamentos

  // id // codigo // pagador // status
  // 1 // 2324234212(id do item) // kennedycmelo@gmail.com // Não foi pago
  
  let id = "" + Date.now()
  let emailDoPagador = "klebson.edimelo@gmail.com"

  let dados = {
    items: [
      item = {
        id: id,
        title: "2x video games; 3x camisas",
        quantity: 1,
        currency_id: 'BRL',
        unit_price: parseFloat(150)
      }
    ],
    notification_url: "https://143.244.191.28/not",
    payer: {
      email: emailDoPagador
    },
    external_reference: id
  }
  try{
    let pagamento = await MercadoPago.preferences.create(dados)
    console.log(pagamento)
    //Banco.SalvarPagamento({id: id, pagador: emailDoPagador})
    return res.redirect(pagamento.body.init_point)
  } catch(err){
    return res.send(err.message)
  }
})

app.post("/not", (req,res) => {
  console.log(req.query)
  res.send("OK")
})

app.listen(port, (req, res) => {
  console.log("Servidor rodando!")
})