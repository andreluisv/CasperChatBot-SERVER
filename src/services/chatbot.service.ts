import Router from 'express';
import { NewsRepository } from '../repositories/news.repository';

const chatbotService = Router()
const rep = new NewsRepository();

chatbotService.post('/chatbot', async (req, res) => {
    var theme = req.body.queryResult.intent.displayName || "unknown";
    theme = (theme === "esportes" ? "Esportes" : "") ||
        (theme === "politica" ? "Política" : "") ||
        (theme === "entretenimento" ? "Entretenimento" : "") ||
        (theme === "famosos" ? "Famosos" : "") || "unknown";

    var newsarr = await rep.findNewsByTheme(theme) || [];
    var arrsz = newsarr.length || 0;
    console.log("Chatbot requested for \"" + theme + "\" and found " + arrsz + " news for this theme.");

    if (!arrsz) {
        res.json({
            "fulfillmentMessages": [
                {
                    "quickReplies": {
                        "title": "Desculpe-me, mas não encontrei nenhuma notícia sobre esse tema. Por favor, escolha outro.",
                        "quickReplies": [
                            "Esportes",
                            "Política",
                            "Entretenimento",
                            "Famosos"
                        ]
                    },
                    "platform": "FACEBOOK"
                }
            ]
        })
        return;
    }

    //Bring random news from the collection
    newsarr = newsarr.sort((a, b) => 0.5 - Math.random());
    //Limit news to 10
    arrsz = arrsz > 10 ? 10 : arrsz;

    var elementsArray = [];

    for (let i = 0; i < arrsz; i++) {
        const news = newsarr[i];
        elementsArray.push({
            "image_url": news["img_url"] || "",
            "default_action": {
                "webview_height_ratio": "tall",
                "url": news["link"] || "",
                "type": "web_url"
            },
            "buttons": [
                {
                    "title": "Saiba mais",
                    "type": "web_url",
                    "url": news["link"] || ""
                }
            ],
            "title": news["title"] || "",
            "subtitle": news["description"] || ""
        });
    }

    var response = {
        "fulfillmentMessages": [
            {
                "payload": {
                    "facebook": {
                        "attachment": {
                            "type": "template",
                            "payload": {
                                "elements": elementsArray,
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