import Router from 'express';
import {NewsRepository} from '../repositories/news.repository';

const chatbotService = Router()
const rep = new NewsRepository();

chatbotService.post('/chatbot', async(req, res)=>{
    var theme = req.body.queryResult.intent.displayName || "unknown";
    theme = (theme==="esportes" ? "Esportes" : "") || 
    (theme==="politica" ? "Política" : "") || 
    (theme==="entretenimento" ? "Entretenimento" : "") ||
    (theme==="famosos" ? "Famosos" : "")  || "unknown";
    
    var newsarr = await rep.findNewsByTheme(theme) || [];
    const arrsz = newsarr.length || 0;
    console.log("Chatbot requested for \"" + theme + "\" and found " + arrsz + " news for this theme.");

    if (!arrsz){
        res.json({
            "fulfillmentMessages": [
                {
                "text": {
                    "text": [
                        "Desculpe-me, mas não encontrei nenhuma notícia sobre esse tema. (TODO -> call for quickreplies)"
                    ]
                }
                }
            ]
        })
        return;
    }

    const card = {
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
      };

    var customElement = {
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/70/Example.png",
    "default_action": {
        "webview_height_ratio": "tall",
        "url": "https://www.google.com/",
        "type": "web_url"
    },
    "buttons": [
        {
        "title": "View Website",
        "type": "web_url",
        "url": "https://www.google.com/"
        }
    ],
    "title": "Welcome!",
    "subtitle": "We have the right hat for everyone."
    };

      var response = {
        "fulfillmentMessages": [
            {
              "payload": {
                "facebook": {
                  "attachment": {
                    "type": "template",
                    "payload": {
                      "elements": [customElement, customElement, customElement],
                      "template_type": "generic"
                    }
                  }
                }
              },
              "platform": "FACEBOOK"
            }
          ]
      }

    res.json(response);
})

export default chatbotService