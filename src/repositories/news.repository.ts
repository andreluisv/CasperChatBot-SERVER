import NewsSchema from '../models/news';

export class NewsRepository{
    async findNews(){
        return (
            await NewsSchema.find({})
        );
    }
    async findNewsByTheme(theme : any){
        return (
            await NewsSchema.find({theme})
        );
    }
    async findNewsById(_id : any){
        return (
            await NewsSchema.findOne({_id})
        );
    }
    async createNews(img_url : any, title : any, description : any, theme : any, link : any){
        return (
            await NewsSchema.create({
                img_url,
                title,
                description,
                theme,
                link
            } as any)
        );
    }
    async deleteNewsById(_id : any){
        return (
            await NewsSchema.deleteOne({_id})
        );
    }

    async updateOne(img_url : any, title : any, description : any, theme : any, link : any, _id : any){
        return (
            await NewsSchema.updateOne({_id}, {img_url, title, description, theme, link})
        );
    }
}