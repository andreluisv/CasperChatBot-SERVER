import Router from 'express';
import {NewsRepository} from '../repositories/news.repository';

const newsService = Router()
const rep = new NewsRepository();

newsService.get('/news',async(req,res)=>{
    const {theme} = req.query;
    console.log("query request");
    res.send({news: await rep.findNewsByTheme(theme)})
})

newsService.post('/news/create', async(req, res)=>{
    const {img_url, title, description, theme, link} = req.body;
    res.send({news: await rep.createNews(img_url, title, description, theme, link)});
})

newsService.delete('/news/delete', async(req,res)=>{
    const {id} = req.query;

    let news : any = (await rep.findNewsById(id)) || null;
    if (!news || news==null){
        res.status(404).send({err: "News not found"});
        return;
    }
    var result = await rep.deleteNewsById(id);
    res.send({msg: "Successfully deleted"});
})

newsService.post('/news/update', async(req, res)=>{
    const {img_url, title, description, theme, link, id} = req.body;

    let news : any = (await rep.findNewsById(id)) || null;
    if (!news || news==null){
        res.status(404).send({err: "News not found"});
        return;
    }
    
    res.send({msg: await rep.updateOne(img_url, title, description, theme, link, id)});
})

export default newsService