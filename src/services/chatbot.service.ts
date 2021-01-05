import Router from 'express';
import {NewsRepository} from '../repositories/news.repository';

const chatbotService = Router()
const rep = new NewsRepository();

chatbotService.post('/chatbot', async(req, res)=>{
    res.json({
        "fulfillmentMessages": [
          {
            "card": {
              "title": "Quem é a cantora argentina que roubou a cena com Neymar em festa na virada ",
              "subtitle": " no Brasil deu o que falar. Realizada em Mangaratiba, no Rio de Janeiro, a virada de ano organizada pelo astro contou com a presença de Emilia Mernes, uma cantora argentina que roubou a cena ao dançar com o craque brasileiro na região litorânea conhecida como Costa Verde.",
              "imageUri": "https://cdn-ofuxico.akamaized.net/img/upload/noticias/2018/03/08/neymar-bruna-marquezine-reproducao-instagram_315593_36.jpg",
              "buttons": [
                {
                  "text": "Saiba mais",
                  "postback": "https://www.uol.com.br/esporte/ultimas-noticias/2021/01/05/quem-e-a-cantora-argentina-que-roubou-a-cena-com-neymar-em-festa-na-virada.htm"
                }
              ]
            }
          }
        ]
      }
    );
})

export default chatbotService