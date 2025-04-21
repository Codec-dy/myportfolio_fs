const mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(process.env.MONGO_URL)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }

    adminSchema(){
        return new mongoose.Schema({
            email: String,
            password: String
        });
    }
    

    adminModel() {
        // Check if the model already exists before defining it
        return mongoose.models.Admin || mongoose.model('Admin', this.adminSchema());
    }
    
    //Experience
    experienceSchema(){
        return new mongoose.Schema({
            title: String,
            company: String,
            location: String,
            date: String,
            summary: String
        });
    }
    experienceModel() {
        return mongoose.models.Experience || mongoose.model('Experience', this.experienceSchema());
    }
    
    //skills
    skillSchema(){
        return new mongoose.Schema({
            description: String,
        });
    }
    skillModel() {
        return mongoose.models.Skill || mongoose.model('Skill', this.skillSchema());
    }

    //projects
    projectSchema(){
        return new mongoose.Schema({
            title: String,
            description: String,
            img: String,
            vid: String,
            techUsed: String,
            category: String,
            link: String,
            date: String,
            status: String,
        });
    }
    projectModel() {
        return mongoose.models.Project || mongoose.model('Project', this.projectSchema());  
    }

    //certificates
    certificateSchema(){
        return new mongoose.Schema({
            title: String,
            institution: String,
            img: String,
            link:String,
            date: String,
        });
    }
    certificateModel() {
        return mongoose.models.Certificate || mongoose.model('Certificate', this.certificateSchema());  
    }

    //Aboutme
    aboutmeSchema(){
        return new mongoose.Schema({
            title: String,
            description: String,
            image: String,
        });
    }
    aboutmeModel() {
        return mongoose.models.Aboutme || mongoose.model('Aboutme', this.aboutmeSchema());
    }

    //Graphic Design
    graphicDesignSchema(){
        return new mongoose.Schema({
            title: String,
            description: String,
            img: String,
            techUsed: String,
            date: String,
        });
    }
    graphicDesignModel() {
        return mongoose.models.GraphicDesign || mongoose.model('GraphicDesign', this.graphicDesignSchema());
    }
    //My info
    myInfoSchema(){
        return new mongoose.Schema({
            name: String,
            email: String,
            address: String,
            phone: String,
            avalability: String,

        });
    }
    myInfoModel() {
        return mongoose.models.MyInfo || mongoose.model('MyInfo', this.myInfoSchema());
    }

    

    //CRUD Operations
    getAll(model,query){
        return model.find(query);
    }
    findOne(model,query){
        return model.findOne(query);
    }
    addInstance(model,data){
        return model.create(data);
    }
    deleteInstance(model,query){
        return model.deleteOne(query);
    }
    updateInstance(model,query,data){
        return model.updateOne(query,{$set:data});
    }
    insertMany(model,data){
        return model.insertMany(data);
    }
    
}


module.exports = Database;